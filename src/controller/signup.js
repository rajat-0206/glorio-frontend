import axios from "axios"



const createUser = async (userData) =>{
    let response = await axios.post("https://gloiriobackend.herokuapp.com/signup",userData)
    return response.data;
}

export default createUser;