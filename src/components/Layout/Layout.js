import React, { useEffect, useState } from "react";
import Header from "./Header";

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
    </React.Fragment>
    )
}