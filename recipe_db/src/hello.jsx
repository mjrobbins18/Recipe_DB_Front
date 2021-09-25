import React, { useState, Component, useEffect } from 'react';
import axiosInstance from './AxiosAPI';

function Hello(props) {
    
    const [message, setMessage] = useState({
        message: ""
    })
    const getMessage = () => {
        
            // const header = localStorage.getItem("access_token");
            // console.log(header);
        
        axiosInstance.get('/hello/')
        .then(res => console.log(res.data.hello))
        .catch(console.error)
    }
    useEffect(()=> getMessage(),[])
    
    return (
        <div>
            <p>hello</p>
        </div>
    );
}


export default Hello;