"use strict";

var readXlsxFile = require('read-excel-file/node');

var writeXlsxFile = require('write-excel-file/node');

var models = require('../models');

var student = models.student;
var officer = models.Officer;
var doctor = models.Doctor;
var TAssistants = models.TAssistants;
var course = models.course;

var path = require('path');

var XlsxFollower = [{
  modelType: student,
  fileName: "students",
  map: {
    'مسلسل': 'id',
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
  }
}, {
  modelType: officer,
  fileName: "officers",
  map: {
    'مسلسل': 'id',
    'الاسم': 'name',
    'التقييم': 'rate'
  }
}, {
  modelType: doctor,
  fileName: "doctors",
  map: {
    'مسلسل': 'id',
    'الاسم': 'name',
    'التقييم': 'rate'
  }
}, {
  modelType: TAssistants,
  fileName: "TAssistants",
  map: {
    'مسلسل': 'id',
    'الاسم': 'name',
    'التقييم': 'rate'
  }
}, {
  modelType: course,
  fileName: "courses",
  map: {
    'مسلسل': 'id',
    'اسم المادة': 'title',
    'كود المادة': 'code',
    'القسم': 'type',
    'سنة دراسية': 'year'
  }
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
  var students, schema;
  return regeneratorRuntime.async(function seedExcelSheets$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(models.student.findAll({
            raw: true
          }));

        case 2:
          students = _context4.sent;
          schema = [{
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
          }];
          _context4.next = 6;
          return regeneratorRuntime.awrap(writeXlsxFile(students, {
            schema: schema,
            filePath: path.join(__dirname, '../ExcelData/dummy.xlsx')
          }));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  seedDataBase: seedDataBase,
  entityFormatter: entityFormatter,
  seedExcelSheets: seedExcelSheets
};