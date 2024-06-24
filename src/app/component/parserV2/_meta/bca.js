import h from "@gh/helper";
import { parseInt } from "lodash";
import { getDefaultAllocation } from "./_generic";

export const bca = {
  id: 3,
  name: "Bank BCA",

  // rowLength: 6,
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
    return raw[0][0] == "No. Rekening" && raw[1][0] == "Nama";
  },

  getSlug: (raw, account_no_only = false) => {
    let account_no = raw[0][2]?.replace("'", "");
    if (account_no_only) return account_no;
    return "BCA-" + account_no?.slice(-4);
  },

  getStartBalance: (raw) => {
    return raw[raw.length - 5][2] * 1;
  },
  getEndBalance: (raw) => {
    return raw[raw.length - 2][2] * 1;
  },

  smartFilter: (d) => {
    if (!d.data?.find((dx) => dx.col == 0)) return false;
    if (!d.data?.find((dx) => dx.col == 5)) return false;
    if (d.data?.find((dx) => dx.col == 5)?.str == " ") return false;
    if (h.containsLetter(d.data?.find((dx) => dx.col == 5)?.str)) return false;
    return true;
  },

  getInput: (row, allocation) => {
    let amountValue = row[3]?.str;
    let dateValue = dateParse(row[0]?.str.replace("'", ""));
    let containsTag = allocation?.find((item) =>
      item?.meta?.some((tag) => row[1].str.toLowerCase().includes(tag.toLowerCase()))
    );

    let amountValueSigned = row[4]?.str == "DB" ? amountValue * -1 : amountValue;
    return {
      date: dateValue,
      amount: parseInt(amountValueSigned),
      detail: row[1]?.str,
      selected: dateValue && amountValue,
      category_id: containsTag?.id || getDefaultAllocation(amountValueSigned, allocation),

      // selected: Math.random() < 0.5 ? true : false,
    };
  },

  getColor: () => {
    return "#015eb2";
  },
};

function dateParse(dateString) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  // Split the date string into day and month
  const [day, month] = dateString.split("/").map(Number);
  // Create a new Date object using the current year, day, and month
  const date = new Date(currentYear, month - 1, day);
  return new Date(date.toDateString())?.toISOString();
}
