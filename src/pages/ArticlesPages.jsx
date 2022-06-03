import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Moment from 'react-moment';
import jwtDecode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { POST_API } from '../config';
import Button from '@restart/ui/esm/Button';
import img from "../images/img.jpg"

const ArticlesPage = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const token = window.localStorage.getItem("authToken");
    const userInfo = jwtDecode(token);
    const userId= JSON.stringify(userInfo.userId);

    const deletePost = async (e, id) => {
    e.preventDefault(); 
    const originalPost = [...articles];

    setArticles(articles.filter(i => i.id !== id));

    try {
      axios({
            method: 'delete',     //put
            url: POST_API + "/" + id,
            headers: {"Authorization": 'Bearer '+ token}, 
            data: {
                "userId": Number(userId)// This is the body part
            }});
      console.log(id);
      toast.success("L'article a bien été supprimée");
    } catch (error) {
      toast.error("Une erreur est survenue");
      setArticles(originalPost);
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


    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <>   
                <div className="container">
                    <h1>Tous les articles publiés</h1>
                    <div className="d-flex">
                        <button className="btn btn-outline-danger btn-sm" onClick={() => {navigate("/createarticle/")}}>Publier un article</button>
                    </div>
                    {articles.map((article) => (
                        <div className="card text-center mt-5 "key={article.id}>
                            <div className="card-header">   
                                <img className="img-thumbnail" src={article.imageUrl || img}  alt="Card "/> 
                        </div>

                        <div >

                            <div className="card-body">
                                 <Link to={"/article/" + article.id} className=" text-danger">{article.title}</Link>
                                <p className="card-text">{article.content}</p>
                                   {userId === `${article.User.id}` ? 
                                   <Button className="btn btn-outline-danger"  variant="outlined" color="primary" onClick={ (e) => deletePost(e, article.id)}>
                                        Delete
                                    </Button> 
                                    :  null}
                            </div>
                                <div className="card-footer text-muted">
                                <p id="created-at"><Moment fromNow>{article.createdAt}</Moment></p>
                                </div>
                            </div>
                        </div>
                    
                    ))}
                    
                </div>
            </>
        );
    } 
};
 
export default ArticlesPage;