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
    const  entityName = props.match.path==="/courses/:type/"?"courses" : props.match.params.entity;
    let entity = entities.get(props.match.path==="/courses/:type/"?"courses": entityName)
    let dispatch = useDispatch();
    const history = useHistory();
    const [entityList, setEntityList] = useState([]);
    const [ppl,setPPL] = useState({})
    useEffect(()=>{
        fetch();
        async function fetch(){
            if(props.match.path ==="/courses/:type/"){
                let res = await axios.get(API+`course/type/${props.match.params.type}`).catch((err)=>{
                    window.location.reload();
                });
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
                let res = await axios.get(API+entity.api).catch((err)=>{
                    window.location.reload();
                });
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

    async function searchHandler(data){
        let res = await axios.get(API+entity.api+'search'+`/${data.search}`);
        //console.log(res.data)
        setEntityList(res.data);

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
                                                    label: `بحث عن ${entity.text && entity.text}`,
                                                    type: "text",
                                                    value: "",
                                                    size: "small",
                                                    helperText: "Don't leave it blank",
                                                    placeHolder:"بحـــث ... ",
                                                    variant: "outlined",
                                                    translate:"Username",
                                                    xs:12,
                                                    md:12
                                                }
                                                ]
                                            ]
                                            }
                                            noSubmit={false}
                                            grid={{ xs: 12, md: 8 }}
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
                        <Col><Button size="large" onClick={handleAddEntity} variant="contained" color="primary" style={{marginTop:"30px"}} type="submit">
        اضافة {entity.text}
        </Button></Col>
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
                                                entityList.length >0 && entityList.map((data ,i )=>{
                                                    return(
                                                        <TableRow  >
                                                            {
                                                                entity.tableBody.map(Datatype=>{
                                                                    return <TableCell  className={entity.clickableRow ?"EntityRow":""}  onClick={()=>{entity.clickableRow && history.push(entityName !=="courses"?`/${entityName}/${data.id}`:`/${entityName}/detailed/${data.id}`)}} style={{textAlign:"right"}}>
                                                                        {data[Datatype]?data[Datatype]:"لايكن"}
                                                                        </TableCell>
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