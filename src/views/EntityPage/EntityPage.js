import React, { useState ,useEffect} from "react";
import Layout from "../../components/Layout/Layout";
import { Container,Row,Col } from "reactstrap";
import FormBuilder from '../../components/FormBuilder/FormBuilder'
import entities from './Entity'
import { useDispatch } from "react-redux";
import {updateForm} from '../../redux/actions/form';
import axios from 'axios';
import { API } from "../../const";
import { useHistory } from "react-router";
import './styles.css'
import { Typography,Button,Table, TableBody, TableCell, TableRow, TableHead, IconButton, Divider } from '@material-ui/core';

export default function EntityPage(props){
    const  entityName = props.match.params.entity;
    let entity = entities.get(entityName)
    let dispatch = useDispatch();
    const history = useHistory();
    const [entityList, setEntityList] = useState([]);
    useEffect(()=>{
        fetch();
        async function fetch(){
            let res = await axios.get(API+entity.api);
            setEntityList(res.data);
        }
    },[])
    //fetch all repory associated to the entity name
    function handleAddEntity (){
        dispatch(updateForm({...entity.FormData,state:true}))
    }
    const addButton = ()=>{
        return <Button size="large" onClick={handleAddEntity} variant="contained" color="primary" style={{marginTop:"30px"}} type="submit">
        اضافة {entity.text}
        </Button>
    }
    function searchHandler(data){
        console.log(data)
    }
    return(
            <Layout>
                <Container dir="rtl">
                    <Row>
                        <Col xs={12}>
                            <Container style={{padding:"10px"}}>
                                <Row>
                                    <Col>
                                        <FormBuilder 
                                             rows={[
                                                [{
                                                    name: "search",
                                                    label: `بحث عن ${entity.text}`,
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
                        <Container >
                            <Row>
                                <Col >
                                <Table>
                                <TableHead>
                                            <TableRow >
                                                {
                                                    entity.tableHead.map(title=>{
                                                        return(
                                                            <TableCell style={{textAlign:"right"}}>
                                                                {title}
                                                            </TableCell>
                                                        )
                                                    })
                                                }
                                                
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                entityList.map(data=>{
                                                    return(
                                                        <TableRow  className="EntityRow" onClick={()=>history.push(`/${entityName}/${data.id}`)}>
                                                        <TableCell style={{textAlign:"right"}}>{data.name}</TableCell>
                                                        <TableCell style={{textAlign:"right"}}>
                                                            {data.militaryId}
                                                        </TableCell>
                                                        <TableCell style={{textAlign:"right"}}>
                                                            {data.type}
                                                        </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }

                                        </TableBody>
                                        </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </Layout>
    )
}