import React from "react";
import { Controller } from "react-hook-form";
/*import { Select, MenuItem, FormControl } from "@material-ui/core";*/
//import Translate from "react-translate-component";
import { create } from "jss";
import rtl from "jss-rtl";
import { jssPreset } from "@material-ui/core/styles";
import Select from "react-select";
import { useTheme } from "@material-ui/core";
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
export default function MySelect({
  name,
  language,
  translate,
  lang,
  value,
  rows,
  control,
  errors,
  helperText,
  handleChange,
  variant,
  size,
  translateType,
  fullWidth,
  maxWidth,
  minWidth,
  arrayFlag,
  defaultValue,
  latinArabicIdProcessing,
  languageName,
  labelMargin,
}) {
  if (latinArabicIdProcessing) {
    let parsedRows = [];
    rows.map((row) => {
      let parsedRow = {};
      parsedRow.value = row.id;
      parsedRow.label = row[languageName];
      parsedRows.push(parsedRow);
    });
    rows = parsedRows;
  }
  let defaultLabelMargin = "0 0 0.75rem 0";
  defaultLabelMargin = labelMargin ? labelMargin : defaultLabelMargin;
  const theme = useTheme();
  let color = theme.palette.primary.main;
  return (
    <label style={{ width: "100%" }}>
      <p style={{ color: color, margin: 0, margin: defaultLabelMargin }}>
        {translate ? translate : name}
      </p>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : rows[0].value}
        value={value ? value : rows[0].value}
        //handleChange={handleChange && handleChange}
        render={({ field }) => {
          return (
            <Select
              className="reactSelectFullWidth"
              isRtl={language == "ar" ? true : false}
              isSearchable={true}
              name={name}
              defaultValue={
                defaultValue
                  ? rows.find((row) => row.value == defaultValue)
                  : rows[0]
              }
              options={rows}
              value={rows.find((row) => row.value == field.value)}
              onChange={(data) => {
                field.onChange(data.value);
              }}
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  // color: state.isSelected ? "red" : "blue",
                }),
                menu: (provided, state) => ({
                  ...provided,
                  borderBottom: "1px dotted pink",
                  color: color,
                }),
                input: (provided, state) => ({
                  ...provided,
                  paddingTop: 5,
                  paddingBottom: 5,
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  //primary25: color,
                  primary: color,
                },
                padding: 50,
              })}
            />
          );
        }}
      />
    </label>
  );
}
