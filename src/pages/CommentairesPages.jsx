import React, { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { POST_API } from '../config';

const CommentairesPages = ({comments, isLoadedCom, userId}) => {

    const [commentaires, setCommentaires] = useState(comments);
    const token = window.localStorage.getItem("authToken");
    
    const deleteCommentaire = async (e, id, postId) => {
    e.preventDefault(); 
    const originalCommentaires = [...commentaires];
    setCommentaires(commentaires.filter(i => i.id !== id));
    try {
      axios({
            method: 'delete',
            url: POST_API + "/" + parseInt(postId) + "/comments/" + id,
            headers: {"Authorization": 'Bearer '+ token}, 
            data: {
                 "id": id,
                 "postId": parseInt(postId),
                 "userId": parseInt(userId) // This is the body part
            }});
      console.log(id);
      toast.success("Votre commentaire a bien été supprimée");
    } catch (error) {
      toast.error("Une erreur est survenue");
      setCommentaires(originalCommentaires);
    }
  }

      if (!commentaires.length) {
              return (   <h1>Pas de comments</h1>)
            } 
            else if (!isLoadedCom) {
               return <div>Chargement de commentaires...</div>
            }
            else  {
          return(<>  {commentaires.map((m) =>  
                <div key={m.id}>
                    <div className="d-flex">
                        <p className="col-11">
                        {m.content}
                        </p>
                        {m.userId === parseInt(userId) &&
                        <button type="button" className="btn btn-outline-dark col-1" onClick={(e) => deleteCommentaire(e, m.id, m.postId)}>Delete</button> }
                    </div>
                    <p>{m.User.name}</p>
                    <hr className="my-4" />
                </div>
                )
            }
          </> );
        }
}
export default CommentairesPages;