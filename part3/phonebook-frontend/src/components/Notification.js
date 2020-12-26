import React from 'react'
import './notification.css'

const Notification = ({error, message} ) => {
    if (message === "") {
        return null;
    }
    return (<div className={error ? "error" : "message"}>{message}</div>)
}

export default Notification
