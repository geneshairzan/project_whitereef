import h from "@gh/helper";
import { isNaN } from "lodash";
import { getDefaultAllocation } from "./_generic";

export const jagopocket = {
  id: 6,
  name: "Bank Jago",
  min: 5,
  max: 6,
  rowLength: 6,
  header: ["Date &	Time", "Source/Destination", " Transaction	Details", "Notes", "Amount", "Balance"],

  isThisMeta: (raw) => {
    if (
      raw.find((d) => d.str == "www.jago.com") &&
      raw.find((d) => d.str.replaceAll("\t", " ").includes("Pockets Transactions"))
    ) {
      return true;
    }
    return false;
  },

  dataPrep: (raw) => {
    return h
      .groupByKeyToArr(
        // raw.map((dx) => ({ ...dx, col: Math.floor(dx.col / 100), str: dx.str?.replace("\t", " ") })),
        raw.map((dx) => ({ ...dx, col: dx.col, str: dx.str?.replace("\t", " ") })),
        "row"
      )
      .sort((a, b) => (a.key > b.key ? 1 : -1))
      .map((d) => ({ ...d, data: MergeRaw(d.data) }));
  },

  getSlug: (raw, account_no_only = false) => {
    let norek = raw.find((d) => d?.str?.includes("Main\tPocket\t"))?.str;

    if (account_no_only) return norek;

    return "JAGO-" + norek?.slice(-4);
  },

  getStartBalance: (raw) => {
    return "?";
    // return parseInt(
    //   raw
    //     ?.filter((d) => d.row == "0216")[0]
    //     ?.str.replaceAll(".", "")
    //     .replaceAll(",", ".")
    // );
  },
  getEndBalance: (raw) => {
    return parseInt(
      raw
        ?.filter((d) => d.row == "02200")[1]
        ?.str.replaceAll("Rp", "")
        ?.replaceAll(".", "")
        .replaceAll(",", ".")
    );
  },

  getInput: (row, allocation) => {
    // let amountValue = row
    //   .find((d) => d.col == 4)
    //   ?.str.replaceAll(" ", "")
    //   .replaceAll(".", "")
    //   .replaceAll(",", ".")
    //   .replaceAll("+", "");

    let amountValue = row[3]?.str.replaceAll(" ", "").replaceAll(".", "").replaceAll(",", ".").replaceAll("+", "");

    let dateValue = new Date(row[0]?.str);
    let containsTag = allocation.find((item) =>
      item?.meta?.some((tag) => row[2]?.str.toLowerCase().includes(tag.toLowerCase()))
    );

    return {
      date: dateValue,
      amount: amountValue * 1,
      // detail: row.find((d) => d.col == 2)?.str,
      detail: row[2]?.str,
      category_id: containsTag?.id || getDefaultAllocation(amountValue, allocation),

      selected: dateValue && dateValue != "Invalid Date" && amountValue,
    };
  },

  smartFilter: (d) => {
    if (d.data.length != 5) return false;
    // if (!d.data?.find((dx) => dx.col == 0)) return false;
    // if (!d.data?.find((dx) => dx.col == 5)) return false;
    // if (d.data?.find((dx) => dx.col == 5)?.str == " ") return false;
    // if (!new Date(d.data?.find((dx) => dx.col == 0)?.str.toLowerCase()).getTime()) return false;
    // if (h.containsLetter(d.data?.find((dx) => dx.col == 5)?.str)) return false;
    return true;
  },

  getColor: () => {
    return "#ffa242";
  },
};

function ColDiff(item, currentValue) {
  return Math.abs(item.col + item.width - parseInt(currentValue.col.substring(1)));
}

function MergeRaw(rawrow) {
  return rawrow.reduce((accumulator, currentValue) => {
    const existingItem = accumulator.find((item) => {
      return ColDiff(item, currentValue) < 1;
    });
    if (existingItem) {
      existingItem.str += currentValue.str;
    } else {
      accumulator.push({ ...currentValue, col: parseInt(currentValue.col?.substring(1)) });
    }
    return accumulator;
  }, []);
}
