import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import './style.css'
export default function Layout(props){
    const[headerHight,setHeaderHight]=useState(0)
    useEffect(()=>{
        setHeaderHight(document.getElementById('AbstractHeader').clientHeight)
    },[headerHight])
    return (
    <React.Fragment>
        <Header />
        <div style={{minHeight:`calc(100vh - ${headerHight}px)`}}>
        {props.children}
        </div>
        <Grid dir="rtl" direction="column" Container className="divFooter"justifyContent="center" alignItems="center">
        <Grid item > تم الإنشاء تحت إشراف السيد رئيس فرع العلوم الهندسية </Grid>
        <Grid item > <bold className="Joo">عميـــــــــد د / يـــوســـــــف فيــــاض</bold></Grid>

        </Grid>

    </React.Fragment>
    )
}