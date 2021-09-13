import React from "react";
export default function ErrorArea({ errors }) {
  return (
    <div>
      {errors
        ? Object.keys(errors).map((key) => {
            return (
              <div id="error-area">
                {errors[key].message ? errors[key].message : errors[key].type}
              </div>
            );
          })
        : null}
    </div>
  );
}
