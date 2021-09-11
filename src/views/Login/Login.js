import React from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from 'reactstrap';
import loginImg from './logo.png';
import './Login.css'
import { Button } from "@material-ui/core";
export default function Login() {
    return (
        <Layout>
            <Container className="LoginPage">
                <div className="LoginCard">
                    <Row>
                        <Col style={{ textAlign: "center" }}>
                            <img style={{
                                objectFit: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                            }} height="100rem" width="auto" alt="login" src={`${loginImg}`} />
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12}>
                           blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Button fullWidth={true} color="primary" variant="contained"> Login </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Layout>
    )
}