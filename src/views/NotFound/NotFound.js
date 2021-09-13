import React from "react";
import Layout from "../../components/Layout/Layout";
import NotFound from '../../assets/images/NotFound.jpg'
import { Button } from '@material-ui/core'
import { Container, Row, Col } from 'reactstrap';
import {useHistory} from 'react-router-dom'
import Translate from 'react-translate-component';
export default function Loading() {
    const history  = useHistory();
    //Refactor Take me Home later for permissions reRouting
    return (
        <Layout>
            <div style={{ minHeight: "inherit", display: "flex" }}>
                <div style={{ margin: "auto" }}>

                    <Container style={{ textAlign: "center" }}>
                        <Row><Col>
                            <img style={{
                                objectFit: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                width: "40vw"
                            }} alt="login" src={`${NotFound}`} /></Col></Row>
                        <Row><Col>
                        <Button color="primary" onClick={()=>history.push('/Home')} variant="contained"><Translate content = "NotFoundButtonText" /></Button>
                        </Col></Row>

                    </Container>

                </div>
            </div>
        </Layout>
    )
}