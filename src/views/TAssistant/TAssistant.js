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
import  formsData  from './TAssistantformsData';


export default function TAssistant(props) {
    const [tassistantData, setTAssistantData] = useState({})
    const [coursesArray,setCoursesArray] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch();
        async function fetch() {
            let res = await axios.get(API + `tassistant/${props.match.params.id}`)
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
            setTAssistantData(res.data);
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
        data.tassistantId = tassistantData.tassistant.id;
        let res = await axios.post(API+`tassistant/${type}`,{data});
        if(res.status == 200){
            toast.success("تم الإضافة بنجاح")
            window.location.reload();
        }
    }
    async function getweeklyAttendance(weekno){
        let res = await axios.get(API+`tassistant/attendance/${tassistantData.tassistant.id}/${weekno}`);
        console.log(res.data);
        if(res.status == 200){
            setTAssistantData({...tassistantData,attendance:res.data});
        }
    }
    async function handleEditAxios(data,type){
        let res = await axios.put(API+`tassistant/${type}`,{data});
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
            values:tassistantData[type][index],
            submitButtonText:"تعديل"
        }))
    }
    async function handleDeleteAxios(type,id){
        let res = await axios.delete(API+`tassistant/${type}/${id}`);
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
                tassistantData.tassistant ?
                    <Container dir="rtl">
                        <br />
                        <Row >
                            <Col xs={"auto"}><Button variant="outlined" className="ButtonRow" color="primary" onClick={() => handlePrint()}> <AiFillPrinter /> طباعة نموذج تقيم اسبوعي عن المعيد</Button></Col>
                        </Row>
                        <br /><br />
                        <Row>
                            <Col xs={12}>
                                <Typography variant="h5"> بيانات المعيد</Typography></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col><Typography >الأسم : {`${tassistantData.tassistant.name}`}</Typography></Col>
                            <Col><Typography >تقييم من المشرف الأكاديمي : {`${tassistantData.tassistant.code}`}</Typography></Col>
                        </Row>
                        <br />
                       
                        <Row>
                            <Row className="ButtonRow">
                                <Col xs={12}><Button variant="contained" color="primary" onClick={() => handleCreate("attendance")} >إضافة حالة حضور للمعيد</Button></Col>
                            </Row>
                            <br /> 
                             <Row className="ButtonRow">
                                {tassistantData.tassistantAttendance? tassistantData.tassistantAttendance.map(weekno => {
                                    return <Col xs={12}><Link variant="body2" component="button" color="primary" onClick={() => getweeklyAttendance(weekno.weekno)} >-  بيان الحضور الاسبوع {weekno.weekno}</Link></Col>
                                }):null}
                            </Row>
                        <br />

                            {
                                tassistantData.attendance ?
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
                                                            tassistantData.attendance.map((c, i) => {
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
                                <Typography variant="h5"> إحصائيات حضور المعيد للمواد</Typography>
                            </Col>
                        </Row>
                        <br/>
                        {
                            tassistantData.courses.map((course,i)=>{
                                return <Row>
                                    <Col xs={12}><Typography >{course.title}</Typography></Col>
                                    <ChartMe data={ tassistantData.coursesRating[i][0]} title={"المحاضرة"}/>
                                    <ChartMe data={tassistantData.coursesRating[i][1]} title={"التمارين"}/>
                                    <ChartMe data={   tassistantData.coursesRating[i][2]} title={"المعمل"}/>
                                </Row>
                            })
                        }
                        {/*<Row>
                        <ChartMe data={tassistantData.tassistanttotalStatus} title={"المادة"}/>
                        <ChartMe data={tassistantData.LecStatus} title={"المحاضرة"}/>
                        <ChartMe data={tassistantData.SecStatus} title={"التمارين"}/>
                        <ChartMe data={tassistantData.LabStatus} title={"المعمل"}/>
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