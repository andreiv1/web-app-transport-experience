import jwtDecode from 'jwt-decode';

export default function getUserData(){
    const token = localStorage.getItem('token')
    if(token){
        const data = jwtDecode(token)
        return data
    }
    return null;
}