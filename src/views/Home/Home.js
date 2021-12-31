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
        permissions:["admin","superadmin"]
    },
    "courses": {
        title: "المواد",
        path:"/courses",
        icon:"FaBook",
        permissions:["admin","superadmin"]
    },
    "doctors": {
        title: "الأساتذه",
        path:"/doctors",
        icon:"FaUser",
        permissions:["admin","superadmin"]

    },
    "officers": {
        title: "الضباط",
        path:"/officers",
        icon:"FaUser",
        permissions:["admin","superadmin"]
    },
    "tassistants": {
        title: "المعيدين",
        path:"/tassistants",
        icon:"FaUser",
        permissions:["admin","superadmin"]

    }, "users": {
        title: "المستخدمين",
        path:"/users",
        icon:"FaUser",
        permissions:["superadmin"]

    },
    
}

export default function Home(props) {
    let currentRoutes =  props.match.params.hasOwnProperty('section') ? routes[props.match.params.section].children :routes;
    const lang = useSelector(state=>state.language);
    const permissions = useSelector(state=>state.user.permissions)
    return (
        <Layout>
            <Container dir={lang.direction}>
                <Row>
                    {
                     Object.keys(currentRoutes).map((data,i)=>{
                         return  currentRoutes[data].permissions.includes(permissions) && <Col xs ={12} md={3}> <Card key={i} data={currentRoutes[data]} /></Col>
                     })   
                    }
                </Row>
            </Container>
        </Layout>
    )
}