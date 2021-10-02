import React, { useContext } from 'react';
import { NavDropdown, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import M from '../../images/M Logo.png'
import { DataContext } from './DataContext';
import axiosInstance from '../../AxiosAPI';
import { useHistory } from 'react-router';

function HeaderPhone(props) {
    // context
    const { currentUser } = useContext(DataContext)

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
    }
    )
    .finally(history.push('/recipes'))
    .catch(console.error) 

}
    return (
        <div className = "headerPhone">
            <Navbar>
                <NavDropdown id ="navbarDropDown" className = "dropDown">
                    <NavDropdown.Item> <Link className={"nav-link"} to={"/recipes"}>Home</Link></NavDropdown.Item>
                    {!currentUser ? <NavDropdown.Item> <Link className={"nav-link"} to={"/signup"}>Signup</Link></NavDropdown.Item> : null }
                    {currentUser ? <NavDropdown.Item> <Link className={"nav-link"} to={'/create'}>New Recipe</Link></NavDropdown.Item> : null }
                    {currentUser ? <NavDropdown.Item> <Link  className={"nav-link"} to={'/'}>Dashboard</Link> </NavDropdown.Item>: null}
                    <div className = "loginbtn">
                    {currentUser ? <NavDropdown.Item> <Button size = 'lg' variant = 'primary' onClick= { logout }>Logout</Button> </NavDropdown.Item>
                    : 
                    <NavDropdown.Item> <Link  className={"nav-link"} to={"/login"}>Login</Link></NavDropdown.Item>}
                    </div>
                </NavDropdown>
            </Navbar>
        </div>
    );
}

export default HeaderPhone;