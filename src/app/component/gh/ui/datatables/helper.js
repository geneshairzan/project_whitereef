export function search(e, search) {
  return Object.keys(e).some((k) => typeof e[k] === "string" && e[k].toLowerCase().includes(search.toLowerCase()));
}

export function order(a, b, orderinput) {
  if (orderinput.by == null) return;

  if (orderinput.asc && !dataFind(a, orderinput.by)) {
    return -1;
  }

  if (!orderinput.asc && !dataFind(b, orderinput.by)) {
    return -1;
  }

  if (dataFind(a, orderinput.by) < dataFind(b, orderinput.by)) {
    return orderinput.asc ? -1 : 1;
  }
  if (dataFind(a, orderinput.by) > dataFind(b, orderinput.by)) {
    return orderinput.asc ? 1 : -1;
  }
  return 0;
}

function dataFind(d, dt) {
  let intField = [
    "nilai_perkara",
    "total_verifikasi",
    "total_verifikasi_selesih",
    "biayapenyelesaian",
    "kewajiban",
    "hak",
  ];

  if (dt.includes(".")) {
    dt.split(".").forEach((e) => {
      d[e] ? (d = d[e]) : (d = "");
    });
    return d;
  } else {
    if (dt == "durasi_perkara") {
      return parseInt(d[dt]?.replaceAll("days", ""));
    } else return intField.includes(dt) ? parseInt(d[dt]?.substring(4)?.replaceAll(".", "")) : d[dt];
  }
}
