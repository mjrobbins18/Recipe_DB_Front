import React from 'react';
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://recipe-db-p4.herokuapp.com/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }})
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && originalRequest.url === 'https://recipe-db-p4.herokuapp.com/api/token/refresh') {
            window.location.href = '/login/'
            return Promise.reject(error);
    }

        if (error.response.data.code === "token_not_valid" && 
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized")
            {
                const refresh_token = localStorage.getItem('refresh_token');

                if (refresh_token) {
                    const tokenParts = JSON.parse(atob(refresh_token.split('.')[1]))

                    const now = Math.ceil(Date.now() / 1000)
                    console.log(tokenParts.exp)

                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post('/token/refresh/', {refresh: refresh_token})
                        .then(res => {
                            localStorage.setItem('access_token', res.data.access);
                            localStorage.setItem('refresh_token', res.data.refresh);
        
                            axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
                            originalRequest.headers['Authorization'] = "JWT " + res.data.access;
        
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }else {
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = '/login/';
                    }
                }else {
                    console.log("Refresh token not available.")
                    window.location.href = '/login/';
                }
            }
            
                
        
        return Promise.reject(error)
    }
)
export default axiosInstance;