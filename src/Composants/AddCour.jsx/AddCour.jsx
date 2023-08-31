import React,{useState, useEffect} from 'react'
import axios from 'axios';
export default function AddCour() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [titre , setTitre] = useState('');
    const [description , setDescription] = useState('');
    const [image , setImage] = useState(null);
    const [contenu , setContenu] = useState(null);
    const [prix , setPrix] = useState('');
    const ecole = localStorage.getItem("ecole");


    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = "http://localhost:8000/api/cours/"
       const formData = new FormData();
       formData.append('titre', titre);
       formData.append('description', description);
       formData.append('image', image);
       formData.append('contenu', contenu);
       formData.append('prix', prix);
       formData.append('ecole', ecole);
       formData.append('auteur', localStorage.getItem("userid"));
       try {
           const response = await axios.post(url, formData);
           if (response.status < 300) {
               setSuccess("Ajout effectué");
           }
       }

       catch (e) {
           console.log(e);
           setError("Une erreur s'est produite Veuillez réessayer.");
       }

    }


  return (
       
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
    <form onSubmit={handleSubmit} >
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ajoutez Votre Cour</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
     

        <div className='form-group'>
          <label htmlFor="exampleInputEmail1">titre</label>
          <input required value={titre} onChange={(e)=>setTitre(e.target.value)} type="text" className='form-control' id="titre" aria-describedby="titre" placeholder="titre" />
        </div>

        <div className='form-group mt-4'>
          <label htmlFor="exampleInputPassword1">description</label>
          <textarea required value={description} onChange={(e)=>setDescription(e.target.value)} name="description" id="" className='form-control' cols="30" rows="10"></textarea>
        </div>

        <div className='form-group mt-4'>
        <label htmlFor="image">image</label>
        <input  onChange={(e)=>setImage(e.target.files[0])} type="file" className='form-control' id="image" />
        </div>

        <div className='form-group mt-4'>
        <label htmlFor="contenu">Fichier</label>
        <input required onChange={(e)=>setContenu(e.target.files[0])} type="file" className='form-control' id="contenu" />
        </div>

        <div className='form-group mt-4'>
        <label htmlFor="prix">Prix</label>
        <input required value={prix} onChange={(e)=>setPrix(e.target.value)} type="number" className='form-control' name="prix" id="prix" placeholder='20£' />
        </div>



        <div className='form-group'>
          <p style={error ? { color: "red" } : { color: "green" }}>
             {error ? (typeof error === 'string' ? error : JSON.stringify(error)) : success}
         </p>
        </div>


       
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">fermer</button>
          <button type="submit" class="btn btn-primary">Ajouter mon cour</button>
        </div>
        </form>
      </div>
    </div>
  </div>
  )
}
