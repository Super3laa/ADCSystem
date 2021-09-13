import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {  Modal, ModalBody } from 'reactstrap';
import FormBuilder from '../FormBuilder/FormBuilder';

export default function ModalForm(){
  const formProps = useSelector(state=>state.form.state)
  const [modal, setModal] = useState(formProps.state);
  const toggle = () => setModal(!modal);

  return (
      <Modal isOpen={modal} centered  toggle={toggle} className={"ModalApp"}>
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