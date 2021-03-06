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
import  formsData  from './OfficerformsData';


export default function Officer(props) {
    let officerSkeleton = entities.get("officers");

    const [officerData, setOfficerData] = useState({})
    const [coursesArray,setCoursesArray] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch();
        async function fetch() {
            let res = await axios.get(API + `officer/${props.match.params.id}`)
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
            setOfficerData(res.data);
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
    async function handleEditOfficer(data){
        let res = await  axios.put(API+`officer/${officerData.officer.id}`,{data});
        if (res.status ==200){
         setOfficerData({...officerData , officer:res.data});
         toast.success("???? ?????????????? ??????????")
         window.location.reload()

        }
     }
     async function handleEditProfile(){
         dispatch(updateForm(
             {...officerSkeleton.FormData,
                 state:true,
                 values:officerData.officer,
                 submitButtonText:"??????????",
                 submitHandler:(data)=>handleEditOfficer(data)
             }))
     }
    async function handleCreateAxios(data,type){
        data.officerId = officerData.officer.id;
        let res = await axios.post(API+`officer/${type}`,{data});
        if(res.status == 200){
            toast.success("???? ?????????????? ??????????")
            window.location.reload();
        }
    }
    async function getweeklyAttendance(weekno){
        let res = await axios.get(API+`officer/attendance/${officerData.officer.id}/${weekno}`);
        console.log(res.data);
        if(res.status == 200){
            setOfficerData({...officerData,attendance:res.data});
        }
    }
    async function handleEditAxios(data,type){
        let res = await axios.put(API+`officer/${type}`,{data});
        if(res.status == 200){
            toast.success("???? ?????????????? ??????????")
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
                                label: "????????",
                                type: "select",
                                value: "",
                                size: "small",
                                defaultValue:coursesArray[0].value,
                                rows: coursesArray,
                                helperText: "???? ???????? ??????????",
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
            values:officerData[type][index],
            submitButtonText:"??????????"
        }))
    }
    async function handleDeleteAxios(type,id){
        let res = await axios.delete(API+`officer/${type}/${id}`);
        if(res.status == 200){
            toast.warning("???? ?????????? ??????????")
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
                            label: "????????",
                            type: "select",
                            value: "",
                            size: "small",
                            defaultValue:coursesArray[0].value,
                            rows: coursesArray,
                            helperText: "???? ???????? ??????????",
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
                officerData.officer ?
                    <Container dir="rtl">
                        <br />
                        <Row >
                            <Col xs={"auto"}><Button variant="outlined" className="ButtonRow" color="primary" onClick={() => handlePrint()}> <AiFillPrinter /> ?????????? ?????????? ???????? ???????????? ???? ????????????</Button></Col>
                        </Row>
                        <br /><br />
                        <Row>
                            <Col xs={12}>
                                <Typography variant="h5"> ???????????? ????????????</Typography></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col><Typography >?????????? : {`${officerData.officer.name}`}</Typography></Col>
                            <Col><Typography >?????????? ???? ???????????? ?????????????????? : {`${officerData.officer.rate}`}</Typography></Col>
                        </Row>
                        <br />
                        {<Row className="ButtonRow">
                    <Col xs={3}><Button variant="contained" color="primary" onClick={handleEditProfile} >?????????? ????????????</Button></Col>
            </Row>}
                        <br />
                       
                        <Row>
                            <Row className="ButtonRow">
                                <Col xs={12}><Button variant="contained" color="primary" onClick={() => handleCreate("attendance")} >?????????? ???????? ???????? ????????????</Button></Col>
                            </Row>
                            <br /> 
                             <Row className="ButtonRow">
                                {officerData.officerAttendance? officerData.officerAttendance.map(weekno => {
                                    return <Col xs={12}><Link variant="body2" component="button" color="primary" onClick={() => getweeklyAttendance(weekno.weekno)} >-  ???????? ???????????? ?????????????? {weekno.weekno}</Link></Col>
                                }):null}
                            </Row>
                        <br />

                            {
                                officerData.attendance ?
                                    <React.Fragment className="rating">
                                        <br />
                                        <Row>
                                            <Col xs={12}><Typography variant="h5">???????? ????????????</Typography></Col>

                                            <Col xs={12}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                ????????????
                                                            </TableCell>
                                                            <TableCell>
                                                                ?????? ????????????
                                                            </TableCell>
                                                            <TableCell>
                                                                ???????? ????????????
                                                            </TableCell>
                                                            <TableCell className="ButtonRow">
                                                                ??????????????
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            officerData.attendance.map((c, i) => {
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
                                <Typography variant="h5"> ???????????????? ???????? ???????????? ????????????</Typography>
                            </Col>
                        </Row>
                        <br/>
                        {
                            officerData.courses.map((course,i)=>{
                                return <Row>
                                    <Col xs={12}><Typography >{course.title}</Typography></Col>
                                    <ChartMe data={ officerData.coursesRating[i][0]} title={"????????????????"}/>
                                    <ChartMe data={officerData.coursesRating[i][1]} title={"????????????????"}/>
                                    <ChartMe data={   officerData.coursesRating[i][2]} title={"????????????"}/>
                                </Row>
                            })
                        }
                        {/*<Row>
                        <ChartMe data={officerData.officertotalStatus} title={"????????????"}/>
                        <ChartMe data={officerData.LecStatus} title={"????????????????"}/>
                        <ChartMe data={officerData.SecStatus} title={"????????????????"}/>
                        <ChartMe data={officerData.LabStatus} title={"????????????"}/>
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
        if (data[0].status == "??????") {
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
                    <Col xs={12}><Typography>???????????? ?????????? {title}</Typography></Col>
                    <br/>
                    {AttendeNumber+ didnotAttendNumber == 0 ? <Typography>???? ???????? ?????????????? ??????????</Typography> :
                    <React.Fragment>
                        <Col xs={6}>
                    <PieChart
                        data={[
                            { title: '??????', value: AttendeNumber, color: '#3498db' },
                            { title: '???? ????????', value: didnotAttendNumber, color: '#e74c3c' },
                        ]}
                    /></Col>
                    <Col xs={12}>???????? ???????????? {parseFloat(((AttendeNumber) / ((AttendeNumber) + (didnotAttendNumber))) * 100).toFixed(2)} %</Col>
                    </React.Fragment>}
                </Row>
                <br />
                <br />
            </Container>
        </Col>
    )
}