import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@material-ui/core";
//import Translate from "react-translate-component";

export default function MyCheckBox({
    name,
    value,
    size,
    registerObject,
    control,
}) {
    return (
        <>
            <label className={"form-checkLabel"}>
                <Controller
                    render={({ field }) => (
                        <Checkbox {...field} checked={value}/>
                    )}
                    name={name}
                    control={control}
                    value={value}
                    rules={registerObject}
                />
                {name}
              {/*  <Translate content={name} />*/}
            </label>
        </>
    );
}
