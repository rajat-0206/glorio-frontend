import axios from "axios";

const LoginUser = async (userData) => {
    let response = await axios.post("https://gloiriobackend.herokuapp.com/login",userData);
    console.log(response)
    return response.data;
}

export default LoginUser;