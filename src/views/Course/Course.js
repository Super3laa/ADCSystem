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
import { PieChart } from 'react-minimal-pie-chart';
import { Chart } from "react-google-charts";


export default function Course (props){
    const [courseData,setCourseData] = useState({})
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch();
        async function fetch (){
            let res = await axios.get(API+`course/${props.match.params.id}`)
            console.log(res.data)
            let dummyArr =[];
            dummyArr.push(["Rating","Number of time the rating was given"])
            res.data.studentResponse.forEach(element => {
                dummyArr.push([element.rate,element.count])
            });
            setData(dummyArr);
            setCourseData(res.data);
        }
    },[])
    function handlePrint(){
        var components =  document.getElementsByClassName("ButtonRow")
        for (let i =0 ; i<components.length ; i++){
           components[i].style.display = "none"
        }
        window.print();
        window.location.reload()
    }
    return(
        <Layout>
            {
                courseData.course ? 
                <Container dir="rtl">
                    <br />
                    <Row >
                    <Col xs={"auto" }><Button variant="outlined" className="ButtonRow" color="primary" onClick={()=>handlePrint()}> <AiFillPrinter /> طباعة نموذج تقيم عن البرنامج</Button></Col>
                    </Row>
                    <br /><br />
                    <Row>
                        <Col xs={12 }>
                            <Typography variant="h5"> بيانات عامة</Typography></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col><Typography >الماده : {`${courseData.course.title}`}</Typography></Col>
                        <Col><Typography >كود المادة : {`${courseData.course.code}`}</Typography></Col>
                    </Row>
                    <Row>
                        <Col><Typography >القسم : {`${courseData.course.type}`}</Typography></Col>
                        <Col><Typography >سنه دراسيه : {`${courseData.course.year}`}</Typography></Col>
                    </Row>
                    <Row>
                        <Col><Typography >دكتور : {`${courseData.course.Doctor ? courseData.course.Doctor.label : "لايكن"}`}</Typography></Col>
                        <Col><Typography >ضابط : {`${courseData.course.Officer?courseData.course.Officer.label: "لايكن"}`}</Typography></Col>
                        <Col><Typography >معيد مجند : {`${courseData.course.TAssistant ? courseData.course.TAssistant.label: "لايكن"}`}</Typography></Col>
                    </Row>
                    <Row>
                        <Col><Typography >عدد الطلاب في الماده : {`${courseData.enrollmentNumber}`}</Typography></Col>
                    </Row>
                    <br />
                    <Divider/>
                    <br/>
                    <Row>
                        <Col xs={12 }>
                            <Typography variant="h5"> إحصائيات الحضور للمادة</Typography>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        {courseData.coursetotalStatus.length>0 &&<ChartMe data={courseData.coursetotalStatus} title={"المادة"}/>}
                        {courseData.LecStatus.length>0 &&<ChartMe data={courseData.LecStatus} title={"المحاضرة"}/>}
                        {courseData.SecStatus.length>0 && <ChartMe data={courseData.SecStatus} title={"التمارين"}/>}
                        {courseData.LabStatus.length>0 && <ChartMe data={courseData.LabStatus} title={"المعمل"}/>}
                    </Row>
                    <br />
                    <br />
                    <Row>
                    <Col xs={12 }>
                            <Typography variant="h5"> إستجابة الطلاب للبرنامج</Typography>
                        </Col>
                        <Col>
                         <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
                        </Col>
                    </Row>
                </Container> : <Typography>Loading ....</Typography>
            }
        </Layout>
    )

}

function ChartMe ({title,data}){
    let AttendeNumber = 0;
    let didnotAttendNumber = 0;
    if (data.length > 0){
        if(data[0].status == "حضر"){
            AttendeNumber = data[0].count
            if(data.length > 1){
                didnotAttendNumber = data[1].count;
            }else{
                didnotAttendNumber = 0
            }
        }else{
            AttendeNumber = 0;
            didnotAttendNumber = data[0].count
        }
    }
    
    return(
        <Col xs={3}>
        <Container>
            <Row>
                <Col xs={12}><Typography>الحضور الكلي {title}</Typography></Col>
                <Col xs={6}><PieChart
                legendToggle
                        data={[
                            { title:  'حضر', value: AttendeNumber, color: '#3498db' },
                            { title:  'لم يحضر', value: didnotAttendNumber, color: '#e74c3c' },
                        ]}
                        /></Col>
                <Col xs={12}>نسبة الحضور {parseFloat(((AttendeNumber)/ ((AttendeNumber)+(didnotAttendNumber)) )*100).toFixed(2)} %</Col>
            </Row>
        </Container>
    </Col>
    )
}