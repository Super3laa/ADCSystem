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
import formsData from './DoctorFormData';


export default function Doctor(props) {
    let doctorSkeleton = entities.get("doctors");
    const [doctorData, setDoctorData] = useState({})
    const [coursesArray, setCoursesArray] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch();
        async function fetch() {
            let res = await axios.get(API + `doctor/${props.match.params.id}`)
            console.log(res.data);
            let dummyArray = []
            res.data.courses.forEach(course => {
                dummyArray.push(
                    {
                        value: course.id,
                        label: course.title
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
    async function handleCreateAxios(data, type) {
        data.doctorId = doctorData.doctor.id;
        let res = await axios.post(API + `doctor/${type}`, { data });
        if (res.status == 200) {
            toast.success("???? ?????????????? ??????????")
            window.location.reload();
        }
    }
    async function getweeklyAttendance(weekno) {
        let res = await axios.get(API + `doctor/attendance/${doctorData.doctor.id}/${weekno}`);
        console.log(res.data);
        if (res.status == 200) {
            setDoctorData({ ...doctorData, attendance: res.data });
        }
    }
    async function handleEditAxios(data, type) {
        let res = await axios.put(API + `doctor/${type}`, { data });
        if (res.status == 200) {
            toast.success("???? ?????????????? ??????????")
            window.location.reload();
        }
    }
    async function handleEdit(type, id, index) {
        let formsDataEdit = formsData.get(type)
        switch (type) {
            case 'attendance':
                formsDataEdit.rows[0].length < 5 && formsDataEdit.rows[0].push(
                    {
                        name: "courseId",
                        label: "????????",
                        type: "select",
                        value: "",
                        size: "small",
                        defaultValue: coursesArray[0].value,
                        rows: coursesArray,
                        helperText: "???? ???????? ??????????",
                        placeHolder: "",
                        variant: "outlined",
                        xs: 12,
                        md: 6,
                    }
                )
                break;
            default:
                break;
        }
        dispatch(updateForm({
            ...formsDataEdit,
            state: true,
            submitHandler: (data) => handleEditAxios(data, type),
            values: doctorData[type][index],
            submitButtonText: "??????????"
        }))
    }
    async function handleDeleteAxios(type, id) {
        let res = await axios.delete(API + `doctor/${type}/${id}`);
        if (res.status == 200) {
            toast.warning("???? ?????????? ??????????")
            window.location.reload();
        }
    }
    async function handleCreate(type) {
        let formsDataEdit = formsData.get(type)
        switch (type) {
            case 'attendance':
                formsDataEdit.rows[0].length < 5 && formsDataEdit.rows[0].push(
                    {
                        name: "courseId",
                        label: "????????",
                        type: "select",
                        value: "",
                        size: "small",
                        defaultValue: coursesArray[0].value,
                        rows: coursesArray,
                        helperText: "???? ???????? ??????????",
                        placeHolder: "",
                        variant: "outlined",
                        xs: 12,
                        md: 12,
                    }
                )
                break;
        }
        dispatch(updateForm({ ...formsDataEdit, state: true, submitHandler: (data) => handleCreateAxios(data, type) }))
    }
    async function handleEditDoctor(data) {
        let res = await axios.put(API + `doctor/${doctorData.doctor.id}`, { data });
        if (res.status == 200) {
            setDoctorData({ ...doctorData, doctor: res.data });
            toast.success("???? ?????????????? ??????????")
            window.location.reload()

        }
    }
    async function handleEditProfile() {
        dispatch(updateForm(
            {
                ...doctorSkeleton.FormData,
                state: true,
                values: doctorData.doctor,
                submitButtonText: "??????????",
                submitHandler: (data) => handleEditDoctor(data)
            }))
    }
    return (
        <Layout>
            {
                doctorData.doctor ?
                    <Container dir="rtl">
                        <br />
                        <Row >
                            <Col xs={"auto"}><Button variant="outlined" className="ButtonRow" color="primary" onClick={() => handlePrint()}> <AiFillPrinter /> ?????????? ?????????? ???????? ???????????? ???? ??????????????</Button></Col>
                        </Row>
                        <br /><br />
                        <Row>
                            <Col xs={12}>
                                <Typography variant="h5"> ???????????? ??????????????</Typography></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col><Typography >?????????? : {`${doctorData.doctor.name}`}</Typography></Col>
                            <Col><Typography >?????????? ???? ???????????? ?????????????????? : {`${doctorData.doctor.rate ? doctorData.doctor.rate:"??????????"}`}</Typography></Col>
                        </Row>
                        <br />
                        {<Row className="ButtonRow">
                            <Col xs={3}><Button variant="contained" color="primary" onClick={handleEditProfile} >?????????? ????????????</Button></Col>
                        </Row>}
                        <br />

                        <Row>
                            <Row className="ButtonRow">
                                <Col xs={12}><Button variant="contained" color="primary" onClick={() => handleCreate("attendance")} >?????????? ???????? ???????? ??????????????</Button></Col>
                            </Row>
                            <br />
                            <Row className="ButtonRow">
                                {doctorData.doctorAttendance ? doctorData.doctorAttendance.map(weekno => {
                                    return <Col xs={12}><Link variant="body2" component="button" color="primary" onClick={() => getweeklyAttendance(weekno.weekno)} >-  ???????? ???????????? ?????????????? {weekno.weekno}</Link></Col>
                                }) : null}
                            </Row>
                            <br />

                            {
                                doctorData.attendance ?
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
                                                            <TableCell>
                                                                ??????????
                                                            </TableCell>
                                                            <TableCell className="ButtonRow">
                                                                ??????????????
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
                                                                        <TableCell>
                                                                            {c.date}
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
                            <Col>

                            </Col>
                        </Row>
                        <br />
                        <Divider />
                        <br />
                        <Row>
                            <Col xs={12}>
                                <Typography variant="h5"> ???????????????? ???????? ?????????????? ????????????</Typography>
                            </Col>
                        </Row>
                        <br />
                        {
                            doctorData.courses.map((course, i) => {
                                return <Row>
                                    <Col xs={12}><Typography >{course.title}</Typography></Col>
                                    <ChartMe data={doctorData.coursesRating[i][0]} title={"????????????????"} />
                                    <ChartMe data={doctorData.coursesRating[i][1]} title={"????????????????"} />
                                    <ChartMe data={doctorData.coursesRating[i][2]} title={"????????????"} />
                                </Row>
                            })
                        }
                        {/*<Row>
                        <ChartMe data={doctorData.doctortotalStatus} title={"????????????"}/>
                        <ChartMe data={doctorData.LecStatus} title={"????????????????"}/>
                        <ChartMe data={doctorData.SecStatus} title={"????????????????"}/>
                        <ChartMe data={doctorData.LabStatus} title={"????????????"}/>
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
                    <br />
                    {AttendeNumber + didnotAttendNumber == 0 ? <Typography>???? ???????? ?????????????? ??????????</Typography> :
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