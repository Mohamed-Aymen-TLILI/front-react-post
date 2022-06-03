import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom"
import axios from "axios";
import jwtDecode from "jwt-decode"; 
import { toast } from "react-toastify";
import { User_API } from '../config';


const ProfilPage = () => {

        const [form, setForm] = useState(false);
        const [user, setUser] = useState();
        const [username, setUsername] = useState();
        const [isLoaded, setIsLoaded] = useState(false);
        const navigate = useNavigate();
        const token = window.localStorage.getItem("authToken");
        const userInfo = jwtDecode(token);
        const userId= JSON.stringify(userInfo.userId);

        const handleSubmit = (e) => {
            e.preventDefault();
            setForm(true)
            
        }

        const handleUsername = async (e) => {
            e.preventDefault();
            try {
            await axios({
            method: 'put', 
            url: User_API + userId, 
            headers: {"Authorization": 'Bearer '+ token}, 
                data: {
                        name: username, // This is the body part
                    }
            });
            navigate('/');
            toast.success("Username a bien été modifié");
            setForm(false);
            } catch (error) {
            toast.error("Une erreur est survenue");
            setForm(false);
            }            
        }

        const cancelUsername = (e) => {
            e.preventDefault();
            setForm(false);
        }

        const handleChange = (e) => {
        setUsername(e.target.value);
        };

        useEffect(() => {
      axios.get(User_API + parseInt(userId),
        axios.defaults.headers["Authorization"] = "Bearer " + token)
        .then(
            (result) => {
                setIsLoaded(true);
                setUser(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setUser(error);
            }
        )
    }, [userId ,token])


    if (!user) {
            return( <> <h1>Pages 404</h1> </>)
        } else if (!isLoaded) {
            return <div>Chargement...</div>;
        } else {
    return ( 
        <>
        <p className="lead">
        Bienvenue chez Groupemania
        </p>
      <hr className="my-4" />
         <div className="jumbotron">
      {!form ? <div> <h1 className="display-3">{user.name}</h1>
       <p className="lead mt-10">
         <button  className="btn btn-outline-danger btn-lg mt-10" onClick={(e) => handleSubmit(e)}>
            <p>
            Modifier votre username
            </p>
        </button>
      </p> </div> : <div> 
        <input className="form-control" 
                                 placeholder="Changez Votre username"
                                 id="username"
                                  type="text"
                                  name="name"
                                  required
          onChange={(e) => handleChange(e)}
          
          />
           <div className="form-group mt-3 d-flex">
            <button  className="btn btn-outline-danger btn-lg mt-10 col-2" onClick={(e) => handleUsername(e)}> Modifiez</button>
            <div className="col-1"></div>
            <button  className="btn btn-warning btn-lg mt-10 col-2" onClick={(e) => cancelUsername(e)}> Annulez</button>

            </div>
        </div>
      }
      
    </div>
    </>
     );
    }
}
 
export default ProfilPage;