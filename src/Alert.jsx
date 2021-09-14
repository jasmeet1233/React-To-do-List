import React, {useEffect} from "react";
import './App.css'

const Alert = ({ alert, alertMessage }) => {
  
    useEffect(() => {
        const alertTimeout = setTimeout(() => alertMessage() , 3000)
        return(() => {
            clearTimeout(alertTimeout)
        })
    })

  const { message } = alert;
  return <div className="alert-box">{message}</div>;
};

export default Alert;
