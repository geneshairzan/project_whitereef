import moment from "moment";

function excelDateParse(data) {
  return new Date(Math.round((data - 25569) * 86400 * 1000));
}
const monthListShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fdate = {
  moment: () => moment(),
  today: () => moment(new Date()).format("DD MMM YYYY"),
  todayYear: new Date().getFullYear(),
  todayMonth: new Date().getMonth(),
  todayMonthName: monthListShort[new Date().getMonth()],
  getWeekOfMonth: getWeekOfMonth,
  onWhichWeekOfMonth: onWhichWeekOfMonth,
  onWhichWeekOfYear: onWhichWeekOfYear,
  onWhichMonthOfYear: (d = null) => new Date(d).getMonth(),
  onWhichOfYear: (d = null) => new Date(d).getFullYear(),
  monthListShort: monthListShort,

  preformat: (data) => moment(data || new Date()),
  format: (data) => moment(data).format("DD MMM YYYY"),
  formatImport: (data) => moment(data).format("DD MMM YY"),
  format2: (data) => moment(data).format("DD/MM/YYYY"),
  format3: (data) => moment(data).format("MMM DD, YYYY"),
  format4: (data) => moment(data).format("h.mma"),
  format5: (data) => moment(data).format("MMM YYYY"),
  format6: (data) => moment(excelDateParse(data)).format("MMM YYYY"),
  formatTS: (data) => moment(data).format("DD.MM.YYYY"),

  from: (data) => moment(data, "DD MMM YYYY"),

  format_time: (data) => moment(data).format("DD MMM YYYY h.mma"),
  // format_build: (data) => "1." + moment(data).format("hmm"),
  format_build: (data) => moment(data).format("DMYY hmm"),
  fileFormater: () => moment(new Date()).format("YYYY.MM.DD"),

  datediff: (d1, d2) => {
    let a = moment(d1);
    let b = moment(d2);

    let years = a.diff(b, "year");
    b.add(years, "years");

    let months = a.diff(b, "months");
    b.add(months, "months");

    let days = a.diff(b, "days");
    return `${Math.abs(years)} yr ${Math.abs(months)} months ${Math.abs(days)} days`;

    let rv = "";
    if (years > 0) rv += `${years} yr`;
    return `${rv} ${Math.abs(months)} months ${Math.abs(days)} days`;

    // 8 years 5 months 2 days

    return "xx";
  },

  yrdiff: (d1, d2 = new Date()) => {
    let a = moment(d1);
    let b = moment(d2);

    return Math.abs(a.diff(b, "year"));
  },

  isToday: (data) => {
    return new Date(data).toDateString() === new Date().toDateString() ? true : false;
  },

  isThisMonth: (data) => {
    return new Date(data).getMonth() === new Date().getMonth() ? true : false;
  },
};

// ==================================================================================================================
const fcurr = {
  format: (data, decimal = 2) =>
    data?.toLocaleString("de-DE", { minimumFractionDigits: decimal, maximumFractionDigits: decimal }),
  format2: (data) => formatter2.format(data),
  formatDec0: (data) => data.toFixed(0),
  formatDec2: (data) => data.toFixed(2),
};

//with dot .
var formatter = new Intl.NumberFormat("de-DE", {
  undefined,
});

//with comma ,
var formatter2 = new Intl.NumberFormat("en-US", {
  undefined,
});

// ==================================================================================================================

// const time_format = "h:mma";

const ftime = {
  format: (data) => moment(data, "HH:mm:ss").format("h:mm a"),
};

// ==================================================================================================================
// BUDGETING;
// ==========

function getWeekOfMonth(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const dayOfWeek = firstDayOfMonth.getDay();
  const adjustedDays = daysInMonth + dayOfWeek;
  return Math.ceil(adjustedDays / 7);
}

function onWhichWeekOfYear(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weekNumber = Math.ceil((date - firstDayOfYear) / millisecondsPerWeek);
  return weekNumber;
}

function onWhichWeekOfMonth(date = new Date()) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const adjustedDate = date.getDate() + dayOfWeek - 1;
  return Math.ceil(adjustedDate / 7);
}

export { fdate, fcurr, ftime };
