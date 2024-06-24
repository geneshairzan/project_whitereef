import h from "@gh/helper";
import { getDefaultAllocation } from "./_generic";

export const jenius = {
  id: 7,
  name: "Bank BTPN - Jenius",
  min: 5,
  max: 6,
  rowLength: 4,
  header: ["Date & Time", "Details", "Notes", "Amount"],
  isThisMeta: (raw) => {
    if (raw.find((d) => d?.str?.includes("PT Bank BTPN"))) {
      return true;
    }
    return false;
  },
  dataPrep: (raw) => {
    return h
      .groupByKeyToArr(
        raw.map((dx) => ({ ...dx, rcol: dx.col, col: Math.floor(dx.col / 135), str: dx.str?.replace("\t", " ") })),
        "row"
      )
      .sort((a, b) => (a?.key > b?.key ? 1 : -1));
  },

  getSlug: (raw, account_no_only = false) => {
    let norek = raw.filter((d) => d.row?.toString().includes("0732.") && d.col.toString()?.includes("26."))[0].str;
    if (account_no_only) return norek;

    return "Jenius-" + norek.slice(-4);
  },

  getStartBalance: (raw) => {
    return "?";
    return parseInt(
      raw
        .filter((d) => d.row == "0216")[0]
        .str.replaceAll(".", "")
        .replaceAll(",", ".")
    );
  },
  getEndBalance: (raw) => {
    return "?";
    return parseInt(
      raw
        .filter((d) => d.row == "0216")[1]
        .str.replaceAll(".", "")
        .replaceAll(",", ".")
    );
  },

  getInput: (row, allocation) => {
    let amountValue = parseInt(
      row
        .find((d) => d.col == 3)
        ?.str.replaceAll(" ", "")
        .replaceAll(",", "")
        .replaceAll("+", "")
    );

    let dateValue = new Date(row[0]?.str);
    let containsTag = allocation.find((item) =>
      item?.meta?.some((tag) => row[1]?.str.toLowerCase().includes(tag.toLowerCase()))
    );

    return {
      date: dateValue,
      amount: amountValue,
      detail: row[1]?.str,
      category_id: containsTag?.id || getDefaultAllocation(amountValue, allocation),
      selected: dateValue && amountValue ? true : false,
    };
  },

  smartFilter: (d) => {
    if (!d.data?.find((dx) => dx.col == 0)) return false;
    if (!d.data?.find((dx) => dx.col == 3)) return false;
    if (h.containsLetter(d.data?.find((dx) => dx.col == 3)?.str)) return false;
    return true;
  },
  getColor: () => {
    return "#00a4de";
  },
};
