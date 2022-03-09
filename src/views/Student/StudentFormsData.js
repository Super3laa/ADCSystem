
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
            type: "number",
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

formsData.set('rating',
{
    rows:[
        [
            {
                name: "weekno",
                label: "اسبوع رقم",
                type: "number",
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
formsData.set('attendance',
{
    rows:[
        [ {
            name: "type",
            label: "البيان",
            type: "select",
            value: "",
            rows: [
                { value: "محاضرة", label: "محاضرة" },
                { value: "تمرين", label: "تمرين" },
                { value: "معمل", label: "معمل" },
            ],
            size: "small",
            helperText: "لا يترك فارغا",
            placeHolder:"",
            variant: "outlined",
            xs:12,
            md:6,
        },
            {
                name: "weekno",
                label: "اسبوع رقم",
                type: "number",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
            {
                name: "status",
                label: "حالة الحضور",
                type: "select",
                value: "",
                rows: [
                    { value: "حضر", label: "حضر" },
                    { value: "لم يحضر", label: "لم يحضر" },
                ],
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
        ]
    ],
    noSubmit:false,
    grid:{ xs: 12, md: 6 },
    dir:"rtl",
    submitButtonText:"إضافة",
    submitButtonFullWidth:true,
})



formsData.set('specialization',
{
    rows:[
        [ {
            name: "specialization",
            label: "تخصص",
            type: "select",
            value: "",
            rows: [
                { value: "افنجر", label: "افنجر" },
                { value: "شيلكا", label: "شيلكا" },
                { value: "ردار", label: "ردار" },
                { value: "هوك", label: "هوك" },

            ],
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
    grid:{ xs: 12, md: 12 },
    dir:"rtl",
    submitButtonText:"إضافة",
    submitButtonFullWidth:true,
})


export default formsData;