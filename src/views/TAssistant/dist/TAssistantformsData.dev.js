"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var formsData = new Map();
formsData.set('attendance', {
  rows: [[{
    name: "type",
    label: "البيان",
    type: "select",
    value: "",
    rows: [{
      value: "محاضرة",
      label: "محاضرة"
    }, {
      value: "تمرين",
      label: "تمرين"
    }, {
      value: "معمل",
      label: "معمل"
    }],
    size: "small",
    helperText: "لا يترك فارغا",
    placeHolder: "",
    variant: "outlined",
    xs: 12,
    md: 6
  }, {
    name: "weekno",
    label: "اسبوع رقم",
    type: "number",
    value: "",
    size: "small",
    helperText: "لا يترك فارغا",
    placeHolder: "",
    variant: "outlined",
    xs: 12,
    md: 6
  }, {
    name: "status",
    label: "حالة الحضور",
    type: "select",
    value: "",
    rows: [{
      value: "حضر",
      label: "حضر"
    }, {
      value: "لم يحضر",
      label: "لم يحضر"
    }],
    size: "small",
    helperText: "لا يترك فارغا",
    placeHolder: "",
    variant: "outlined",
    xs: 12,
    md: 6
  }]],
  noSubmit: false,
  grid: {
    xs: 12,
    md: 6
  },
  dir: "rtl",
  submitButtonText: "إضافة",
  submitButtonFullWidth: true
});
var _default = formsData;
exports["default"] = _default;