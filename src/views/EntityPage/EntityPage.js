import React from "react";
import Layout from "../../components/Layout/Layout";
import { Container,Row,Col } from "reactstrap";
import FormBuilder from '../../components/FormBuilder/FormBuilder'
import Button from "@material-ui/core/Button";

export default function EntityPage(props){
    let entity = props.match.params.entity
    //fetch all repory associated to the entity name
    const addButton = ()=>{
        return <Button size="large" variant="contained" color="primary" style={{marginTop:"30px"}} type="submit">
        إضافه تقرير
        </Button>
    }
    function searchHandler(data){
        console.log(data)
    }
    return(
            <Layout>
                <Container dir='rtl'>
                    <Row>
                        <Col xs={12}>
                            <Container style={{padding:"10px"}}>
                                <Row>
                                    <Col>
                                        <FormBuilder 
                                             rows={[
                                                [{
                                                    name: "search",
                                                    label: "بحث عن تقرير",
                                                    type: "text",
                                                    value: "",
                                                    size: "small",
                                                    helperText: "Don't leave it blank",
                                                    placeHolder:"بحـــث ... ",
                                                    variant: "outlined",
                                                    translate:"Username",
                                                    xs:8,
                                                    md:8
                                                },{
                                                   type:"custom",xs:4,
                                                   md:4,
                                                   component:addButton
                                                  
                                                }
                                                ]
                                            ]
                                            }
                                            noSubmit={false}
                                            grid={{ xs: 12, md: 12 }}
                                            dir={"rtl"}
                                            submitButtonText="بحث"
                                            submitButtonFullWidth={true}
                                            submitHandler={searchHandler}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <Container  style={{padding:"10px"}}>
                            <Row>
                                blah
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </Layout>
    )
}