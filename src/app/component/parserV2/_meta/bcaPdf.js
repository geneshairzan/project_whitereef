import h from "@gh/helper";
import { isNaN } from "lodash";
import { getDefaultAllocation } from "./_generic";

export const bcaPdf = {
  id: 8,
  name: "Bank BCA",
  // min: 5,
  // max: 6,
  // rowLength: 6,
  // header: ["Date &	Time", "Source/Destination", " Transaction	Details", "Notes", "Amount", "Balance"],

  isThisMeta: (raw) => {
    return raw.find((d) => d.str?.includes("BCA berhak")) ? true : false;
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
    let norekRow = raw.find((d) => d?.str?.includes("NO. REKENING"))?.row;
    let onRow = raw.filter((d) => d.row == norekRow);
    let norek = onRow[onRow.length - 1].str;

    if (account_no_only) return norek;

    return "BCA-" + norek?.slice(-4);
  },

  getStartBalance: (raw) => {
    let targetRow = raw.find((d) => d?.str?.includes("SALDO AWAL"))?.row;
    let onRow = raw.filter((d) => d.row == targetRow);
    let startBalance = onRow[onRow.length - 1].str.replace(",", "");
    return parseFloat(startBalance);
  },
  getEndBalance: (raw) => {
    let targetRow = raw.find((d) => d?.str?.includes("SALDO AKHIR"))?.row;
    let onRow = raw.filter((d) => d.row == targetRow && d.str);
    let endBalance = onRow[onRow.length - 1].str.replace(",", "");
    return parseFloat(endBalance);
  },

  getInput: (row, allocation, data) => {
    // console.log(data);

    if (row?.length < 4) return {};
    let amountValue = row.length == 5 ? cleanString(row[3].str) : cleanString(row[row.length - 3].str);
    amountValue = row[4]?.str == "DB" ? amountValue * -1 : amountValue;

    let year = data.find((d) => d.data[0].str?.includes("PERIOD")).data[2].str.split(" ")[1];
    let dateValue = dateParse(row[0]?.str.replace("'", ""), year);
    let containsTag = allocation.find((item) => {
      return item?.meta?.some((tag) => row[1]?.str.toLowerCase().includes(tag.toLowerCase()));
    });

    return {
      date: dateValue,
      amount: amountValue,
      detail: row[1]?.str,
      category_id: containsTag?.id || getDefaultAllocation(amountValue, allocation),

      selected: dateValue && dateValue != "Invalid Date" && amountValue,
    };
  },

  smartFilter: (d) => {
    if (d.data[1]?.str == "BIAYA ADM") return true;
    if (d.data[0]?.str.includes("PERIODE")) return true;
    else {
      if (d.data[0].str.length != 5) return false;
      if (d.data.length < 4) return false;
      return true;
    }
  },
  getColor: () => {
    return "#015eb2";
  },
};

function cleanString(str) {
  return str.replaceAll(",", "").replaceAll("+", "");
}

function dateParse(dateString, year) {
  // Get the current year
  const currentYear = year || new Date().getFullYear();
  // Split the date string into day and month
  const [day, month] = dateString.split("/").map(Number);
  // Create a new Date object using the current year, day, and month
  const date = new Date(currentYear, month - 1, day);
  return new Date(date.toDateString())?.toISOString();
}
