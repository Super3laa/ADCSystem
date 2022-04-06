const readXlsxFile = require('read-excel-file/node')
const writeXlsxFile = require('write-excel-file/node');
const path = require('path');
const models = require('../models');
const student = models.student
const officer = models.Officer
const doctor = models.Doctor
const TAssistants = models.TAssistant
const course = models.course
const XlsxFollower = [
    {
        modelType:course,fileName: "courses", map: {
            'اسم المادة': 'title',
            'كود المادة':'code',
            'القسم':'type',
            'سنة دراسية':'year',
        },schema:[
            {
                column: 'اسم المادة',
                type: String,
                value: student => student.title,
            },
            {
                column: 'كود المادة',
                type: String,
                value: student => student.code,
            },{
                column: 'القسم',
                type: String,
                value: student => student.type,
            },{
                column: 'سنة دراسية',
                type: String,
                value: student => student.year,
            },
        ]
    },
    {
        modelType:student,fileName: "students", map: {
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
        },schema:[
            {
                column: 'الاسم',
                type: String,
                value: student => student.name,
            },
            {
                column: 'رقم العسكري',
                type: String,
                value: student => student.militaryId,
            },{
                column: 'البريدالإلكتروني',
                type: String,
                value: student => student.email,
            },{
                column: 'الفرقة',
                type: String,
                value: student => student.group,
            },{
                column: 'السرية',
                type: String,
                value: student => student.unit,
            },{
                column: 'الفصيلة',
                type: String,
                value: student => student.section,
            },
            {
                column: 'القسم',
                type: String,
                value: student => student.type,
            },{
                column: 'المحافظه',
                type: String,
                value: student => student.town,
            },{
                column: 'الدولة',
                type: String,
                value: student => student.country,
            },
            {
                column: 'اضعف تقدير الترم /العام السابق',
                type: String,
                value: student => student.prevTermweekestDegree,
            },
            {
                column: 'تقدير الترم /العام السابق',
                type: String,
                value: student => student.prevTermDegree,
            },
            {
                column: 'مجموع الثانوية العامة',
                type: String,
                value: student => student.collegeDegree,
            }
        ]
    },
    {
        modelType:officer,fileName: "officers", map: {
            'الاسم': 'name',
            'التقييم':'rate',
        },schema:[
            {
                column: 'الاسم',
                type: String,
                value: student => student.name,
            },
            {
                column: 'التقييم',
                type: String,
                value: student => student.rate,
            },
        ]
    },
    {
        modelType:doctor,fileName: "doctors", map: {
            'الاسم': 'name',
            'التقييم':'rate',
        },schema:[
            {
                column: 'الاسم',
                type: String,
                value: student => student.name,
            },
            {
                column: 'التقييم',
                type: String,
                value: student => student.rate,
            },
        ]
    },
    {
        modelType:TAssistants,fileName: "TAssistants", map: {
            'الاسم': 'name',
            'التقييم':'rate',
        },schema:[
            {
                column: 'الاسم',
                type: String,
                value: student => student.name,
            },
            {
                column: 'التقييم',
                type: String,
                value: student => student.rate,
            },
        ]
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
    XlsxFollower.forEach(async (table)=>{
        try {
            let tableData = await table.modelType.findAll({ raw: true });
            await writeXlsxFile(tableData, {schema:table.schema,filePath: path.join(__dirname, `../ExcelData/${table.fileName}.xlsx`)})
            console.log(table.fileName + ' has been Seeded to Excel Sheet')
        } catch (error) {
            console.log(table.fileName + ' Not Seeded ERROR')
        }
    })
    
}

module.exports={
    seedDataBase,
    entityFormatter,
    seedExcelSheets
}