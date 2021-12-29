import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { API } from '../../const';
import { Typography,Link,Table,Button, TableBody, TableCell, TableRow, TableHead, IconButton, Divider } from '@material-ui/core';
import entities from '../EntityPage/Entity'
import { useDispatch } from 'react-redux';
import { updateForm } from '../../redux/actions/form';
import {MdDelete,MdEdit} from 'react-icons/md'
import  {toast}  from 'react-toastify';
import {AiFillPrinter} from 'react-icons/ai'
import  formsData  from './StudentFormsData';
export default function Student (props){
    const [studentData, seStudentData] = useState(null);
    let studentSkeleton = entities.get("students");
    const [coursesArray,setCoursesArray] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        fetch();
        async function fetch (){
            let res = await axios.get(API+`student/${props.match.params.id}`)
            console.log(res.data)
            seStudentData(res.data);
            let dummyArray =[]
            res.data.courses.forEach(course=>{
                dummyArray.push(
                    {
                        value:course.id,
                        label:course.title
                    }
                )
            })
            setCoursesArray(dummyArray)
        }
    },[]);
    async function handleEditStudent(data){
        console.log(data)
       let res = await  axios.put(API+`student/${studentData.id}`,{data});
       if (res.status ==200){
        seStudentData({...studentData , student:res.data});
        toast.success("تم التعديل بنجاح")
       }
    }
    async function handleEditProfile(){
        dispatch(updateForm(
            {...studentSkeleton.FormData,
                state:true,
                values:studentData.student,
                submitButtonText:"تعديل",
                submitHandler:(data)=>handleEditStudent(data)
            }))
    }
    async function handleCreateAxios(data,type){
        data.studentId = studentData.student.id;
        let res = await axios.post(API+`student/${type}`,{data});
        if(res.status == 200){
            toast.success("تم الإضافة بنجاح")
            window.location.reload();
        }
    }
    async function handleCreate(type){
        let formsDataEdit = formsData.get(type)
        switch (type){
            case "labsBenefits" :
            studentData.doctors .push({label:"لايكن", value : null})
            studentData.officers.push({label:"لايكن", value : null})
            studentData.tassistants.push({label:"لايكن", value : null})

            formsDataEdit.rows[0].length < 6 && formsDataEdit.rows[0].push(
                {
                    name: "doctorId",
                    label: "دكتور",
                    type: "select",
                    value: "",
                    size: "small",
                    rows: studentData.doctors,
                    helperText: "لا يترك فارغا",
                    placeHolder:"",
                    variant: "outlined",
                    xs:12,
                    md:12,
                },{
                    name: "OfficerId",
                    label: "ظابط مشرف",
                    type: "select",
                    value: "",
                    size: "small",
                    rows: studentData.officers,
                    helperText: "لا يترك فارغا",
                    placeHolder:"",
                    variant: "outlined",
                    xs:12,
                    md:12,
                },{
                    name: "TAssistantId",
                    label: "معيد",
                    type: "select",
                    value: "",
                    size: "small",
                    rows: studentData.tassistants,
                    helperText: "لا يترك فارغا",
                    placeHolder:"",
                    variant: "outlined",
                    xs:12,
                    md:12,
                }

            )
            break;
            case "rating":
                    
                formsDataEdit.rows[0].length < 2 && formsDataEdit.rows[0].push(
                        {
                            name: "courseId",
                            label: "مادة",
                            type: "select",
                            value: "",
                            size: "small",
                            defaultValue:coursesArray[0].value,
                            rows: coursesArray,
                            helperText: "لا يترك فارغا",
                            placeHolder:"",
                            variant: "outlined",
                            xs:12,
                            md:6,
                        },{
                            name: "rate",
                            label: "التقيم",
                            type: "select",
                            value: "",
                            defaultValue:"95>%",
                            size: "small",
                            rows: [
                                { value: "95>%", label: "95>%" },
                                { value: "90-95%", label: "90-95%" },
                                { value: "85-90%", label: "85-90%" },
                                { value: "70-85%", label: "70-85%" },
                                { value: "50-75%", label: "50-75%" },
                                { value: "<50%", label: "<50%" },
                            ],
                            helperText: "لا يترك فارغا",
                            placeHolder:"",
                            variant: "outlined",
                            xs:12,
                            md:6,
                        }
                    )
                    break;
            case 'attendance':
            formsDataEdit.rows[0].length < 4 && formsDataEdit.rows[0].push(
                        {
                            name: "courseId",
                            label: "مادة",
                            type: "select",
                            value: "",
                            size: "small",
                            defaultValue:coursesArray[0].value,
                            rows: coursesArray,
                            helperText: "لا يترك فارغا",
                            placeHolder:"",
                            variant: "outlined",
                            xs:12,
                            md:6,
                        }
            )
            break;
        }
        dispatch(updateForm({...formsDataEdit,state:true,submitHandler:(data)=>handleCreateAxios(data,type)}))
    }
    async function handleEditAxios(data,type){
        let res = await axios.put(API+`student/${type}`,{data});
        if(res.status == 200){
            toast.success("تم التعديل بنجاح")
            window.location.reload();
        }
    }
    async function handleEdit(type,id,index){
            let formsDataEdit = formsData.get(type)
            switch (type){
                case "labsBenefits" :
                studentData.doctors .push({label:"لايكن", value : null})
                studentData.officers.push({label:"لايكن", value : null})
                studentData.tassistants.push({label:"لايكن", value : null})
    
                formsDataEdit.rows[0].length < 6 && formsDataEdit.rows[0].push(
                    {
                        name: "doctorId",
                        label: "دكتور",
                        type: "select",
                        value: "",
                        size: "small",
                        rows: studentData.doctors,
                        helperText: "لا يترك فارغا",
                        placeHolder:"",
                        variant: "outlined",
                        xs:12,
                        md:12,
                    },{
                        name: "OfficerId",
                        label: "ظابط مشرف",
                        type: "select",
                        value: "",
                        size: "small",
                        rows: studentData.officers,
                        helperText: "لا يترك فارغا",
                        placeHolder:"",
                        variant: "outlined",
                        xs:12,
                        md:12,
                    },{
                        name: "TAssistantId",
                        label: "معيد",
                        type: "select",
                        value: "",
                        size: "small",
                        rows: studentData.tassistants,
                        helperText: "لا يترك فارغا",
                        placeHolder:"",
                        variant: "outlined",
                        xs:12,
                        md:12,
                    }
    
                )
                break;
                case "rating":
                        
                    formsDataEdit.rows[0].length < 2 && formsDataEdit.rows[0].push(
                            {
                                name: "courseId",
                                label: "مادة",
                                type: "select",
                                value: "",
                                size: "small",
                                defaultValue:coursesArray[0].value,
                                rows: coursesArray,
                                helperText: "لا يترك فارغا",
                                placeHolder:"",
                                variant: "outlined",
                                xs:12,
                                md:6,
                            },{
                                name: "rate",
                                label: "التقيم",
                                type: "select",
                                value: "",
                                defaultValue:">95%",
                                size: "small",
                                rows: [
                                    { value: ">95%", label: ">95%" },
                                    { value: "90-95%", label: "90-95%" },
                                    { value: "85-90%", label: "85-90%" },
                                    { value: "70-85%", label: "70-85%" },
                                    { value: "50-75%", label: "50-75%" },
                                    { value: "<50%", label: "<50%" },
                                ],
                                helperText: "لا يترك فارغا",
                                placeHolder:"",
                                variant: "outlined",
                                xs:12,
                                md:6,
                            }
                        )
                    console.log('blah 1')
                    break;
                case 'attendance':
                    formsDataEdit.rows[0].length < 4 && formsDataEdit.rows[0].push(
                            {
                                name: "courseId",
                                label: "مادة",
                                type: "select",
                                value: "",
                                size: "small",
                                defaultValue:coursesArray[0].value,
                                rows: coursesArray,
                                helperText: "لا يترك فارغا",
                                placeHolder:"",
                                variant: "outlined",
                                xs:12,
                                md:6,
                            }
                )
                console.log('blah 1')

                    break;
                default:
                    break;
            }
            dispatch(updateForm({...formsDataEdit,
            state:true,
            submitHandler:(data)=>handleEditAxios(data,type),
            values:studentData[type][index],
            submitButtonText:"تعديل"
        }))
    }
    async function handleDeleteAxios(type,id){
        let res = await axios.delete(API+`student/${type}/${id}`);
        if(res.status == 200){
            toast.warning("تم المسح بنجاح")
            window.location.reload();
        }
    }
    async function getweeklyRating(weekno){
        let res = await axios.get(API+`student/rating/${studentData.student.id}/${weekno}`);
        console.log(res.data);
        if(res.status == 200){
            seStudentData({...studentData,rating:res.data});
        }
    }
    async function getweeklyAttendance(weekno){
        let res = await axios.get(API+`student/attendance/${studentData.student.id}/${weekno}`);
        console.log(res.data);
        if(res.status == 200){
            seStudentData({...studentData,attendance:res.data});
        }
    }
    function handlePrint (type){
        switch (type){
            case "general":
                var components =  document.getElementsByClassName("rating")
                for (let i =0 ; i<components.length ; i++){
                components[i].style.display = "none"
                }
                break;
            case "weekly":
                 var componentssubjects =  document.getElementsByClassName("subjects")
                for (let i =0 ; i<componentssubjects.length ; i++){
                componentssubjects[i].style.display = "none"
                }
                break;
            default:
                break;

        }
        var components =  document.getElementsByClassName("ButtonRow")
        for (let i =0 ; i<components.length ; i++){
           components[i].style.display = "none"
        }
        window.print();
        window.location.reload()
    }
    return (
        <Layout >
            {
                studentData ? 
                <Container  dir="rtl" id ="studentData">
                <br />
                <Row >
                <Col xs={"auto" }><Button variant="outlined" className="ButtonRow" color="primary" onClick={()=>handlePrint("weekly")} > <AiFillPrinter /> طباعة نموذج تقيم إسبوعي</Button></Col>
                <Col xs={"auto" }><Button variant="outlined" className="ButtonRow" color="primary" onClick={()=>handlePrint("general")} > <AiFillPrinter /> طباعة نموذج أكاديمي عن الطالب</Button></Col>                    </Row>
                <br /><br />
                <Row>
                    <Col xs={12 }>
                        <Typography variant="h5"> بيانات الطالب</Typography></Col>
                </Row>
                <br />
                <Row>
                    <Col><Typography >الرقم العسكري : {`${studentData.student.militaryId}`}</Typography></Col>
                    <Col><Typography >اسم الطالب : {`${studentData.student.name}`}</Typography></Col>
                </Row>
                <Row>
                    <Col  xs={4} ><Typography >الفرقة : {`${studentData.student.group}`}</Typography></Col>
                    <Col  xs={4} ><Typography >الفصيلة : {`${studentData.student.section}`}</Typography></Col>
                    <Col  xs={4} ><Typography >السرية : {`${studentData.student.unit}`}</Typography></Col>
                    <Col  xs={4} ><Typography >المحافظه : {`${studentData.student.town}`}</Typography></Col>
                    <Col  xs={4} ><Typography >الدولة : {`${studentData.student.country}`}</Typography></Col>
                    <Col  xs={4} ><Typography >القسم : {`${studentData.student.type}`}</Typography></Col>
                    <Col  xs={4} ><Typography >البريد الإلكتروني : {`${studentData.student.email}`}</Typography></Col>
                    <Col  xs={4} ><Typography >مجموع الثانوية العامة : {`${studentData.student.collegeDegree}`}</Typography></Col>
                    <Col  xs={4} ><Typography >تقدير الترم /العام السابق : {`${studentData.student.prevTermDegree}`}</Typography></Col>
                    <Col  xs={4} ><Typography >اضعف تقدير الترم /العام السابق : {`${studentData.student.prevTermweekestDegree}`}</Typography></Col>
                </Row>
                <br/>
                {/*<Row className="ButtonRow">
                    <Col xs={3}><Button variant="contained" color="primary" onClick={handleEditProfile} >تعديل بيانات</Button></Col>
            </Row>*/}
            <br />
            <Row className="ButtonRow">
                    <Col xs={12}><Button variant="contained" color="primary" onClick={()=>handleCreate("rating")} >إضافة تقيم إسبوعي للطالب</Button></Col>
                    
            </Row>
            <br />
            <Row className="ButtonRow">
                 {studentData.studentRating.map(weekno=>{
                        return<Col xs={12}><Link variant="body2" component="button" color="primary" onClick={()=>getweeklyRating(weekno.weekno)} >- تقييم الاسبوع {weekno.weekno}</Link></Col>
                    })}
            </Row>
                    {
                        studentData.rating ?
                        <React.Fragment className="rating">
                          <br />
                        <Row>
                         <Col xs={12 }><Typography variant="h5">التقييم الاسبوعي</Typography></Col>

                            <Col xs={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                           كود
                                        </TableCell>
                                        <TableCell>
                                           اسم الماده
                                        </TableCell>
                                        <TableCell>
                                           تقيم 
                                        </TableCell>
                                        <TableCell className="ButtonRow">
                                   اعدادات 
                                </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        studentData.rating.map((c,i)=>{
                                            return(
                                    <TableRow>
                                        <TableCell>{c.course && c.course.code}</TableCell>
                                        <TableCell>
                                         {c.course && c.course.label}
                                        </TableCell>
                                        <TableCell>
                                            {c.rate}
                                        </TableCell>
                                        <TableCell className="ButtonRow">
                                    <IconButton onClick={()=>handleDeleteAxios("rating",c.id)}><MdDelete /></IconButton>
                                    <IconButton onClick={()=>handleEdit("rating",c.id,i)}><MdEdit/></IconButton>
                                </TableCell>
                                    </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                                </Table>
                                </Col>
                                </Row>
        
                        <br />
                        <Divider />
                        </React.Fragment>:null
                    }
    <br />
 <Row className="ButtonRow">
                    <Col xs={12}><Button variant="contained" color="primary" onClick={()=>handleCreate("attendance")} >إضافة حالة حضور للطالب</Button></Col>
                    
            </Row>
            <br />            <Row className="ButtonRow">
                 {studentData.studentAttendance.map(weekno=>{
                        return<Col xs={12}><Link variant="body2" component="button" color="primary" onClick={()=>getweeklyAttendance(weekno.weekno)} >-  بيان الحضور الاسبوع {weekno.weekno}</Link></Col>
                    })}
            </Row>
                    {
                        studentData.attendance ?
                        <React.Fragment className="rating">
                          <br />
                        <Row>
                         <Col xs={12 }><Typography variant="h5">بيان الحضور</Typography></Col>

                            <Col xs={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                           البيان
                                        </TableCell>
                                        <TableCell>
                                           اسم الماده
                                        </TableCell>
                                        <TableCell>
                                           حالة الحضور 
                                        </TableCell>
                                        <TableCell className="ButtonRow">
                                   اعدادات 
                                </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        studentData.attendance.map((c,i)=>{
                                            return(
                                    <TableRow>
                                        <TableCell>{c.type}</TableCell>
                                        <TableCell>
                                         {c.course && c.course.label}
                                        </TableCell>
                                        <TableCell>
                                            {c.status}
                                        </TableCell>
                                        <TableCell className="ButtonRow">
                                    <IconButton onClick={()=>handleDeleteAxios("attendance",c.id)}><MdDelete /></IconButton>
                                    <IconButton onClick={()=>handleEdit("attendance",c.id,i)}><MdEdit/></IconButton>
                                </TableCell>
                                    </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                                </Table>
                                </Col>
                                </Row>
        
                        <br />
                        <Divider />
                        </React.Fragment>:null
                    }





                <br />
                <Divider />
                <br />
                <Row className="subjects">
                    <Col xs={12 }><Typography variant="h5"> مواد الطالب</Typography></Col>
                </Row>
                <br />
                <Row className="subjects">
                    <Col xs={12} className="subjects">
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell>
                                   كود
                                </TableCell>
                                <TableCell>
                                   اسم الماده
                                </TableCell>
                                <TableCell>
                                   دكتور 
                                </TableCell>
                                <TableCell>
                                    ضابط المشرف
                                </TableCell>
                                <TableCell>
                                   معيد 
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                studentData.courses.map((c,i)=>{
                                    return(
                            <TableRow>
                                <TableCell>{c.code}</TableCell>
                                <TableCell>
                                    {c.title}
                                </TableCell>
                                <TableCell>
                                    {c.Doctor && c.Doctor.label}
                                </TableCell>
                                <TableCell>
                                {c.Officer && c.Officer.label}
                                </TableCell>
                                <TableCell>
                                {c.TAssistant && c.TAssistant.label}
                               </TableCell>
                            </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                        </Table>
                        </Col>
                        </Row>

                <br />
                <Divider />
                <br />

                <br />
                <Row>
                  <Col xs={9}><Typography variant="h5">العقوبات التعليمية</Typography></Col>
                  <Col  className="ButtonRow" xs={3} style={{textAlign: "end"}}><Button variant="contained" color="primary" onClick={()=>handleCreate("punishment")} >إضاقة عقوبه</Button></Col>

                </Row>
                <br />
         
                <Row>
                    <Col xs={12}>
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell>
                                   م 
                                </TableCell>
                                <TableCell>
                                   العقوبة
                                </TableCell>
                                <TableCell>
                                   السبب 
                                </TableCell>
                                <TableCell>
                                   الأمر بالعقوبة 
                                </TableCell>
                                <TableCell className="ButtonRow">
                                   اعدادات 
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                studentData.punishment.map((p,i)=>{
                                    return(
                            <TableRow>
                                <TableCell>{i+1}</TableCell>
                                <TableCell>
                                    {p.title}
                                </TableCell>
                                <TableCell>
                                    {p.reason}
                                </TableCell>
                                <TableCell>
                                    {p.order}
                                </TableCell>
                                <TableCell className="ButtonRow">
                                    <IconButton onClick={()=>handleDeleteAxios("punishment",p.id)}><MdDelete /></IconButton>
                                    <IconButton onClick={()=>handleEdit("punishment",p.id,i)}><MdEdit/></IconButton>
                                </TableCell>
                            </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                        </Table>

                    </Col>
                </Row>


                <br />
                <Divider />
                <br />
                <br />

                <Row  className="subjects">
                  <Col xs={9}><Typography variant="h5">المواد التي ادت لرسوبه الترم/العام السابق</Typography></Col>
                  <Col xs={3} className="ButtonRow" style={{textAlign: "end"}}><Button variant="contained" color="primary"  onClick={()=>handleCreate("failedCourses")}  >إضاقة مادة</Button></Col>

                </Row>
                <br />
              
                <Row  className="subjects">
                    <Col xs={ 12}>
                        <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                   كود المادة 
                                </TableCell>
                                <TableCell>
                                   اسم المادة
                                </TableCell>
                                <TableCell className="ButtonRow">
                                   اعدادات 
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                studentData.failedCourses.map((f,i)=>{
                                    return(
                                        <TableRow>
                                <TableCell>{f.code}</TableCell>
                                <TableCell>
                                    {f.title}
                                </TableCell>
                                <TableCell className="ButtonRow">
                                    <IconButton onClick={()=>handleDeleteAxios("failedCourses",f.id)}><MdDelete /></IconButton>
                                    <IconButton onClick={()=>handleEdit("failedCourses",f.id,i)}><MdEdit/></IconButton>
                                </TableCell>
                            </TableRow>
                                    )
                                })
                            }
                            
                        </TableBody>
                        </Table>
                    </Col>
                </Row>




                <br />
                <Divider />
                <br />
                <br />

                <Row>
                  <Col xs={9}><Typography variant="h5">موقف الاستفادة من المعامل</Typography></Col>
                  <Col className="ButtonRow" xs={3} style={{textAlign: "end"}}><Button variant="contained" color="primary"  onClick={()=>handleCreate("labsBenefits")}>إضاقة موقف</Button></Col>

                </Row>
                <br />
               
                <Row>
                    <Col xs={12}>
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell>
                                   اسم المعمل
                                </TableCell>
                                <TableCell>
                                   نسبة الحضور
                                </TableCell>
                                <TableCell>
                                    عدد التجارب 
                                </TableCell>
                                <TableCell>
                                استاذ المادة                                 
                                </TableCell>
                                <TableCell>
                                   الضابط المدرس 
                                </TableCell>
                                <TableCell>
                                   المعيد
                                </TableCell>
                                <TableCell className="ButtonRow">
                                   اعدادات 
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentData.labsBenefits.map((l,i)=>{
                                return(
                                    <TableRow>
                                <TableCell>{l.title}</TableCell>
                                <TableCell>
                                    {l.attendancePercentage}
                                </TableCell>
                                <TableCell>
                                    {l.numberOfExperiment}
                                </TableCell>
                                <TableCell>{l.Doctor ? l.Doctor.label : "لا يكن"}</TableCell>
                                <TableCell>{l.Officer ? l.Officer.label : "لا يكن"}</TableCell>
                                <TableCell>{l.TAssistant ? l.TAssistant.label : "لا يكن"}</TableCell>
                                <TableCell className="ButtonRow">
                                    <IconButton onClick={()=>handleDeleteAxios("labsBenefits",l.id)}><MdDelete /></IconButton>
                                    <IconButton onClick={()=>handleEdit("labsBenefits",l.id,i)}><MdEdit/></IconButton>
                                </TableCell>
                            </TableRow>
                                )
                            })}
                        </TableBody>
                        </Table>

                    </Col>
                </Row>
                </Container>:<Typography>Loading...</Typography>
            }
           
        </Layout>
    )
}