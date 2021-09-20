import React, {useEffect} from "react";

const Alert = ({ alert, alertMessage }) => {
  
    useEffect(() => {
        const alertTimeout = setTimeout(() => alertMessage() , 3000)
        return(() => {
            clearTimeout(alertTimeout)
        })
    })

  const { message } = alert;
  return <div className="alert-box" >{message}</div>;
};

export default Alert;
