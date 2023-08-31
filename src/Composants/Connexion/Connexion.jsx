import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import axios from "axios"
import "./Connexion.css"
import {  useNavigate } from "react-router-dom";

export default function Connexion() {
    const navigate = useNavigate();
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          username: username,
          password: password
      };
        let url = "http://localhost:8000/api/user/login/";
       
        try {
          const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
          if (response.status === 200 && response.data && response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("is_superuser", response.data.user.is_superuser);
            localStorage.setItem("userid", response.data.user.id);
            localStorage.setItem("ecole" , response.data.user.university);

            if(response.data.user.is_superuser) {
                    navigate(`/admin/${response.data.user.id}`);
                } else {
                    navigate(`/profile/${response.data.user.id}`);
                }
               

               
            }
        } catch (e) {
          console.log(e.response.data); 
          setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
      }
      
    };

  return (
    <>
    <Navbar/>
    <div className="login-page">
  <div className="container">
    <div className="row">
      <div className="col-xl-8 m-auto col-sm-8 col-12">
        <div className="log-box">
          <div className="row">
            <div className="col-xl-5 col-sm-5 col-12 pad-right-0">
              <div className="logo-back"></div>
            </div>

            <div className="col-xl-7 col-sm-7 col-12 pad-left-0">
            <form onSubmit={handleSubmit}>
              <div className="log-content">
                <h1>Connexion</h1>
                <div className="log-body">
                  <div className="form-group myr-top">
                    <label>username</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className="form-control custom" placeholder="username" />
                  </div>
                  <div className="form-group myr-top">
                    <label>mot de passe</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control custom" placeholder="*******" />
                  </div>
                  <div className="log-btn text-center">
                    <br />
                    {error && <p style={{color:"red"}}>{error}</p>}
                    <button type='submit'  className="btn btn-theme1">connectez vous</button>
                  </div>
                
                </div>
              </div>
            </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
