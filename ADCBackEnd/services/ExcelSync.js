const readXlsxFile = require('read-excel-file/node')
const writeXlsxFile = require('write-excel-file/node');
const models = require('../models');
const student = models.student
const officer = models.Officer
const doctor = models.Doctor
const TAssistants = models.TAssistants
const course = models.course
const path = require('path');
const XlsxFollower = [
    {
        modelType:student,fileName: "students", map: {
            'مسلسل':'id',
            'الاسم': 'name',
            'رقم العسكري': 'militaryId',
            'الفرقة':'group',
            'الفصيلة': 'section',
            'السرية': 'unit',
            'المحافظه':'town',
            'الدولة': 'country',
            'القسم': 'type',
            'البريد الإلكتروني':'email',
            'مجموع الثانوية العامة': 'collegeDegree',
            'تقدير الترم /العام السابق': 'prevTermDegree',
            'اضعف تقدير الترم /العام السابق': 'prevTermweekestDegree',
        }
    },
    {
        modelType:officer,fileName: "officers", map: {
            'مسلسل':'id',
            'الاسم': 'name',
            'التقييم':'rate',
        }
    },
    {
        modelType:doctor,fileName: "doctors", map: {
            'مسلسل':'id',
            'الاسم': 'name',
            'التقييم':'rate',
        }
    },
    {
        modelType:TAssistants,fileName: "TAssistants", map: {
            'مسلسل':'id',
            'الاسم': 'name',
            'التقييم':'rate',
        }
    },
    {
        modelType:course,fileName: "courses", map: {
            'مسلسل':'id',
            'اسم المادة': 'title',
            'كود المادة':'code',
            'القسم':'type',
            'سنة دراسية':'year',
        }
    }
]

async function seedDataBase() {
    XlsxFollower.forEach(async (table) =>{
        let entity = await readXlsxFile(path.join(__dirname, `../ExcelData/${table.fileName}.xlsx`), { map:table.map });
        await entityFormatter(entity.rows,table.modelType);

    })
}

async function entityFormatter(rows,modelType) {
    await modelType.destroy({ where: {} })
    for (let i = 0; i < rows.length; i++) {
        await modelType.create(rows[i])
    }
}
async function seedExcelSheets() {
    let students = await models.student.findAll({ raw: true });
    const schema = [
        {
            column: 'الاسم',
            type: String,
            value: student => student.name,
        },
        {
            column: 'رقم العسكري',
            type: String,
            value: student => student.militaryId,
        }
    ]
    await writeXlsxFile(students, {schema,filePath: path.join(__dirname, '../ExcelData/dummy.xlsx')
    })
}

module.exports={
    seedDataBase,
    entityFormatter,
    seedExcelSheets
}