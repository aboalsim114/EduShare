import React, { useState, useEffect } from 'react';
import './Cours.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar.jsx";

export default function Cours() {
    const userId = localStorage.getItem("userid");
    const [cours, setCours] = useState([]);
    const [authors, setAuthors] = useState({});
    const [userUniversity, setUserUniversity] = useState(null);

    const fetchAuthor = async (auteurId) => {
        let authorUrl = `http://localhost:8000/api/user/${auteurId}/`;
        try {
            const response = await axios.get(authorUrl);
            if (response.status < 300) {
                setAuthors(prevAuthors => ({
                    ...prevAuthors,
                    [auteurId]: response.data
                }));
            }
        } catch (error) {
            console.log("Error fetching author:", error);
        }
    }

    useEffect(() => {
        const fetchCours = async () => {
            let url = "http://localhost:8000/api/cours/";
    
            try {
                const response = await axios.get(url);
                if (response.status < 300) {
                    const filteredCours = response.data.filter(course => course.ecole === userUniversity);
                    setCours(filteredCours);
                    filteredCours.forEach(course => {
                        fetchAuthor(course.auteur);
                    });
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    
        if (userUniversity) {
            fetchCours();
        }
    }, [userUniversity]);
    


    useEffect(() => {
        const fetchUserDetails = async () => {
            let userUrl = `http://localhost:8000/api/user/${userId}/`;
            try {
                const response = await axios.get(userUrl);
                if (response.status < 300) {
                    setUserUniversity(response.data.university);
                }
            } catch (error) {
                console.log("Error fetching user details:", error);
            }
        }
    
        fetchUserDetails();
    }, [userId]);
    

    const truncateDescription = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    }
    

    return (
        <>
            <Navbar />
            <div className='Cours'>
            
                <div className="container">
                   
                    <div className="row">
                        <div className="col-sm-3 hidden-xs"></div>
                        <div className="col-sm-9">
                            <div className="row"></div>
                            
                            <br />
                            
                            <div className="row">
                                {cours.map((cour) => (
                                    
                                    <div className="product-list col-xs-12" >
                                        
                                        <div className="product-item ">
                                            <div className="item-overlay ">
                                                <div className="clickable">
                                                    <a >{cour.titre} </a>
                                                </div>
                                            </div>
                                            <div className="image">
                                                <a href="#">
                                                    <img src={cour.image || "https://bootdey.com/img/Content/avatar/avatar2.png"} alt="Author" />
                                                </a>
                                            </div>
                                            <div className="caption">
                                                <div className="name">
                                                    <a >{cour.titre}</a>
                                                </div>
                                                <div className="description">
                                                <p>{truncateDescription(cour.description)}</p>
                                                </div>
                                                <div className="price">
                                                    <span>{cour.prix} €</span>
                                                </div>
                                                <div className="cart">
                                                    <button type="button" className="btn btn-primary "> <Link style={{ textDecoration: 'none' }} className='text-white'  to={`/cour/${cour.id}`}>Voir le cour</Link></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
