import { Typography } from '@material-ui/core';
import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './Card.css'
import BG from '../../assets/images/cardbackground.png'
import * as Icons from "react-icons/fa";

export default function Card(props) {
    let IconComponent = props.data.icon?Icons[props.data.icon]:null;
    return (
        <div className="Card" style={{backgroundImage:`url(${BG})`}} onClick={props.data.onClick}>
            <Container>
                <Row>
                    <Col>
                        <Typography  variant="h5">{props.data.title} {props.data.icon ? <IconComponent style={{verticalAlign: "initial"}}/>:null}</Typography>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}