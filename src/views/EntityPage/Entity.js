import axios from "axios";
import { API } from "../../const";
async function PostEntity(data,api){
    let res =  await axios.post(API+api,{data});
    if(res.status == 200){
        window.location.reload();
    }
}
let entities = new Map();


entities.set('students',{
    text:"طالب",
    api:"student/",
    tableHead:["الاسم","الرقم العسكري","القسم","سنه"],
    tableBody:["name","militaryId","type","year"],
    settingsCol:false,
    clickableRow:true,
    FormData:{
        rows:[
            [{
                name: "militaryId",
                label: "الرقم العسكري",
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
                name: "name",
                label: "اسم الطالب",
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
                name: "group",
                label: "الفرقة",
                type: "text",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
            {
                name: "section",
                label: "الفصيلة",
                type: "text",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
            {
                name: "unit",
                label: "السرية",
                type: "text",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },{
                name: "town",
                label: "المحافظة",
                type: "text",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
            {
                name: "country",
                label: "الدولة",
                type: "text",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
            {
                name: "type",
                label: "القسم",
                type: "select",
                value: "",
                size: "small",
                rows: [
                    { value: "اتصالات", label: "اتصالات" },
                    { value: "ميكاترونكس", label: "ميكاترونكس" },
                    { value: "حواسب", label: "حواسب" },
                ],
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },{
                name: "year",
                label: "سنه دراسية",
                type: "select",
                value: "",
                size: "small",
                rows: [
                    { value: "اولى", label: "اولى" },
                    { value: "تانيه", label: "تانيه" },
                    { value: "تالته", label: "تالته" },
                    { value: "رابعه", label: "رابعه" },
                    { value: "تكميلية", label: "تكميلية" },
                ],
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
            {
                name: "email",
                label: "البريد الإلكتروني",
                type: "text",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
            {
                name: "collegeDegree",
                label: "مجموع الثانوية العامة",
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
                name: "prevTermDegree",
                label: "تقدير الترم /العام السابق",
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
                name: "prevTermweekestDegree",
                label: "اضعف تقدير الترم /العام السابق",
                type: "number",
                value: "",
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
        submitHandler:(data)=>PostEntity(data,"student/")
    }
})
entities.set('courses',{
    addText:"إضافة مادة",
    text:"مادة",
    api:"course/",
    tableHead:["الكود","الاسم","سنة","القسم","دكتور","ضابط","معيد"],
    tableBody:["code","title","type","year","Doctor.label","Officer.label","TAssistant.label"],
    settingsCol:true,
    clickableRow:false,
    FormData:{
        rows:[
            [{
                name: "title",
                label: "الأسم",
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
                name: "code",
                label:"كود المادة",
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
                name: "type",
                label: "القسم",
                type: "select",
                value: "",
                size: "small",
                rows: [
                    { value: "اتصالات", label: "اتصالات" },
                    { value: "ميكاترونكس", label: "ميكاترونكس" },
                    { value: "حواسب", label: "حواسب" },
                    { value: "عام", label: "عام" },
                ],
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
            {
                name: "year",
                label: "سنه دراسية",
                type: "select",
                value: "",
                size: "small",
                rows: [
                    { value: "اولى", label: "اولى" },
                    { value: "تانيه", label: "تانيه" },
                    { value: "تالته", label: "تالته" },
                    { value: "رابعه", label: "رابعه" },
                    { value: "تكميلية", label: "تكميلية" },
                ],
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:6,
            },
            ]
        ],
        noSubmit:false,
        grid:{ xs: 12, md: 12 },
        dir:"rtl",
        submitButtonText:"إضافة",
        submitButtonFullWidth:true,
        submitHandler:(data)=>PostEntity(data,"course/")
    }
    
})

entities.set('doctors',{
    addText:"إضافة دكتور",
    text:"دكتور",
    api:"doctor/",
    settingsCol:false,
    tableHead:["الاسم"],
    clickableRow:false,
    tableBody:["name"],
    FormData:{
        rows:[
            [{
                name: "name",
                label: "الأسم",
                type: "text",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:12,
            },
            ]
        ],
        noSubmit:false,
        grid:{ xs: 12, md: 12 },
        dir:"rtl",
        submitButtonText:"إضافة",
        submitButtonFullWidth:true,
        submitHandler:(data)=>PostEntity(data,"doctor/")
    }
})
entities.set('officers',{
    addText:"إضافة ضابط مشرف",
    text:"ضابط",
    api:"officer/",
    settingsCol:false,
    clickableRow:false,

    tableHead:["الاسم"],
    tableBody:["name"],
    FormData:{
        rows:[
            [{
                name: "name",
                label: "الأسم",
                type: "text",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:12,
            },
            ]
        ],
        noSubmit:false,
        grid:{ xs: 12, md: 12 },
        dir:"rtl",
        submitButtonText:"إضافة",
        submitButtonFullWidth:true,
        submitHandler:(data)=>PostEntity(data,"officer/")
    }
})
entities.set('tassistants',{
    addText:"إضافة معيد",
    text:"معيد",
    api:"tassistant/",
    tableBody:["name"],
    tableHead:["الاسم"],
    settingsCol:false,
    clickableRow:false,

    FormData:{
        rows:[
            [{
                name: "name",
                label: "الأسم",
                type: "text",
                value: "",
                size: "small",
                helperText: "لا يترك فارغا",
                placeHolder:"",
                variant: "outlined",
                xs:12,
                md:12,
            },
            ]
        ],
        noSubmit:false,
        grid:{ xs: 12, md: 12 },
        dir:"rtl",
        submitButtonText:"إضافة",
        submitButtonFullWidth:true,
        submitHandler:(data)=>PostEntity(data,"tassistant/")
    }
})

export default entities;
