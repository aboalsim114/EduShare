import React, { useState, useEffect } from 'react';
import './Chat.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

export default function Chat() {
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const [users, setUsers] = useState({});
    const [Success , setSuccess] = useState("")


    const fetchMessages = async () => {
        try {
            let url = "http://localhost:8000/api/forum/";
            const response = await axios.get(url);
            if (response.status < 300) {
                setData(response.data);
                response.data.forEach(msg => fetchUser(msg.user));
            }
        } catch (error) {
            console.log(error);
        }
    };


    const sendMessage =  async (e) => {
        e.preventDefault()
        let url = `http://127.0.0.1:8000/api/forum/`
        const response = await axios.post(url, {message : message , user : localStorage.getItem("userid")});
        if (response.status < 300) {
            setSuccess("message envoyé ")
            setMessage("")
            fetchMessages()
        }
    }


    const fetchUser = async (id) => {
        let url = `http://127.0.0.1:8000/api/user/${id}`;
        const response = await axios.get(url);
        if (response.status < 300) {
            setUsers(prevUsers => ({ ...prevUsers, [id]: response.data }));
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <>
            <Navbar />
            <div className='Chat mt-5'>
                <div className="container">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                                   {data.length === 0 && <p>soyez le premier a envoyé un message </p> } 
                            <div className="card chat-app">
                                <div className="chat mt-5">
                                    {Array.isArray(data) && data.map((msg) => (
                                        <div key={msg.id} className="chat-history">
                                            <ul className="m-b-0">
                                                <li className="clearfix">
                                                    <div className={`message-data text-right`}>
                                                    <img 
                                                    src={users[msg.user] && users[msg.user].user_image ? users[msg.user].user_image : 'https://bootdey.com/img/Content/avatar/avatar7.png'} 
                                                    alt="User Avatar"
                                                    className="user-avatar"
                                                    />

                                                        <span className="message-data-time">{(users[msg.user] && users[msg.user].username) ? users[msg.user].username : msg.user}, {new Date(msg.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className={`  ${users[msg.user] ? users[msg.user].id == localStorage.getItem("userid") ? "float-right message other-message" : "message my-message" :"" } `}>{msg.message}</div>

                                                </li>
                                            </ul>
                                        </div>
                                    ))}

                                    <div className="chat-message clearfix">
                                        <form onSubmit={sendMessage}>

                                        
                                        <div className="input-group mb-0">
                                            <div className="input-group-prepend">
                                              
                                                <button type='submit' className='btn btn-info p-3 text-white'> <i className="fa fa-send"></i> envoyer le message</button>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Entrez votre message  ici ..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
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
    );
}
