"use strict";

var readXlsxFile = require('read-excel-file/node');

var writeXlsxFile = require('write-excel-file/node');

var path = require('path');

var models = require('../models');

var student = models.student;
var officer = models.Officer;
var doctor = models.Doctor;
var TAssistants = models.TAssistant;
var course = models.course;
var XlsxFollower = [{
  modelType: course,
  fileName: "courses",
  map: {
    'اسم المادة': 'title',
    'كود المادة': 'code',
    'القسم': 'type',
    'سنة دراسية': 'year'
  },
  schema: [{
    column: 'اسم المادة',
    type: String,
    value: function value(student) {
      return student.title;
    }
  }, {
    column: 'كود المادة',
    type: String,
    value: function value(student) {
      return student.code;
    }
  }, {
    column: 'القسم',
    type: String,
    value: function value(student) {
      return student.type;
    }
  }, {
    column: 'سنة دراسية',
    type: String,
    value: function value(student) {
      return student.year;
    }
  }]
}, {
  modelType: student,
  fileName: "students",
  map: {
    'الاسم': 'name',
    'رقم العسكري': 'militaryId',
    'الفرقة': 'group',
    'الفصيلة': 'section',
    'السرية': 'unit',
    'المحافظه': 'town',
    'الدولة': 'country',
    'القسم': 'type',
    'البريد الإلكتروني': 'email',
    'مجموع الثانوية العامة': 'collegeDegree',
    'تقدير الترم /العام السابق': 'prevTermDegree',
    'اضعف تقدير الترم /العام السابق': 'prevTermweekestDegree'
  },
  schema: [{
    column: 'الاسم',
    type: String,
    value: function value(student) {
      return student.name;
    }
  }, {
    column: 'رقم العسكري',
    type: String,
    value: function value(student) {
      return student.militaryId;
    }
  }, {
    column: 'البريدالإلكتروني',
    type: String,
    value: function value(student) {
      return student.email;
    }
  }, {
    column: 'الفرقة',
    type: String,
    value: function value(student) {
      return student.group;
    }
  }, {
    column: 'السرية',
    type: String,
    value: function value(student) {
      return student.unit;
    }
  }, {
    column: 'الفصيلة',
    type: String,
    value: function value(student) {
      return student.section;
    }
  }, {
    column: 'القسم',
    type: String,
    value: function value(student) {
      return student.type;
    }
  }, {
    column: 'المحافظه',
    type: String,
    value: function value(student) {
      return student.town;
    }
  }, {
    column: 'الدولة',
    type: String,
    value: function value(student) {
      return student.country;
    }
  }, {
    column: 'اضعف تقدير الترم /العام السابق',
    type: String,
    value: function value(student) {
      return student.prevTermweekestDegree;
    }
  }, {
    column: 'تقدير الترم /العام السابق',
    type: String,
    value: function value(student) {
      return student.prevTermDegree;
    }
  }, {
    column: 'مجموع الثانوية العامة',
    type: String,
    value: function value(student) {
      return student.collegeDegree;
    }
  }]
}, {
  modelType: officer,
  fileName: "officers",
  map: {
    'الاسم': 'name',
    'التقييم': 'rate'
  },
  schema: [{
    column: 'الاسم',
    type: String,
    value: function value(student) {
      return student.name;
    }
  }, {
    column: 'التقييم',
    type: String,
    value: function value(student) {
      return student.rate;
    }
  }]
}, {
  modelType: doctor,
  fileName: "doctors",
  map: {
    'الاسم': 'name',
    'التقييم': 'rate'
  },
  schema: [{
    column: 'الاسم',
    type: String,
    value: function value(student) {
      return student.name;
    }
  }, {
    column: 'التقييم',
    type: String,
    value: function value(student) {
      return student.rate;
    }
  }]
}, {
  modelType: TAssistants,
  fileName: "TAssistants",
  map: {
    'الاسم': 'name',
    'التقييم': 'rate'
  },
  schema: [{
    column: 'الاسم',
    type: String,
    value: function value(student) {
      return student.name;
    }
  }, {
    column: 'التقييم',
    type: String,
    value: function value(student) {
      return student.rate;
    }
  }]
}];

function seedDataBase() {
  return regeneratorRuntime.async(function seedDataBase$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          XlsxFollower.forEach(function _callee(table) {
            var entity;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(readXlsxFile(path.join(__dirname, "../ExcelData/".concat(table.fileName, ".xlsx")), {
                      map: table.map
                    }));

                  case 2:
                    entity = _context.sent;
                    _context.next = 5;
                    return regeneratorRuntime.awrap(entityFormatter(entity.rows, table.modelType));

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function entityFormatter(rows, modelType) {
  var i;
  return regeneratorRuntime.async(function entityFormatter$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(modelType.destroy({
            where: {}
          }));

        case 2:
          i = 0;

        case 3:
          if (!(i < rows.length)) {
            _context3.next = 9;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(modelType.create(rows[i]));

        case 6:
          i++;
          _context3.next = 3;
          break;

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function seedExcelSheets() {
  return regeneratorRuntime.async(function seedExcelSheets$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          XlsxFollower.forEach(function _callee2(table) {
            var tableData;
            return regeneratorRuntime.async(function _callee2$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.prev = 0;
                    _context4.next = 3;
                    return regeneratorRuntime.awrap(table.modelType.findAll({
                      raw: true
                    }));

                  case 3:
                    tableData = _context4.sent;
                    _context4.next = 6;
                    return regeneratorRuntime.awrap(writeXlsxFile(tableData, {
                      schema: table.schema,
                      filePath: path.join(__dirname, "../ExcelData/".concat(table.fileName, ".xlsx"))
                    }));

                  case 6:
                    console.log(table.fileName + ' has been Seeded to Excel Sheet');
                    _context4.next = 12;
                    break;

                  case 9:
                    _context4.prev = 9;
                    _context4.t0 = _context4["catch"](0);
                    console.log(table.fileName + ' Not Seeded ERROR');

                  case 12:
                  case "end":
                    return _context4.stop();
                }
              }
            }, null, null, [[0, 9]]);
          });

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

module.exports = {
  seedDataBase: seedDataBase,
  entityFormatter: entityFormatter,
  seedExcelSheets: seedExcelSheets
};