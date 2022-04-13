import { Grid ,Tooltip} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { API } from '../../const';
import FormBuilder from '../../components/FormBuilder/FormBuilder'
import moment from 'moment';
export default function DoctorsAttendance() {
    const [data, setData] = useState(null);
    async function handler(datatime) {
        let res = await axios.post(API + 'doctor/AttendanceAll', { datatime })
        let dataFormatted = []
        let from = new Date(datatime.from);
        let to = new Date(datatime.to);
        res.data.forEach(doctor => {
            let Obj = {name:doctor.name,attendance:[]};
            doctor.attendance.forEach((attendanceStatus,i) => {
                let fromTemp =moment(datatime.from);
                let ToTemp =moment(datatime.to);
                let lecDate = moment(attendanceStatus.date)
                if(i== 0){
                    let diffDays = lecDate.diff(fromTemp, 'days');
                    let arr = new Array(diffDays).fill(<Square content={{ style: { fill: "#ebedf0" } }} />)
                    Obj.attendance.push(arr);
                }
                if(attendanceStatus.status == "حضر"){
                    if (i !== 0){
                        if (lecDate.unix() !== moment(doctor.attendance[i-1].date).unix()){
                            Obj.attendance.push(<Square content={{ style: { fill: "rgb(0 ,255 ,100)" },date:lecDate.format('DD/MM/YYYY') }} />)
                        }
                    }else{
                        Obj.attendance.push(<Square content={{ style: { fill: "rgb(0 ,255 ,100)" },date:lecDate.format('DD/MM/YYYY')  }} />)
                    }
                }else{
                    Obj.attendance.push(<Square content={{ style: { fill: "#dc3545" } ,date:lecDate.format('DD/MM/YYYY') }} />)
                }
                if(i == doctor.attendance.length-1){
                    let diffDays = ToTemp.diff(lecDate, 'days');
                    let arr = new Array(diffDays).fill(<Square content={{ style: { fill: "#ebedf0" } }} />)
                    Obj.attendance.push(arr);
                }
            })

            /*if (doctor.attendance.length < period){
                let arr = new Array(period  - doctor.attendance.length).fill(<Square content={{ style: { fill: "#ebedf0" } }} />)
                Obj.attendance = [...Obj.attendance , ...arr]
            }*/
            dataFormatted.push(Obj);
        })
        setData(dataFormatted);
    }
    return (
        <Layout>
            <Grid container justifyContent='center'>
                <Grid item style={{ margin: "7px" }}>
                    <FormBuilder
                        rows={[
                            [{
                                name: "from",
                                label: "من",
                                type: "date",
                                value: "",
                                size: "small",
                                helperText: "Don't leave it blank",
                                variant: "outlined",
                                translate: "Username",
                                registerObject: {
                                    required: true,
                                },
                                fullWidth: true,
                            },
                            ],
                            [{
                                name: "to",
                                label: "إلى",
                                type: "date",
                                value: "",
                                size: "small",
                                helperText: "Don't leave it blank",
                                variant: "outlined",
                                registerObject: {
                                    required: true,
                                },
                                fullWidth: true,
                            },
                            ]
                        ]
                        }
                        noSubmit={false}
                        grid={{ xs: 12, md: 12 }}
                        submitButtonText="تمام الحضور"
                        submitButtonFullWidth={true}
                        submitHandler={handler}
                    />
                </Grid>
            </Grid>
            {data && <Grid container justifyContent="flex-start" dir="rtl" spacing={2} style={{marginTop:"10px"}}>
                <Grid item>
                    <Grid container direction="column">
                        {
                            data.map(doctor => {
                                return <Grid item >{doctor.name} </Grid>
                            })
                        }
                    </Grid>
                </Grid>
                <Grid item>
                    {
                        data.map(doctor => {
                            return <Grid item >{
                                doctor.attendance
                            }</Grid>
                        })
                    }
                </Grid>
            </Grid>}
        </Layout>
    )
}
function Square(props) {
    return (
        <React.Fragment>
            <Tooltip title={`${props.content.date?props.content.date:"لايكن"}`} arrow>
            <svg width="13" height="13" i style={{ margin: "0px 2px", borderRadius: "2px" }}>
                <rect width="13" height="13" style={props.content.style} />
            </svg>
            </Tooltip>
        </React.Fragment>

    )
}