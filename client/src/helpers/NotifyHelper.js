import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <>
        <ToastContainer />
    </>
  )
}

function showToast(props) {
    let autoCloseTime = 5000;
    if(props.type === 'success') {
        toast.success(props.msg, {
            position: props.position ? props.position : 'top-right',
            autoClose: autoCloseTime,
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body'
        });
    }
    else if(props.type === 'info') {
        toast.info(props.msg, {
            position: props.position ? props.position : 'top-right',
            autoClose: autoCloseTime,
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body'
        });
    }
    else if(props.type === 'error') {
        toast.error(props.msg, {
            position: props.position ? props.position : 'top-right',
            autoClose: autoCloseTime,
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body'
        });
    }
}

export { Toast, showToast };