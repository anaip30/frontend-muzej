import axios from "axios";
import $router from '@/router'


let a = JSON.parse(localStorage.getItem("user"))
let Service = axios.create({
    baseURL: `http://localhost:3000/`,
});


Service.interceptors.request.use((request) => {
    let token = Auth.getToken();

    request.headers["Authorization"] = "Bearer " + token;

    return request;
});

let Auth ={
  async login (email,password){
      console.log(email,password)
      let reponse = await  axios.post(`http://localhost:3000/authuser`,{
            email: email,
            password:password,
        });

        let user = reponse.data
        console.log(JSON.stringify(user.email))
        localStorage.setItem('user', JSON.stringify(user));
        return true
    },
    async registeruser (email,password, companyname){
        console.log(email,password)
        let reponse = await  axios.post(`http://localhost:3000/createuser`,{
              email: email,
              password:password,
              companyname: companyname
          });
  
          let user = reponse.data
          console.log(JSON.stringify(user.email))
          localStorage.setItem('user', JSON.stringify(user));
          return true
      },
    logout(){
        localStorage.removeItem('user');
    },
    getUser(){
        return JSON.parse(localStorage.getItem("user"))
    },
    getToken(){
        let user = Auth.getUser();
        if(user && user.token){
            return user.token
        }else{
            return false
        }      
    },
    authenticated(){
        let user = Auth.getUser();
        if (user && user.token){
            return true;
        }
        return false;
    },
    state:{
        get authenticated(){
            return Auth.authenticated();
        }
    }
}





export{Auth, Service}