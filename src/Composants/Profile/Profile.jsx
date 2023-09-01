import React, { useState, useEffect, useRef } from 'react';
import "./Profile.css";
import Navbar from '../Navbar/Navbar';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Profile() {
    const { userid } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [universite, setUniversite] = useState('');
    const [user_image, setUser_image] = useState(null);
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

   
    useEffect(() => {
        const fetchUserData = async () => {
            let url = `http://localhost:8000/api/user/${userid}`;

            try {
                const response = await axios.get(url);
                if (response.status < 300) {
                    setData(response.data);
                    setUsername(response.data.username);
                    setEmail(response.data.email);
                    setUniversite(response.data.university);
                }
            } catch (error) {
                console.log("error", error);
                setError(error);
            }
        };

        fetchUserData();
    }, [userid]);


    const handleSumbit = async (e) => {
        e.preventDefault();

        let url = `http://localhost:8000/api/user/${userid}/`;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);


        try {
            const response = await axios.put(url, formData);
            if (response.status < 300) {
                setData(response.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
                setSuccess("Modification effectuée");
            }
        } catch (error) {
            console.log("error", error.response.data);
            setError(error.response.data);
        }
    };


    return (
        <>
            <Navbar />
            <div className='Profile'>
            <form onSubmit={handleSumbit}>
                <div className="container-xl px-4 mt-4">
                    <hr className="mt-0 mb-4" />
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-header">Profile image </div>
                                <div className="card-body text-center">
                                <img onChange={(e) => setUser_image(e.target.files[0])} className="img-account-profile rounded-circle mb-2" src={data.user_image} alt="" />
                                <div className="large font-italic text-muted mb-4">User Role : {data.is_superuser ? "admin" : "user"} </div>
                                <div className="large font-italic  mb-4 text-muted    ">Ecole : {data.university} </div>
                                
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header">Account Details</div>
                                <div className="card-body">
                                   
                                        <div className="mb-3">
                                            <label className="small mb-1" htmlFor="inputUsername">Username</label>
                                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="inputUsername" type="text" placeholder="Enter your username" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" />
                                        </div>
                                 
                                     
                                        <div className="mb-3">
                                        <p style={error ? { color: "red" } : { color: "green" }}>
                                        {error ? (typeof error === 'string' ? error : JSON.stringify(error)) : success}
                                        </p>
                                        </div>
                                        <button className="btn btn-primary" type="submit">Sauvegarder les modifications</button>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </>
    );
}
