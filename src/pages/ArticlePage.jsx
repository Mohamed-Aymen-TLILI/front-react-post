import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import CommentairesPages from "../pages/CommentairesPages";
//import jwtDecode from "jwt-decode"; 

const ArticlePage = () => {

    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedCom, setIsLoadedCom] = useState(false);
    const params = useParams();
    const token = window.localStorage.getItem("authToken");
  //  const userInfo = jwtDecode(token);
  //  const userId= JSON.stringify(userInfo.userId);

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
                console.log(result.data);
                
            },
            (error) => {
                setIsLoadedCom(true);
                setComments(error);
            }
        )
    }
fetch().catch(console.error);
}, [params.id, token])

    /*const submitForm = (e) => {
    e.preventDefault();
    }*/

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
        <CommentairesPages commenraires={comments} isLoadedCom={isLoadedCom}/>
        </div>
        <div className="input-group">
            <textarea className="form-control" />
        </div>
    </> );
    }
}
 
export default ArticlePage;