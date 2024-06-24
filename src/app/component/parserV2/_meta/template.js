import h from "@gh/helper";
import { parseInt } from "lodash";
import { getDefaultAllocation } from "./_generic";

export const template = {
  id: 1,
  name: "Smarti Template",

  rowLength: 6,
  // detailCol: 1,
  // amountCol: 5,
  header: ["Date & Time", "Keterangan", " Cabang", "Jumlah", "Type", "Saldo"],

  dataPrep: (raw) => {
    return raw.map((d, ix) => ({
      key: ix,
      data: d?.map((dx, dix) => ({
        // str: dix == 0 ? dateParse(dx?.replace("'", "")) : dx,
        str: dx,
        row: ix,
        col: dix,
        isDate: dix == 0,
        // isNumber: dix == 5 || dix == 3,
        isNumber: dix == 5 || dix == 3,
      })),
    }));
  },

  isThisMeta: (raw) => {
    return raw[0][0] == "SMARTI Transcation Import" ? true : false;
  },

  getSlug: (raw, account_no_only = false) => {
    return "";
  },

  getStartBalance: (raw) => {
    return "?";
  },
  getEndBalance: (raw) => {
    return "?";
  },

  smartFilter: (d) => {
    if (d.key < 2 || d.data.length < 3) return false;
    // if (!d.data?.find((dx) => dx.col == 5)) return false;
    // if (d.data?.find((dx) => dx.col == 5)?.str == " ") return false;
    // if (h.containsLetter(d.data?.find((dx) => dx.col == 5)?.str)) return false;
    return true;
  },

  getInput: (row, allocation) => {
    let amountValue = parseInt(row[2]?.str);
    // let dateValue = dateParse(row[0].str);
    let dateValue = row[0].str;
    let containsTag = allocation.find((item) =>
      item?.meta?.some((tag) => row[1].str.toLowerCase().includes(tag.toLowerCase()))
    );

    return {
      date: dateValue,
      amount: amountValue,
      detail: row[1].str,
      selected: dateValue && amountValue,
      category_id: containsTag?.id || getDefaultAllocation(amountValue, allocation),

      // selected: Math.random() < 0.5 ? true : false,
    };
  },
  getColor: () => {
    return "#015eb2";
  },
};

function dateParse(dateString) {
  const dateArray = dateString.split("-");
  const date = new Date(dateArray[2], monthMap[dateArray[1]], dateArray[0]);
  return date.toDateString();
}

let monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};
