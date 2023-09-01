import React, { useState  , useEffect, Suspense} from 'react'
import './Dashboard.css'
import axios from 'axios'
import Navbar from "../Navbar/Navbar.jsx"
import { VscTrash } from "react-icons/vsc";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
export default function Dashboard() {
    const [users, setUsers] = useState([])
    const [cours, setCours] = useState([])
    const [commentaires , setCommentaires] = useState([])
    const [authors, setAuthors] = useState({})
    const [error, setError] = useState('');

    const handleDeleteUser = async  (id) => {
        try
        {
            let ask = window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?");
            if(ask)
            {
                let url  = `http://localhost:8000/api/user/${id}`
                const response = await axios.delete(url)
                if(response.status < 300) {
                    alert("Utilisateur supprimé")
                }
            }
        }
        catch (error){
            setError(error)
        }

    }



    const handleDeleteCour = async  (id) => {
        try
        {
            let ask = window.confirm("Voulez-vous vraiment supprimer ce cours ?");
            if(ask)
            {
                let url  = `http://localhost:8000/api/cours/${id}`
                const response = await axios.delete(url)
                if(response.status < 300) {
                    alert("Cours supprimé")
                }
            }
        }
        catch (error){
            setError(error)
        }
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

    const truncateTitre= (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    }
    

    useEffect(() => {
        const fetchCours = async () => {
            let url = "http://127.0.0.1:8000/api/cours/"
            const response = await axios.get(url)
            if(response.status < 300) {
                setCours(response.data);
                // Fetch author for each course
                response.data.forEach(course => {
                    fetchAuthor(course.auteur);
                });
            }
        }
        fetchCours();
    }, []);


    useEffect(() => {
        const fetchUsers = async () => {
            let url  = "http://127.0.0.1:8000/api/user/"
            const response = await axios.get(url)
            if(response.status < 300) {
                setUsers(response.data)
            }
        }
        fetchUsers()
    }, [])



    useEffect(() => {
        const fetchCommentaires = async () => {
            let url = "http://127.0.0.1:8000/api/commentaire/"
            const response = await axios.get(url)
            if(response.status < 300) {
                setCommentaires(response.data)
            }
        }
        fetchCommentaires()
    }, [])

  return (
    <>
      <Navbar/>
    <div className='Dashboard'>
      <div class="content mt-5">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
            
            </div>
        </div>
        
        <div class="row">
            <div class="col-xl-4">

                <div class="card-box ribbon-box">
                    <div class="ribbon ribbon-primary">Users</div>
                    <div class="clearfix"></div>
                    <div class="inbox-widget">

                        {users.filter(user => user.is_superuser === false).map((user) => (
                             <a >
                             <div class="inbox-item">
                                 <div class="inbox-item-img"><img style={{ width: "40px", height: "40px" }} src={user.user_image ? user.user_image : "https://bootdey.com/img/Content/avatar/avatar1.png"} class="rounded-circle" alt=""/></div>
                                 <p class="inbox-item-author">{user.username} </p>
                                 <p class="inbox-item-text">{user.email} </p>
                                 <p class="inbox-item-date">
                                 <button type="button" class="btn btn-danger" onClick={() => handleDeleteUser(user.id)}> <VscTrash /> </button>

                                 </p>
                             </div>
                         </a>
                        ))}
                       

                        
                  
                
                  
                   
                
                   
                    </div>
                </div>
            </div>
            <div class="col-xl-8">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card-box tilebox-one"><i class="icon-layers float-right text-muted"></i>
                            <h6 class="text-muted text-uppercase mt-0">Users</h6>
                            <h2 class="" data-plugin="counterup">{users.filter(user => user.is_superuser === false).length} </h2></div>
                    </div>
                  
                    <div class="col-sm-4">
                        <div class="card-box tilebox-one"><i class="icon-paypal float-right text-muted"></i>
                            <h6 class="text-muted text-uppercase mt-0">Cours </h6>
                            <h2 class=""><span data-plugin="counterup">{cours.length}</span></h2>  </div>
                    </div>
                
                    <div class="col-sm-4">
                        <div class="card-box tilebox-one"><i class="icon-rocket float-right text-muted"></i>
                            <h6 class="text-muted text-uppercase mt-0">Commentaires</h6>
                            <h2 class="" data-plugin="counterup">{commentaires.length}</h2></div>
                    </div>
                 
                </div>
               
    
                <div class="card-box  mt-5 table-users ">
                    <h4 class="header-title mb-3 ">Cours</h4>
                    <div class="table-responsive">
                        <table class="table ">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>titre</th>
                                    <th>Date</th>
                                    <th>Auteur</th>
                                    <th>Action</th>
                              
                                </tr>
                            </thead>
                            <tbody>
                                {cours.map((cour) => (
                                      <tr>
                                      <td key={cour.id}>{cour.id} </td>
                                      <td>{truncateTitre(cour.titre)}</td>
                                      <td>{new Date(cour.created_at).toLocaleDateString()}</td>
                                      <td>{authors[cour.auteur] ? authors[cour.auteur].username : ""}</td>
                                      
                                    <td  className='d-flex gap-3'>
                                        <button onClick={() => handleDeleteCour(cour.id)} className='btn btn-danger'><VscTrash /> </button>
                                       <Link  className='text-white btn btn-primary'  target='_blank' to={`/cour/${cour.id}`}><FaEye /></Link> 
                                    </td>
                                   

                                     
                                  </tr>
                                ))}
                              
                                
                            </tbody>
                        </table>
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
