import React from "react";
import { Controller } from "react-hook-form";
import { Select, MenuItem, FormControl } from "@material-ui/core";
//import Translate from "react-translate-component";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

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
  color,
  fullWidth,
  maxWidth,
  minWidth,
  arrayFlag,
}) {
  /*
    if (!control.defaultValuesRef.current[name]) {
        if (!value && rows && rows[0] && rows[0].id) {
            control.defaultValuesRef.current[name] = rows[0].id;
        } else if (!value && rows && rows[0] && rows[0].value) {
            control.defaultValuesRef.current[name] = rows[0].value;
        }
    }
*/
  if (!color) {
    color = "#000";
  }
 /** if (!maxWidth) {
    maxWidth = "400px";
  }**/
  if (!minWidth) {
    minWidth = "100px";
  }
  let defaultValue = "";
  if (value) defaultValue = value;
  else if (rows && rows[0] && rows[0].id) defaultValue = rows[0].id;
  else if (rows && rows[0] && rows[0].value) defaultValue = rows[0].value;

  return (
    <label className="form-label" /*style={{ margin: "20px" }}*/>
      <p style={{ color: color }}>{translate}</p>
      {/*  <Translate content={name} style={{ margin: "0 0 5px 0" }} />*/}
      <FormControl
        fullWidth
        style={{ textAlign: "justify", maxWidth: maxWidth, minWidth: minWidth }}
        size={size ? size : "small"}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={value}
          handleChange={handleChange && handleChange}
          render={({ field }) => {
            return (
              <StylesProvider jss={jss}>
                <Select
                  {...field}
                  helperText={errors[name] ? helperText : null}
                  error={errors[name] ? true : false}
                  labelId={name + "Id"}
                  label={name}
                  id={name}
                  defaultValue={defaultValue}
                  id={(variant ? variant : "outlined") + "-basic"}
                  variant={variant ? variant : undefined}
                  size={size ? size : "small"}
                >
                  {rows &&
                    rows.map((row, idx) => {
                      let imaginaryRow={};
                      if(arrayFlag){
                        imaginaryRow.value=row;
                        row=imaginaryRow;
                      }
                      return (
                        <MenuItem
                          key={idx}
                          value={row.id ? row.id : row.value ? row.value : idx}
                        >
                          {row[language]
                            ? row[language]
                            : row.name
                            ? row.name
                            : row.value
                            ? row.value
                            : idx}
                        </MenuItem>
                      );
                    })}
                </Select>
              </StylesProvider>
            );
          }}
        />
      </FormControl>
    </label>
  );
}
