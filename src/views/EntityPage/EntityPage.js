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
import {MdDelete,MdEdit} from 'react-icons/md'
import  {toast}  from 'react-toastify';

export default function EntityPage(props){
    const  entityName = props.match.params.entity;
    let entity = entities.get(entityName)
    let dispatch = useDispatch();
    const history = useHistory();
    const [entityList, setEntityList] = useState([]);
    const [ppl,setPPL] = useState({})
    useEffect(()=>{
        fetch();
        async function fetch(){
            let res = await axios.get(API+entity.api);
            console.log(res.data)
            if(entityName==="courses"){
                setEntityList(res.data.courses)
                res.data.doctors .push({label:"لايكن", value : null})
                res.data.officers.push({label:"لايكن", value : null})
                res.data.tassistants.push({label:"لايكن", value : null})
                setPPL({doctors:res.data.doctors,officers:res.data.officers,tassistants:res.data.tassistants})
                entity.FormData.rows[0].push(
                    {
                        name: "doctorId",
                        label: "دكتور",
                        type: "select",
                        value: "",
                        size: "small",
                        rows: res.data.doctors,
                        helperText: "لا يترك فارغا",
                        placeHolder:"",
                        variant: "outlined",
                        xs:12,
                        md:12,
                    },{
                        name: "OfficerId",
                        label: "ظابط مشرف",
                        type: "select",
                        value: "",
                        size: "small",
                        rows: res.data.officers,
                        helperText: "لا يترك فارغا",
                        placeHolder:"",
                        variant: "outlined",
                        xs:12,
                        md:12,
                    },{
                        name: "TAssistantId",
                        label: "معيد",
                        type: "select",
                        value: "",
                        size: "small",
                        rows: res.data.tassistants,
                        helperText: "لا يترك فارغا",
                        placeHolder:"",
                        variant: "outlined",
                        xs:12,
                        md:12,
                    }
    
                )
            }else{
                setEntityList(res.data);
            }
        }
    },[])
    //fetch all repory associated to the entity name
    function handleAddEntity (){
        dispatch(updateForm({...entity.FormData,state:true}))
    }
    async function handleEdit(type,id,index){
        let formsDataEdit = entity.FormData
        dispatch(updateForm({...formsDataEdit,
        state:true,
        submitHandler:(data)=>handleEditAxios(data,type),
        values:entityList[index],
        submitButtonText:"تعديل"
    }))
    }
    async function handleDeleteAxios(type,id){
        let res = await axios.delete(API+`${entityName.slice(0,-1)}/${id}`);
        if(res.status == 200){
            toast.warning("تم المسح بنجاح")
            window.location.reload();
        }
    }
    
    async function handleEditAxios(data,type){
        let res = await axios.put(API+`${entityName.slice(0,-1)}`,{data});
        if(res.status == 200){
            toast.success("تم التعديل بنجاح")
            window.location.reload();
        }
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
                                                {
                                                    entity.settingsCol ?
                                                    <TableCell>
                                                    اعدادات 
                                                 </TableCell>
                                                    :null
                                                }
                                                
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                entityList.map((data ,i )=>{
                                                    return(
                                                        <TableRow  >
                                                            {
                                                                entity.tableBody.map(Datatype=>{
                                                                    return <TableCell  className={entity.clickableRow ?"EntityRow":""}  onClick={()=>{entity.clickableRow && history.push(`/${entityName}/${data.id}`)}} style={{textAlign:"right"}}>{data[Datatype]}</TableCell>
                                                                })
                                                            }
                                                            {
                                                                entity.settingsCol ?
                                                                <TableCell>
                                                                    <IconButton onClick={()=>handleDeleteAxios(entityName,data.id)}><MdDelete /></IconButton>
                                                                     <IconButton onClick={()=>handleEdit(entityName,data.id,i)}><MdEdit/></IconButton>
                                                                </TableCell>
                                                                :null
                                                            }
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