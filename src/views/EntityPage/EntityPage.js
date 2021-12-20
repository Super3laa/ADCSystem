import React, { useState ,useEffect} from "react";
import Layout from "../../components/Layout/Layout";
import { Container,Row,Col } from "reactstrap";
import FormBuilder from '../../components/FormBuilder/FormBuilder'
import Button from "@material-ui/core/Button";
import entities from './Entity'
import { useDispatch } from "react-redux";
import {updateForm} from '../../redux/actions/form';
import axios from 'axios';
import { API } from "../../const";
import { useHistory } from "react-router";
import './styles.css'
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
                        <Container  style={{padding:"10px"}}>
                            {
                                entityList.map(data=>{
                                   return <Row >
                                        <Col onClick={()=>history.push(`/${entityName}/${data.id}`)} className="listItem">{data[entity.displayRow]}</Col>
                                    </Row>
                                })
                            }
                        </Container>
                    </Row>
                </Container>
            </Layout>
    )
}