import axios from "axios";
const URL = 'http://192.168.2.29:5000/api'



export async function AuthFunction(body) {
    console.log(body,"body")


    const res =  await axios.post(`${URL}/auth`,body, {
        headers: {
          "Content-Type": "application/json",
        }
      });
        if(res.status == 200 && res.status <= 499){
         return await res.data;
        }else{
            let errResponse = await res.json()
            throw new Error(errResponse.error);
        }
  }