import React, { useEffect, useState } from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";
import axios from "axios";
import AddCour from "../AddCour.jsx/AddCour";
import { VscAdd } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { BsChatRightDotsFill } from "react-icons/bs";
export default function Navbar() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  const [userdata, setUserData] = useState([]);
  const is_superuser = localStorage.getItem("is_superuser");

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const url = `http://localhost:8000/api/user/${userId}`;
          const response = await axios.get(url);
          setUserData(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#245' }}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" >EduShare</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {
            !token  && !userId  ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Acceuil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/inscription">Inscriptions</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/connexion">Connexion</Link>
                </li>
              </ul>
            )
            
              :
              (
                <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                   <li className="nav-item">
                  {is_superuser === "false" &&  <Link className="nav-link" to={`/cours/${userId}`}>Voir des cours</Link> } 
                  </li>
                  <li className="nav-item">
                   {is_superuser === "false" &&  <Link className="nav-link" to={`/profile/${userId}`}> <CgProfile /> Mon Profile</Link>}
                  </li>
                  <li className="nav-item">
                   {is_superuser === "false" &&  <Link className="nav-link" to={`/chat/${userId}`}> <BsChatRightDotsFill /> Discuter</Link>}
                  </li>
                  
                </ul>
                <div>

                  <div className="d-flex gap-3 flex-row">
                  <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary text-white"> <VscAdd /> </button>
                  <AddCour />
                  <Link className="btn btn-danger" to={`/logout`}> <FiLogOut />   </Link>
                  </div>
                </div>
                </>
              )
          }
        </div>
      </div>
    </nav>
  );
}
