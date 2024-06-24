import h from "@gh/helper";
import { getDefaultAllocation } from "./_generic";

export const uob = {
  id: 2,
  name: "Bank UOB",
  min: 5,
  max: 6,
  rowLength: 6,
  header: ["Trans Date", "Value Date", " Description", "Withdrawals", "Deposits", "Balance"],
  // mapper: (d) => {
  //   return { ...d };
  // },

  isThisMeta: (raw) => {
    if (raw.find((d) => d?.str?.toLowerCase().includes("14008 (UOB Call Center)".toLowerCase()))) {
      return true;
    }
    return false;
  },

  dataPrep: (raw) => {
    return h
      .groupByKeyToArr(
        raw.map((dx) => ({
          ...dx,
          row: Math.round(dx.row / 10),
          col: Math.floor(dx.col / 100),
        })),
        "row"
      )
      .sort((a, b) => (a.key > b.key ? 1 : -1));
  },

  getSlug: (raw, account_no_only = false) => {
    let index = raw.findIndex((d) => d.str?.toString().includes("Tabungan"));
    let norek = raw[index + 4]?.str.replaceAll("-", "");

    if (account_no_only) return norek;

    return "UOB-" + norek.slice(-4);
  },

  getStartBalance: (raw) => {
    return 0;
  },
  getEndBalance: (raw) => {
    return 0;
  },

  getInput: (row, allocation) => {
    let amountCandidate = row.find((d) => d.col == 3)?.str ? 3 : 4;
    let amountValue = parseInt(
      row
        .find((d) => d.col == amountCandidate)
        ?.str.replaceAll(" ", "")
        .replaceAll(",", "")
        .replaceAll("+", "")
    );
    let containsTag = allocation.find((item) =>
      item?.meta?.some((tag) => row[2]?.str.toLowerCase().includes(tag.toLowerCase()))
    );
    let dateValue = new Date(row[0]?.str);
    let amountSigned = amountCandidate == 3 ? -amountValue : amountValue;
    return {
      date: dateValue,
      amount: amountSigned,
      detail: row.find((d) => d.col == 2)?.str,
      category_id: containsTag?.id || getDefaultAllocation(amountSigned, allocation),

      selected: dateValue && amountValue,
    };
  },

  smartFilter: (d) => {
    if (!d.data?.find((dx) => dx.col == 0)) return false;
    if (!d.data?.find((dx) => dx.col == 1)) return false;
    if (!d.data?.find((dx) => dx.col == 5)) return false;
    if (!d.data?.find((dx) => dx.col == 3)?.str && !d.data?.find((dx) => dx.col == 4)?.str) return false;
    if (h.containsLetter(d.data?.find((dx) => dx.col == 5)?.str)) return false;
    if (!new Date(d.data?.find((dx) => dx.col == 0)?.str.toLowerCase()).getTime()) return false;

    return true;
  },
  getColor: () => {
    return "#3a70b5";
  },
};
