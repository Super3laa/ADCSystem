import React, { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import {  Modal, ModalBody } from 'reactstrap';
import FormBuilder from '../FormBuilder/FormBuilder';
import { updateForm } from '../../redux/actions/form';
export default function ModalForm(){
  const formProps = useSelector(state=>state.form);
  const dispatch = useDispatch();
  const toggle = () => dispatch(updateForm({state:null}));

  return (
      <Modal isOpen={formProps.state} centered  toggle={toggle} className={"ModalApp"}>
        <ModalBody>
          {formProps.isCustomComponent?formProps.customComponent:
            <FormBuilder 
              
              {...formProps}
            />
          }
        </ModalBody>
      </Modal>
  );
}