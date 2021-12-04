import React from "react";
import { Controller } from "react-hook-form";
import { TextField, InputLabel } from "@material-ui/core";
import { useTheme } from "@material-ui/core";

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
  fullWidth,
  placeHolder,
  labelMargin,
  enableLabel = false,
}) {
  let defaultLabelMargin = "0 0 1rem 0 ";
  switch (variant) {
    case "outlined":
      defaultLabelMargin = "0 0 1rem 0";
      break;
    case "filled":
      defaultLabelMargin = "0 0 0.5rem 0";
      break;
    case "standard":
      defaultLabelMargin = "0 0 0.5rem 0";
      break;
  }
  const theme = useTheme();
  const color = theme.palette.primary.main;
  defaultLabelMargin = labelMargin ? labelMargin : defaultLabelMargin;
  return (
    <div style={{}}>
      <p style={{ color: color, margin: defaultLabelMargin }}>{translate}</p>
      <Controller
        render={({ field }) => (
          <>
            {/*
            <InputLabel id="demo-simple-select-outlined-label">
              {translate}
            </InputLabel>
          */}
            <TextField
              {...field}
              key={translate}
              helperText={errors[name] ? helperText : null}
              error={errors[name] ? true : false}
              //fullWidth={fullWidth}
              id={(variant ? variant : "Outlined") + "-basic"}
              variant={variant ? variant : "outlined"}
              size={size ? size : "small"}
              id={name}
              color="primary"
              placeholder={placeHolder}
              type={type}
              style={{ padding: 0, verticalAlign: "center" }}
              label={enableLabel ? translate : null}
              isRTL={true}
            />
          </>
        )}
        name={name}
        control={control}
        rules={registerObject}
        defaultValue={value}
      />
    </div>
  );
}
