import React, { useContext, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button'
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../AxiosAPI';
import { DataContext } from './DataContext';


function Sidebar({ showSidebar, setShowSidebar }) {
// Context
const {currentUser} = useContext(DataContext)

// History
const history = useHistory()

// handle logout
const logout = () => {
    axiosInstance.post('/blacklist/', {
        "refresh_token": localStorage.getItem("refresh_token")
    })
    .then(res => {
        console.log(res)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('username')
        axiosInstance.defaults.headers['Authorization'] = null;
        window.location.reload()
        setShowSidebar(false)
    }
    )
    .finally(history.push('/login'))
    .catch(console.error) 

}
// handle closing sidebar
const handleCloseSidebar = () => setShowSidebar(false)

    return (
        <div>
            <Offcanvas show = { showSidebar } onHide = { handleCloseSidebar }>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h1>{ currentUser }</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Link onClick = { handleCloseSidebar } className={"nav-link"} to={"/"}>Home</Link>
                    <Link onClick = { handleCloseSidebar } className={"nav-link"} to={"/login"}>Login</Link>
                    <Link onClick = { handleCloseSidebar } className={"nav-link"} to={"/signup"}>Signup</Link>
                    <Link onClick = { handleCloseSidebar } className={"nav-link"} to={'/create'}>Create Recipe</Link>
                    <Button variant = 'primary' onClick= { logout }>Logout</Button>
                </Offcanvas.Body>
                </Offcanvas>
                    
        </div>
    );
}

export default Sidebar;