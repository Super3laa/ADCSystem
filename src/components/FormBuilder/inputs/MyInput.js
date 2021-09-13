import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

export default function MyInput({
  name,
  translate,
  type,
  value,
  helperText,
  size,
  control,
  registerObject,
  errors,
  variant,
  color,
  fullWidth,
}) {
  return (
    <div style={{ /*marginTop: "10px"*/ }}>
      <p style={{ color: color }}>{translate}</p>
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            helperText={errors[name] ? helperText : null}
            error={errors[name] ? true : false}
            fullWidth={fullWidth}
            id={(variant ? variant : "outlined") + "-basic"}
            variant={variant ? variant : "outlined"}
            size={size ? size : "small"}
            id={name}
            type={type}
          />
        )}
        name={name}
        control={control}
        rules={registerObject}
        defaultValue={value}
      />
    </div>
  );
}
