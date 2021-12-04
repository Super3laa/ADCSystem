import React from "react";
//import Translate from "react-translate-component";
import Button from "@material-ui/core/Button";

export default function Submit({ submitButtonText }) {
  return (
    <div className="btn-form">
        <Button size="large" variant="contained" color="primary" type="submit">
          {submitButtonText}
        </Button>
    </div>
  );
}
