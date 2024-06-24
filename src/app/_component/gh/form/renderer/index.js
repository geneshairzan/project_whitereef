import Form from "../index";

export default function FormRenderer({
  d,
  formik,
  disableMultiline = false,
  disableLabel = false,
  onChange,
  value,
  grow = 0,
}) {
  function labelRender(raw) {
    return raw.replaceAll("_id", " ").replaceAll("_", " ");
  }

  return (
    <>
      {!d.name.includes("_id") && d?.type == "String" && (
        <Form.Text
          label={!disableLabel ? labelRender(d.name) : ""}
          multiline={d.name == "desc" && !disableMultiline}
          rows={5}
          name={d.name}
          value={onChange ? value : formik?.values[d.name]}
          onChange={(v) => (onChange ? onChange(v) : formik?.handleChange(v))}
          grow={grow}
        />
      )}
      {!d.name.includes("_id") && d?.type == "Int" && (
        <Form.Currency
          prefix=""
          suffix=""
          grow={grow}
          label={!disableLabel ? labelRender(d?.label || d.name) : ""}
          name={d.name}
          value={formik?.values[d.name] || value?.[d.name]}
          onChange={(v) => {
            value
              ? onChange({ target: { value: v, name: d.name } })
              : formik?.setFieldValue(d.name, parseInt(v?.target?.value));
          }}
        />
      )}
      {d.name.includes("_id") && (
        <>
          <Form.Data
            grow={grow}
            createable
            url={d?.m_url || d.name.replace("_id", "")}
            label={!disableLabel ? labelRender(d?.m_label || d.name) : ""}
            name={d.name}
            data
            value={formik ? formik?.values[d.name] : value}
            onChange={(v) => (value ? onChange(v) : formik?.handleChange(v))}
          />
        </>
      )}
    </>
  );
}
