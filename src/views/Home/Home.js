import React from "react";
import Layout from "../../components/Layout/Layout";
import Card from "./Card";
import { Container, Row, Col } from 'reactstrap';
import { useSelector } from "react-redux";
const routes = {
    "students": {
        title: "الطلاب",
        path:"/students",
        icon:"FaUserAlt",
    },
    "courses": {
        title: "المواد",
        path:"/courses",
        icon:"FaBook",
    },
    "Doctors": {
        title: "الدكاتره",
        path:"/Reports/report1",
        icon:"FaUser",
    },
    "Officers": {
        title: "الضباط",
        path:"/Reports/report2",
        icon:"FaUser",
    },
    "TA": {
        title: "المعيدين",
        path:"/Reports/report2",
        icon:"FaUser",
    },
    
}

export default function Home(props) {
    let currentRoutes =  props.match.params.hasOwnProperty('section') ? routes[props.match.params.section].children :routes;
    const lang = useSelector(state=>state.language);
    return (
        <Layout>
            <Container dir={lang.direction}>
                <Row>
                    {
                     Object.keys(currentRoutes).map((data,i)=>{
                         return <Col xs ={12} md={3}> <Card key={i} data={currentRoutes[data]} /></Col>
                     })   
                    }
                </Row>
            </Container>
        </Layout>
    )
}