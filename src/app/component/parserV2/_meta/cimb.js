import h from "@gh/helper";
import { getDefaultAllocation } from "./_generic";

export const cimb = {
  id: 4,
  name: "Bank CIMB - OCTO Pay",
  min: 5,
  max: 6,
  rowLength: 5,
  header: ["Tanggal", "Deskripsi", " Debit", "Kredit", "Saldo"],
  isThisMeta: (raw) => {
    if (raw.find((d) => d?.str?.toLowerCase().includes("octo"))) {
      return true;
    }
    return false;
  },
  dataPrep: (raw) => {
    return h
      .groupByKeyToArr(
        h.colMerged(
          raw.map((dx) => ({
            ...dx,
            row: Math.round(dx.row / 10),
            col: Math.floor(dx.col / (dx.col < 200 ? 100 : 120)),
          }))
        ),
        "row"
      )
      .sort((a, b) => (a.key > b.key ? 1 : -1));
  },

  getSlug: (raw, account_no_only = false) => {
    let norek = raw.filter((d) => d.row?.includes("0689.") && d.col.toString()?.includes("161."));
    if (account_no_only) return norek[0].str;

    return "CIMB-" + norek[0].str.slice(-4);
  },

  getStartBalance: (raw) => {
    return "?";
    return raw[raw.length - 5][2] * 1;
  },
  getEndBalance: (raw) => {
    return "?";
    return raw[raw.length - 2][2] * 1;
  },

  getInput: (row, allocation) => {
    let dateValue = new Date(row[0]?.str);
    let amountValue = parseInt(
      row
        .find((d) => d.col == 3)
        ?.str.replaceAll(" ", "")
        .replaceAll(",", "")
        .replaceAll("+", "")
    );
    let containsTag = allocation.find((item) =>
      item?.meta?.some((tag) => row[1].str.toLowerCase().includes(tag.toLowerCase()))
    );

    return {
      category_id: containsTag?.id || getDefaultAllocation(amountValue, allocation),

      selected: dateValue && amountValue,
      date: dateValue,
      amount: amountValue,
      detail: row[1]?.str,
    };
  },

  smartFilter: (d) => {
    if (!d.data?.find((dx) => dx.col == 0)) return false;
    if (!d.data?.find((dx) => dx.col == 1)) return false;
    if (!d.data?.find((dx) => dx.col == 4)) return false;
    if (h.containsLetter(d.data?.find((dx) => dx.col == 4)?.str)) return false;
    return true;
  },
  getColor: () => {
    return "#ad2323";
  },
};
