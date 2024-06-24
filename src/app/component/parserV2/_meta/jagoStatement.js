import h from "@gh/helper";
import { isNaN } from "lodash";
import { getDefaultAllocation } from "./_generic";

export const jago = {
  id: 5,
  name: "Bank Jago",
  min: 5,
  max: 6,
  rowLength: 6,
  header: ["Date &	Time", "Source/Destination", " Transaction	Details", "Notes", "Amount", "Balance"],

  isThisMeta: (raw) => {
    if (
      raw.find((d) => d.str == "www.jago.com") &&
      raw.find((d) => d.str.replaceAll("\t", " ").includes("Monthly Statements"))
    ) {
      return true;
    }
    return false;
  },

  dataPrep: (raw) => {
    return h
      .groupByKeyToArr(
        raw.map((dx) => ({ ...dx, col: Math.floor(dx.col.substring(1) / 100), str: dx.str?.replace("\t", " ") })),
        "row"
      )
      .sort((a, b) => (a.key > b.key ? 1 : -1));
  },

  getSlug: (raw, account_no_only = false) => {
    let norek = raw.find((d) => d?.str?.includes("Account\tno"))?.str;

    if (account_no_only) return norek;

    return "JAGO-" + norek?.slice(-4);
  },

  getStartBalance: (raw) => {
    return parseInt(
      raw
        .filter((d) => d.row == "0216")[0]
        .str.replaceAll(".", "")
        .replaceAll(",", ".")
    );
  },
  getEndBalance: (raw) => {
    return parseInt(
      raw
        .filter((d) => d.row == "0216")[1]
        .str.replaceAll(".", "")
        .replaceAll(",", ".")
    );
  },

  getInput: (row, allocation) => {
    let amountValue = row
      .find((d) => d.col == 4)
      ?.str.replaceAll(" ", "")
      .replaceAll(".", "")
      .replaceAll(",", ".")
      .replaceAll("+", "");

    let dateValue = new Date(row[0]?.str);
    let containsTag = allocation.find((item) => {
      return item?.meta?.some((tag) => row[2]?.str.toLowerCase().includes(tag.toLowerCase()));
    });

    return {
      date: dateValue,
      amount: amountValue * 1,
      detail: row.find((d) => d.col == 2)?.str,
      category_id: containsTag?.id || getDefaultAllocation(amountValue, allocation),

      selected: dateValue && dateValue != "Invalid Date" && amountValue,
    };
  },

  smartFilter: (d) => {
    if (!d.data?.find((dx) => dx.col == 0)) return false;
    if (!d.data?.find((dx) => dx.col == 5)) return false;
    if (d.data?.find((dx) => dx.col == 5)?.str == " ") return false;
    if (!new Date(d.data?.find((dx) => dx.col == 0)?.str.toLowerCase()).getTime()) return false;
    if (h.containsLetter(d.data?.find((dx) => dx.col == 5)?.str)) return false;
    return true;
  },
  getColor: () => {
    return "#ffa242";
  },
};
