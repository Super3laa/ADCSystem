import { Typography } from '@material-ui/core';
import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './Card.css'
import BG from '../../assets/images/cardbackground.png'
import { useHistory } from 'react-router';
import * as Icons from "react-icons/fa";

export default function Card(props) {
    const history = useHistory();
    console.log(props.data)
    const handleNavigation = ()=>{
        history.push(props.data.path);
    }
    let IconComponent = props.data.icon?Icons[props.data.icon]:null;
    return (
        <div className="Card" style={{    backgroundImage:`url(${BG})`}} onClick={handleNavigation}>
            <Container>
                <Row>
                    <Col>
                        <Typography variant="h5">{props.data.title} <IconComponent style={{verticalAlign: "initial"}}/></Typography>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}