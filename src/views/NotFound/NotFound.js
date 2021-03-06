import React from "react";
import Layout from "../../components/Layout/Layout";
import NotFound from '../../assets/images/NotFound.jpg'
import { Button } from '@material-ui/core'
import { Container, Row, Col } from 'reactstrap';
import {useHistory} from 'react-router-dom'
import Translate from 'react-translate-component';
import jwtDecode from 'jwt-decode';
export default function Loading() {
    const history  = useHistory();
    console.log("Here ?")
    //Refactor Take me Home later for permissions reRouting
    try {
        let user = jwtDecode(localStorage.getItem('token')).user;
       switch (user.permissions){
        case 'superadmin':
            history.replace('/Home')
            break;
        case 'admin':
            history.replace('/Home')
            break;
        default :
            history.replace('/Login')
     }
    } catch (error) {
        history.replace('/Login')

    }
    
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