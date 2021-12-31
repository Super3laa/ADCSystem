import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { API } from '../../const';
import { Typography, Link, Table, Button, TableBody, TableCell, TableRow, TableHead, IconButton, Divider } from '@material-ui/core';
import entities from '../EntityPage/Entity'
import { useDispatch } from 'react-redux';
import { updateForm } from '../../redux/actions/form';
import { MdDelete, MdEdit } from 'react-icons/md'
import { toast } from 'react-toastify';
import { AiFillPrinter } from 'react-icons/ai'
import { PieChart } from 'react-minimal-pie-chart';
import { Chart } from "react-google-charts";
import  formsData  from './DoctorFormData';


export default function Doctor(props) {
    const [doctorData, setDoctorData] = useState({})
    const [coursesArray,setCoursesArray] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch();
        async function fetch() {
            let res = await axios.get(API + `doctor/${props.match.params.id}`)
            console.log(res.data);
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
            setDoctorData(res.data);
        }
    }, [])
    function handlePrint() {
        var components = document.getElementsByClassName("ButtonRow")
        for (let i = 0; i < components.length; i++) {
            components[i].style.display = "none"
        }
        window.print();
        window.location.reload()
    }
    async function handleCreateAxios(data,type){
        data.doctorId = doctorData.doctor.id;
        let res = await axios.post(API+`doctor/${type}`,{data});
        if(res.status == 200){
            toast.success("تم الإضافة بنجاح")
            window.location.reload();
        }
    }
    async function getweeklyAttendance(weekno){
        let res = await axios.get(API+`doctor/attendance/${doctorData.doctor.id}/${weekno}`);
        console.log(res.data);
        if(res.status == 200){
            setDoctorData({...doctorData,attendance:res.data});
        }
    }
    async function handleEditAxios(data,type){
        let res = await axios.put(API+`doctor/${type}`,{data});
        if(res.status == 200){
            toast.success("تم التعديل بنجاح")
            window.location.reload();
        }
    }
    async function handleEdit(type,id,index){
            let formsDataEdit = formsData.get(type)
            switch (type){
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
                default:
                    break;
            }
            dispatch(updateForm({...formsDataEdit,
            state:true,
            submitHandler:(data)=>handleEditAxios(data,type),
            values:doctorData[type][index],
            submitButtonText:"تعديل"
        }))
    }
    async function handleDeleteAxios(type,id){
        let res = await axios.delete(API+`doctor/${type}/${id}`);
        if(res.status == 200){
            toast.warning("تم المسح بنجاح")
            window.location.reload();
        }
    }
    async function handleCreate(type){
        let formsDataEdit = formsData.get(type)
        switch (type){
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
    return (
        <Layout>
            {
                doctorData.doctor ?
                    <Container dir="rtl">
                        <br />
                        <Row >
                            <Col xs={"auto"}><Button variant="outlined" className="ButtonRow" color="primary" onClick={() => handlePrint()}> <AiFillPrinter /> طباعة نموذج تقيم اسبوعي عن الاستاذ</Button></Col>
                        </Row>
                        <br /><br />
                        <Row>
                            <Col xs={12}>
                                <Typography variant="h5"> بيانات الأستاذ</Typography></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col><Typography >الأسم : {`${doctorData.doctor.name}`}</Typography></Col>
                            <Col><Typography >تقييم من المشرف الأكاديمي : {`${doctorData.doctor.code}`}</Typography></Col>
                        </Row>
                        <br />
                       
                        <Row>
                            <Row className="ButtonRow">
                                <Col xs={12}><Button variant="contained" color="primary" onClick={() => handleCreate("attendance")} >إضافة حالة حضور للأستاذ</Button></Col>
                            </Row>
                            <br /> 
                             <Row className="ButtonRow">
                                {doctorData.doctorAttendance? doctorData.doctorAttendance.map(weekno => {
                                    return <Col xs={12}><Link variant="body2" component="button" color="primary" onClick={() => getweeklyAttendance(weekno.weekno)} >-  بيان الحضور الاسبوع {weekno.weekno}</Link></Col>
                                }):null}
                            </Row>
                        <br />

                            {
                                doctorData.attendance ?
                                    <React.Fragment className="rating">
                                        <br />
                                        <Row>
                                            <Col xs={12}><Typography variant="h5">بيان الحضور</Typography></Col>

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
                                                            doctorData.attendance.map((c, i) => {
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell>{c.type}</TableCell>
                                                                        <TableCell>
                                                                            {c.course && c.course.label}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {c.status}
                                                                        </TableCell>
                                                                        <TableCell className="ButtonRow">
                                                                            <IconButton onClick={() => handleDeleteAxios("attendance", c.id)}><MdDelete /></IconButton>
                                                                            <IconButton onClick={() => handleEdit("attendance", c.id, i)}><MdEdit /></IconButton>
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
                                    </React.Fragment> : null
                            }
                        </Row>
                        <br />
                        <Divider />
                        <br />
                        <Row>
                            <Col xs={12}>
                                <Typography variant="h5"> إحصائيات حضور الأستاذ للمواد</Typography>
                            </Col>
                        </Row>
                        <br/>
                        {
                            doctorData.courses.map((course,i)=>{
                                return <Row>
                                    <Col xs={12}><Typography >{course.title}</Typography></Col>
                                    <ChartMe data={ doctorData.coursesRating[i][0]} title={"المحاضرة"}/>
                                    <ChartMe data={doctorData.coursesRating[i][1]} title={"التمارين"}/>
                                    <ChartMe data={   doctorData.coursesRating[i][2]} title={"المعمل"}/>
                                </Row>
                            })
                        }
                        {/*<Row>
                        <ChartMe data={doctorData.doctortotalStatus} title={"المادة"}/>
                        <ChartMe data={doctorData.LecStatus} title={"المحاضرة"}/>
                        <ChartMe data={doctorData.SecStatus} title={"التمارين"}/>
                        <ChartMe data={doctorData.LabStatus} title={"المعمل"}/>
                    </Row>*/}
                    </Container> : <Typography>Loading ....</Typography>
            }
        </Layout>
    )

}

function ChartMe({ title, data }) {
    let AttendeNumber = 0;
    let didnotAttendNumber = 0;
    if (data.length > 0) {
        if (data[0].status == "حضر") {
            console.log(data[0].count)
            AttendeNumber = data[0].count
            if (data.length > 1) {
                didnotAttendNumber = data[1].count;
            } else {
                didnotAttendNumber = 0
            }
        } else {
            AttendeNumber = 0;
            didnotAttendNumber = data[0].count
        }
    }
    return (
        <Col xs={3}>
            <Container>
                <Row>
                    <Col xs={12}><Typography>الحضور الكلي {title}</Typography></Col>
                    <br/>
                    {AttendeNumber+ didnotAttendNumber == 0 ? <Typography>لا يوجد معلومات كافية</Typography> :
                    <React.Fragment>
                        <Col xs={6}>
                    <PieChart
                        data={[
                            { title: 'حضر', value: AttendeNumber, color: '#3498db' },
                            { title: 'لم يحضر', value: didnotAttendNumber, color: '#e74c3c' },
                        ]}
                    /></Col>
                    <Col xs={12}>نسبة الحضور {parseFloat(((AttendeNumber) / ((AttendeNumber) + (didnotAttendNumber))) * 100).toFixed(2)} %</Col>
                    </React.Fragment>}
                </Row>
                <br />
                <br />
            </Container>
        </Col>
    )
}