import React, { useState, useEffect } from 'react'
import './Cour.css';
import Navbar from '../../Navbar/Navbar';
import Commentaire from '../../Commentaire/Commentaire';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import { GiSave } from 'react-icons/gi';


export default function Cour() {
    const { cour_id } = useParams();
    const userId = localStorage.getItem("userid");
    const ecole = localStorage.getItem("ecole");
    const [Data, setData] = useState([]);
    const [authors, setAuthors] = useState({});
    
    
 
 

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

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
        const fetchCour = async () => {
            let url = `http://localhost:8000/api/cours/${cour_id}`;

            try {
                const response = await axios.get(url);
                if (response.status < 300) {
                    setData(response.data);
                    fetchAuthor(response.data.auteur);
                }
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchCour();
    }, [])




  return (
    <>
    <Navbar />
   
    <div className='Cour'>
      <div class="container">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">{Data.titre} </h3>
            <h6 class="card-subtitle">{formatDate(Data.created_at)} </h6>
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-6">
                    <div  class="white-box  text-center  ">
                        <img className='imageProduct' src={Data.image ? Data.image : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"} />
                        </div>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-6">
                    <h4 class="box-title mt-5">description</h4>
                    <p>{Data.description}</p>
                    <h2 class="mt-5">
                        {Data.prix} € 
                    </h2>
                   
                    {
                        Data.prix === 0 ? (
                            <a href={`http://localhost:8000${Data.download_url}`} download>
                            <button class="btn btn-primary btn-rounded mt-5 "><FiDownload />  Telecharger Le cour</button>
                           </a>
                        
                        )
                        :
                        <button class="btn btn-primary btn-rounded mt-5">Acheter le Cour</button>
                    }
                  


                
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <h3 class="box-title mt-5">General Info</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-product">
                            <tbody>
                                <tr>
                                    <td width="390">pseudo</td>
                                    <td>{authors[Data.auteur]?.username} </td>
                                </tr>
                                <tr>
                                    <td>Mail</td>
                                    <td>{authors[Data.auteur]?.email} </td>
                                </tr>
                            
                                <tr>
                                    <td>Date d'ajoute</td>
                                    <td>{formatDate(Data.created_at)} </td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>{authors[Data.auteur]?.is_superuser === true ? "Admin" : "User"}  </td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
    <Commentaire/>
    </>
  )
}
