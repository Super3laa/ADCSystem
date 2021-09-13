import React, { useEffect } from "react";
//import Translate from "react-translate-component";
import { useForm } from "react-hook-form";
import MyInput from "./inputs/MyInput.js";
import MySelect from "./inputs/MySelect.js";
import MyCheckBox from "./inputs/MyCheckbox.js";
import ErrorArea from "./errors/ErrorArea.js";
import MySubmit from "./inputs/MySubmit.js";
import { Container,Row,Col } from "reactstrap/";
import "./FormBuilder.css";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";

import { create } from "jss";
import rtl from "jss-rtl";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function GenericForm({
  rows,
  language,
  dictionary = {},
  dir="ltr",
  title,
  submitHandler,
  grid={xs:12,md:6},
  values,
  noSubmit,
  fullWidth,
  submitButtonText,
  submitButtonFullWidth,
  color
}) {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    onChange,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: values,
  });
  if(!color){color="#000";}
  const theme = createTheme({
    palette: {
      primary: { main: color },
      type:"light"
    },
  });
  const onSubmit = (data) => {
    if (submitHandler) {
      submitHandler(data, setError, language);
    }
  };

  const titleHeader = () =>
    title ? (
      <h3 style={{ textAlign: "center" }}>
        {dictionary[language] && dictionary[language][title]
          ? dictionary[language][title]
          : title}
        {/* <Translate content={title} />*/}
      </h3>
    ) : null;
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <div
          className="genericForm"
          style={fullWidth ? { width: "100%" } : null}
        >
          {titleHeader()}
          <form className="form" dir={dir} onSubmit={handleSubmit(onSubmit)}>
            <Container>
              {rows &&
                rows.map((inputs, key) => {
                  return (
                    <Row key={key}>
                      {inputs &&
                        inputs.map((input, index) => {
                          input.control = control;
                          input.errors = errors;
                          input.reset = reset;
                          input.setValue = setValue;
                          input.getValues = getValues;
                          input.language = language;
                          input.onChange = onChange;
                          input.handleSubmit = handleSubmit;
                          input.translate =
                            dictionary[language] &&
                            dictionary[language][input.label]
                              ? dictionary[language][input.label]
                              : input.label;
                          input.placeHolder = 
                          dictionary[language] &&
                          dictionary[language][input.placeHolder]
                            ? dictionary[language][input.placeHolder]
                            : input.translate;
                          input.color = color;
                          return (
                            <Col
                              key={index}
                              xs={input.fullWidth ? 12 : grid.xs }
                              md={input.fullWidth ? 12 : grid.md}
                              style={{ marginBottom: "1rem" }}
                            >
                              {input.type === "select" ? (
                                <MySelect key={key} {...input} />
                              ) : input.type === "checkbox" ? (
                                <MyCheckBox key={key} {...input} />
                              ) : input.type === "custom" ? (
                                <input.component key={key} {...input} />
                              ) : (
                                <MyInput key={key} {...input} />
                              )}
                            </Col>
                          );
                        })}
                    </Row>
                  );
                })}
              {/*<ErrorArea errors={errors} />*/}
              {!noSubmit ? (
                <MySubmit
                  color={color}
                  fullWidth={submitButtonFullWidth}
                  submitButtonText={
                    dictionary[language] &&
                    dictionary[language][submitButtonText]
                      ? dictionary[language][submitButtonText]
                      : "Submit"
                  }
                />
              ) : null}
            </Container>
          </form>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}
