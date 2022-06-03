import React, { useState, useEffect } from 'react';
import axios from "axios";
import jwtDecode from "jwt-decode"; 
import { toast } from "react-toastify";
import { Admin_API } from '../config';


const PostsAdminPages = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    const token = window.localStorage.getItem("authToken");
    const userInfo = jwtDecode(token);
    const userId= JSON.stringify(userInfo.userId);


    const deleteUser = async (e, id) => {
    e.preventDefault(); 
    const originalPosts = [...users];
    setUsers(users.filter(i => i.id !== id));
    try {
      axios({
            method: 'delete',
            url: Admin_API + id,
            headers: {"Authorization": 'Bearer '+ token}});
      toast.success(" le user a bien été supprimé");
    } catch (error) {
      toast.error("Une erreur est survenue");
      setUsers(originalPosts);
    }
  }


    useEffect(() => {
      axios.get(Admin_API + userId, 
        axios.defaults.headers["Authorization"] = "Bearer " + token)
        .then(
            (result) => {
                setIsLoaded(true);
                setUsers(result.data);

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [userId, token])

    if (!users.length) {
              return (   <h1>Pas de users</h1>)
            } 
            else if (!isLoaded) {
               return <div>Chargement des users...</div>
            }
            else  {
          return(<>  {users.map((m) =>  
                <div key={m.id}>
                    <div className="d-flex">
                        <p className="col-11">
                        {m.name}
                        </p>
                       
                        <button type="button" className="btn btn-outline-dark col-1" onClick={(e) => deleteUser(e, m.id)}>Delete</button>
                    </div>
                    <p>{m.email}</p>
                    <hr className="my-4" />
                </div>
                )
            }
          </> );
        }
}
 
export default PostsAdminPages;