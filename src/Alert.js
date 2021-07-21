import React, {useEffect} from 'react';

const Alert = ({message, type, removeAlert}) => {
    useEffect (() => {
        const timeOut = setTimeout(() => {
            removeAlert();
        }, 3000)
        return () => clearTimeout(timeOut);
    })
    return <p className={`alert alert-${type}`}>{message}</p>
}

export default Alert;