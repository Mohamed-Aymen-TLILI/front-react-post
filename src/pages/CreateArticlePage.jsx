import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import FormData from 'form-data';
import { useNavigate} from "react-router-dom"
import { POST_API } from '../config';
import Field from "../components/forms/Field";
import FieldText from "../components/forms/FieldText";


const CreateArticlePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState('');
    const token = window.localStorage.getItem("authToken");
    const userInfo = jwtDecode(token);
    const userId= JSON.stringify(userInfo.userId);
    const navigate = useNavigate();

  const submitForm =  async(e) => {
    e.preventDefault(); 
  const formData = new FormData()
  formData.append('title', title);
  formData.append('content', content);
  formData.append('imageUrl', file);
  formData.append('userId', parseInt(userId))
    for(var pair of formData.entries()) {
  console.log(`${pair[0]}: ${pair[1]}`);
}
   try {
      await  axios.post(POST_API, formData,  {
        headers: {"Authorization": 'Bearer '+ token}});
        navigate('/articles');
      toast.success("L'article a bien été crée");
    } catch (error) {
      toast.error("Une erreur est survenue");
    } 
  };
  
  return (
    <div className="Container">
      <form>
        <Field
          placeholder="Le titre de votre article"
          type="title"
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FieldText
          placeholder="Le contenu de votre article"
          type="text"
          label="Le contenu de votre article"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="update-image mt-3">
            <input type="file"  className="form-control" name="imageUrl" onChange={e => { setFile(e.target.files[0])}}/>
        </div>
    
        <button  type="submit" className="btn btn-success mt-5" onClick={ e => submitForm(e)}>Submit</button>
      </form>
    </div>
  );
};
 
export default CreateArticlePage;