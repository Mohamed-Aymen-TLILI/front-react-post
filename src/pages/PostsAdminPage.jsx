import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { POST_API } from '../config';


const PostsAdminPages = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [articles, setArticles] = useState([]);

    const token = window.localStorage.getItem("authToken");


    const deletePost = async (e, postId) => {
    e.preventDefault(); 
    const originalPosts = [...articles];
    setArticles(articles.filter(i => i.id !== postId));
    try {
      axios({
            method: 'delete',
            url: POST_API + "/admin/" + postId,
            headers: {"Authorization": 'Bearer '+ token}});
      toast.success("L'article a bien été supprimé");
    } catch (error) {
      toast.error("Une erreur est survenue");
      setArticles(originalPosts);
    }
  }


    useEffect(() => {
      axios.get(POST_API, 
        axios.defaults.headers["Authorization"] = "Bearer " + token)
        .then(
            (result) => {
                setIsLoaded(true);
                setArticles(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [token])

    if (!articles.length) {
              return (   <h1>Pas d'articles</h1>)
            } 
            else if (!isLoaded) {
               return <div>Chargement des articles...</div>
            }
            else  {
          return(<>  {articles.map((m) =>  
                <div key={m.id}>
                    <div className="d-flex">
                        <p className="col-11">
                        {m.content}
                        </p>
                       
                        <button type="button" className="btn btn-outline-dark col-1" onClick={(e) => deletePost(e, m.id)}>Delete</button>
                    </div>
                    <p>{m.User.name}</p>
                    <hr className="my-4" />
                </div>
                )
            }
          </> );
        }
}
 
export default PostsAdminPages;