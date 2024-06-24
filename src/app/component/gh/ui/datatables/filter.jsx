import React, { useState, useEffect } from "react";

import UI from "@gh/ui";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import h from "@gh/helper";

export default function App({ FilterEle, filter, onFilterChange, ...props }) {
  const [open, setopen] = useState(false);
  const [rFilter, setrFilter] = useState([]);
  const [value, setvalue] = useState(filter);

  useEffect(() => {
    setvalue(filter);

    let temp = [];
    Object.keys(filter).forEach(function (key) {
      if (filter[key] != null) {
        if (typeof filter[key] == "object") {
          if (filter[key].length && key != "companyarr") {
            temp.push({
              field: key,
              data: filter[key].reduce((a, b, ix) => a.concat(b.name, ix != filter[key].length - 1 ? ", " : ""), ""),
            });
          } else {
            temp.push({ field: key, data: filter[key].name });
          }
        } else temp.push({ field: key, data: filter[key] });
      }
    });
    setrFilter([...temp]);
  }, [filter]);

  function handleFilter() {
    setopen(false);
    !h.data.isEmpty(value) && onFilterChange(value);
  }

  return (
    <UI.Stack>
      <UI.Row alignItems="flex-start">
        <UI.Button color="secondary" startIcon={<FilterAltIcon />} onClick={() => setopen(true)}>
          Filter
        </UI.Button>
        <RenderFilter data={rFilter} />
      </UI.Row>
      <UI.Modal open={open} width={960} minHeight={300}>
        <UI.Stack justifyContent="space-between" flexGrow={1}>
          <UI.Col>
            <UI.Heading mb={2}>Filters</UI.Heading>
            <FilterEle onChange={(v) => setvalue(v)} value={value} />
          </UI.Col>
          <UI.Button onClick={handleFilter}>Save</UI.Button>
        </UI.Stack>
      </UI.Modal>
    </UI.Stack>
  );
}

function RenderFilter({ data }) {
  if (!data.length) return;

  function renderField(raw) {
    return renderFieldMap(raw);
  }
  return (
    <UI.Row
      // spacing={2}
      ml={2}
      // maxWidth={200}
      sx={{
        flexWrap: "wrap",
      }}
    >
      {data
        .filter((d) => d.data && d.data != "-" && d.field != "quater" && d.field != "co")
        .map((d, ix) => (
          <UI.ChipFilter
            sx={{ m: "2px" }}
            key={ix}
            label={`${renderField(d.field.replace("_id", "").replace("arr", ""))} : ${d.data}`}
          />
        ))}
    </UI.Row>
  );
}

function renderFieldMap(raw) {
  switch (raw) {
    case "kategoriperkara":
      return "kategori perkara";

    case "pokokperkara":
      return "pokok perkara";

    case "datestart":
      return "date start";

    case "dateend":
      return "date end";

    case "jenisperkara":
      return "jenis perkara";

    case "pokokhukum":
      return "pokok hukum";

    case "motifperusahaan":
      return "motif perusahaan";

    default:
      return raw;
  }
}
