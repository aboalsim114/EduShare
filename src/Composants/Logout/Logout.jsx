import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem("userid");
    if (token &&  userid) {
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      localStorage.removeItem('is_superuser');
    }
    navigate('/connexion'); 
  }, [navigate]); 

  return ;
}