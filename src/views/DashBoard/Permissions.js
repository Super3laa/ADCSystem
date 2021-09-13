import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import ar from '../../assets/dictionary/ar.json'
import en from '../../assets/dictionary/en.json'
import FormBuilder from '../../components/FormBuilder/FormBuilder'
import { Container, Row, Col } from 'reactstrap';
export default function Loading() {
    const theme = useTheme(); 
    const lang = useSelector(state=>state.language)
    const [formState,setFormState]= useState(null);

    const routes = ["page1" , "page2","page3" ,"page4"]
    useEffect(()=>{
        //get users and their permissions and add it to the state later
        let routesToFormCols=[];
        routes.forEach(route=>{
            routesToFormCols.push({
                name: route,
                label: route,
                type: "checkbox",
                translate:route,
                value: false,
                helperText: "Don't leave it blank",
                size: "small",
                variant: "outlined",
                registerObject: {
                    required: true,
                },
                fullWidth: false,
            })
        })
        setFormState({routesToFormCols})
    },[])

    function handleSubmit(data){
        console.log(data);
    }
    return (
        <Layout>
            <Container className="Page">
                <Row>
                    <Col>
                    {formState ? <FormBuilder
                                rows={[
                                    [{
                                        name: "username",
                                        label: "Username",
                                        type: "select",
                                        value: "",
                                        size: "small",
                                        helperText: "Don't leave it blank",
                                        variant: "outlined",
                                        translate:"Username",
                                        registerObject: {
                                            required: true,
                                        },
                                        fullWidth: true,
                                    },
                                    ],
                                    formState.routesToFormCols
                                ]
                                }
                                color={theme.palette.primary.main}
                                noSubmit={false}
                                grid={{ xs: 12, md: 3 }}
                                submitButtonText="Edit"
                                dictionary={{ar,en}}
                                dir={lang.direction}
                                language={lang.currentLanguage.toLowerCase()}
                                submitButtonFullWidth={true}
                                submitHandler={handleSubmit}
                            />:null}
                    
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}