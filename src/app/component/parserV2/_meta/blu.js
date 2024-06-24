import h from "@gh/helper";
import { isNaN } from "lodash";
import { getDefaultAllocation } from "./_generic";

export const bluePdf = {
  id: 9,
  name: "Bank BCA BLU",
  // min: 5,
  // max: 6,
  // rowLength: 6,
  // header: ["Date &	Time", "Source/Destination", " Transaction	Details", "Notes", "Amount", "Balance"],

  isThisMeta: (raw) => {
    return raw.find((d) => d?.str?.includes("bluAccount")) ? true : false;
  },

  dataPrep: (raw) => {
    let prep = h.groupByKeyToArr(
      raw.map((dx) => ({ ...dx, col: Math.floor(dx.col.substring(1) / 100), str: dx.str?.replace("\t", " ") })),
      "row"
    );
    return prep.map((d, ix) => detailprep(d, prep[ix - 3]));
  },

  getSlug: (raw, account_no_only = false) => {
    let norekRow = raw.find((d) => d?.str?.includes("bluAccount - 0011 3009 2310"))?.str.split("-");
    let norek = norekRow[1].replace(" ", "");
    if (account_no_only) return norek;

    return "BCA-" + norek?.slice(-4);
  },

  getStartBalance: (raw) => {
    let targetRow = raw.filter((d) => d?.str?.includes("Saldo Awal"))[1].row;
    let onRow = raw.filter((d) => d.row == targetRow && d.str);
    let startBalance = onRow[onRow.length - 1].str.replace(".", "");

    return parseFloat(startBalance);
  },
  getEndBalance: (raw) => {
    let targetRow = raw.filter((d) => d?.str?.includes("Saldo Akhir"))[1].row;
    let onRow = raw.filter((d) => d.row == targetRow && d.str);
    let endBalance = onRow[onRow.length - 1].str.replace(".", "");
    return parseFloat(endBalance);
  },

  getInput: (row, allocation, data) => {
    // if (row.length != 4) return {};
    let amountValue = row.find((d) => d.col == 4)?.str.replace(",", ".");
    // let dateValue = dateParse(row[0]?.str.replace("'", ""));

    let dateValue = new Date(row.find((d) => d.col == 0)?.str);
    let containsTag = allocation.find((item) => {
      return item?.meta?.some((tag) => row[1]?.str.toLowerCase().includes(tag.toLowerCase()));
    });

    return {
      date: dateValue,
      amount: amountValue,
      detail: row.find((d) => d.col == 1)?.str,
      category_id: containsTag?.id || getDefaultAllocation(amountValue, allocation),

      selected: dateValue && dateValue != "Invalid Date" && amountValue,
    };
  },

  smartFilter: (d) => {
    if (d.data[1]?.str?.includes("BIAYA ADM")) return true;
    else {
      // if (d.data.length < 3) return false;
      if (!d.data.find((dx) => dx.col == 0)?.str) return false;
      if (!d.data.find((dx) => dx.col == 1)?.str) return false;
      if (!d.data.find((dx) => dx.col == 5)?.str) return false;

      return true;
    }
  },
  getColor: () => {
    return "#33ccce";
  },
};

function cleanString(str) {
  return str?.replaceAll(",", "").replaceAll("+", "");
}

function dateParse(dateString) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  // Split the date string into day and month
  const [day, month] = dateString.split("/").map(Number);
  // Create a new Date object using the current year, day, and month
  const date = new Date(currentYear, month - 1, day);
  return new Date(date.toDateString())?.toISOString();
}

function detailprep(row, candidate) {
  // return row;

  let saldoData = row.data.find((d) => d.col == 5);
  if (saldoData) {
    if (!row.data.find((d) => d.col == 0) && row.data.length > 1 && row.data.length != 4) {
      return {
        ...row,
        data: [
          { row: saldoData.row, col: 0, str: candidate?.data?.find((dx) => dx.col == 0)?.str },
          { row: saldoData.row, col: 1, str: candidate?.data?.find((dx) => dx.col == 1)?.str },
          ...row.data,
        ],
      };
    }
  }
  return { key: "-", data: [] };
}
