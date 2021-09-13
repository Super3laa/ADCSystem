import React from "react";
import Layout from "../../components/Layout/Layout";
import Card from "./Card";
import { Container, Row, Col } from 'reactstrap';
import { useSelector } from "react-redux";
const routes = {
    "parent1": {
        title: "Parent1",
        path:"/Home/parent1",
        icon:"FaUserAlt",
        children: {
            "child1": { title: "cbild1", path: "/child1" ,icon :"FaChild"},
            "child2": { title: "child2", path: "/child2" ,icon :"FaChild"}

        },
    },
    "parent2": {
        title: "Parent2",
        path:"/Home/parent2",
        icon:"FaUserAlt",
        children: {
            "child1": { title: "cbild1", path: "/child1" },
            "child2": { title: "child2", path: "/child2" },
            "child3": { title: "child3", path: "/child3" },
            "child4": { title: "child4", path: "/child4" },


        }
    }
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