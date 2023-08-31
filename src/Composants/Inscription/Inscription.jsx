import React,{useState,useEffect} from 'react'
import "./Inscription.css"
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { useNavigate} from "react-router-dom";

export default function Inscription() {
    const navigate = useNavigate();
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const [email,setEmail]=useState('');
    const [universite,setUniversite]=useState('');
    const [user_image,setUser_image]=useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = "http://localhost:8000/api/user/register/";
        let data = new FormData();
        data.append('username', username);
        data.append('password', password);
        data.append('email', email);
        data.append('university', universite);
        data.append('user_image', user_image);
        try {
            const response = await axios.post(url, data);
            if (response.status < 300) {
                navigate(`/connexion`);
            }
        } catch (e) {
            console.log(e);
            setError("Une erreur s'est produite Veuillez réessayer.");
        }
    }

  return (
    <>
      <Navbar/>
      <div style={{margin : "3%"}}  className="container">
            <div className="registration mx-auto d-block w-100">
                <div className="page-header text-center">
                    <h1>Inscription</h1>
                </div>
                
                <form onSubmit={handleSubmit} id="member-registration" action="/astroidnew/index.php/pages/register?task=registration.register" method="post" className="form-validate form-horizontal well" enctype="multipart/form-data">
                    <fieldset>
                       
                        <br />
                        <div className="form-group">
                            <label htmlFor="usernameInput">Nom d'utilisateur *</label>
                            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className="form-control" id="usernameInput" />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="passwordInput">Mot de passe *</label>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" />
                        </div>
                        <br />
                      
                     
                        <div className="form-group">
                            <label htmlFor="emailInput">Adresse e-mail *</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="emailInput" />
                        </div>
                        <br />

                        <div className="form-group">
                            <label htmlFor="emailInput">votre université / ecole</label>
                            <input value={universite} onChange={(e)=>setUniversite(e.target.value)} type="text" className="form-control" id="text" />
                        </div>
                        <br />
                       
                        <div className="form-group">
                            <label htmlFor="userImage">Image de l'utilisateur :</label>
                            <input  onChange={(e)=> setUser_image(e.target.files[0])} type="file" id="userImage" name="userImage" className="form-control" />
                        </div>
                        <br />
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="form-group d-flex justify-content-start">
                                <button type="submit" className="btn btn-primary">cree un compte</button>
                            </div>
                          
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </>
  )
}
