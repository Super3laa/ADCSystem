
let formsData = new Map();

formsData.set('punishment',{
    rows:[
        [{
            name: "title",
            label: "العقوبه",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        },
        {
            name: "reason",
            label: "السبب",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        },
        {
            label: "الأمر بالعقوبة",
            name: "order",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        }
        ]
    ],
    noSubmit:false,
    grid:{ xs: 12, md: 6 },
    dir:"rtl",
    submitButtonText:"إضافة",
    submitButtonFullWidth:true,
}
)

formsData.set('failedCourses',
{
    rows:[
        [{
            name: "code",
            label: "كود المادة",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        },
        {
            name: "title",
            label: "اسم المادة",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        }
        ]
    ],
    noSubmit:false,
    grid:{ xs: 12, md: 6 },
    dir:"rtl",
    submitButtonText:"إضافة",
    submitButtonFullWidth:true,
})

formsData.set('labsBenefits',
{
    rows:[
        [{
            name: "title",
            label: "اسم المعمل",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        },
        {
            name: "attendancePercentage",
            label: "نسبة الحضور",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        },
        {
            name: "numberOfExperiment",
            label: "عدد التجارب",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        },
        {
            name: "teacher",
            label: "استاذ المادة",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        },
        {
            name: "officerTeacher",
            label: "الضابط المدرس",
            type: "text",
            value: "",
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:12,
        }
        ]
    ],
    noSubmit:false,
    grid:{ xs: 12, md: 6 },
    dir:"rtl",
    submitButtonText:"إضافة",
    submitButtonFullWidth:true,
})


export default formsData;