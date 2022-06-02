import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; 
import CommentairesPages from "../pages/CommentairesPages";
import { toast } from "react-toastify";
import { POST_API } from '../config';

const ArticlePage = () => {

    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedCom, setIsLoadedCom] = useState(false);
    const [content, setContent] = useState();
    const params = useParams();
    const token = window.localStorage.getItem("authToken");
    const userInfo = jwtDecode(token);
    const userId= JSON.stringify(userInfo.userId);
    const navigate = useNavigate();


     useEffect(() => {
      axios.get("http://localhost:4000/api/posts/" + params.id,
        axios.defaults.headers["Authorization"] = "Bearer " + token)
        .then(
            (result) => {
                setIsLoaded(true);
                setPost(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setPost(error);
            }
        )
    }, [params.id, token])

    useEffect(() => {
        const fetch = async () => {
        await axios.get("http://localhost:4000/api/posts/" + params.id + "/comments",
        axios.defaults.headers["Authorization"] = "Bearer " + token)
        .then(
            (result) => {
                setIsLoadedCom(true);
                setComments(result.data); 
                },
            (error) => {
                setIsLoadedCom(true);
                setComments(error);
                }
            )
        }
        fetch().catch(console.error);
    }, [params.id, token])

        const submitForm =  async (e, id) => {
        e.preventDefault();

        try {
            await  axios.post(POST_API + "/" + parseInt(id) + "/comments", {
            "content": content,
            "postId": parseInt(id),
            "userId": parseInt(userId)
        }, {
            headers: {"Authorization": 'Bearer '+ token},
        });
            navigate('/articles');
            toast.success("Le commentaire a bien été crée");
            } catch (error) {
            toast.error("Une erreur est survenue");
            } 
        }
    

        if (!post) {
            return( <> <h1>Pages 404</h1> </>)
        } else if (!isLoaded) {
            return <div>Chargement...</div>;
        } else {
            return ( <>
                <div className="jumbotron">
                    <h1 className="display-3">{post.content}</h1>
                        <p className="lead">
                        {post.User.name}
                        </p>
                <hr className="my-4" />
                </div>
                <div>
                { comments !== null && comments !== undefined && !!userId ? 
                <CommentairesPages comments={comments} isLoadedCom={isLoadedCom} userId={userId}/> : 
                null }
                </div>
                    <div className="input-group">
                        <textarea className="form-control" 
                                  placeholder="Le contenu de votre commentaire"
                                  type="text"
                                  name="content"
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}/>
                </div>
                <button  type="submit" className="btn btn-success mt-5" onClick={ e => submitForm(e, post.id)}>Submit</button>
            </> );
            }
}
 
export default ArticlePage;