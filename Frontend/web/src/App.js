import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import {AuthFunction} from "./services/api.services"
function App() {
  
  const authLogin= async(params) => {
    console.log(params)
    await AuthFunction(params).then(res=>{
      console.log(res)
    }).catch(err => console.error(err));

  }


  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
   return JSON.parse(jsonPayload);
 };




  return (
    <GoogleOAuthProvider clientId="243485113373-pct7hn1nnmimgj45rd4elk4jvlhm19bq.apps.googleusercontent.com">
    <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    const CLIENT_ID_GOOGLE = parseJwt(credentialResponse.credential);
    authLogin({email : CLIENT_ID_GOOGLE.email
      ,
      username : CLIENT_ID_GOOGLE.name
      ,profile_picture : CLIENT_ID_GOOGLE.picture});

  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
    </GoogleOAuthProvider>
  );
}

export default App;
