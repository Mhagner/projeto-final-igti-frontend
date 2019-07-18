import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const options = {
    position: "bottom-left",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
}

export const notification = (type, message) => {
    return (
        toast[type](message, {
            options
        })
    )
}



