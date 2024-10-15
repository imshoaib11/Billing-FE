import React, { useEffect, useState } from 'react'
import {Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';
import Error from './Error';


function Login() {
    let navigate = useNavigate()
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");

    let [loading,setLoading] = useState(false);
    let [error,setError] = useState(false);
    let [errMsg,seterrMsg] = useState("");

    useEffect(()=>{
        sessionStorage.clear()
    },[])

    const handleLogin = async () =>{
        try{
            let {message,role,token,userName} = await AxiosService.post(`${ApiRoutes.LOGIN.path}`,{
                email,
                password
            },{authenticate:ApiRoutes.LOGIN.auth})
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('role',role)
            sessionStorage.setItem('userName',userName)

            toast.success("Logged In Successfully")
            if(role=='User')
            navigate('/bills')
            else
            navigate('/admin')
        }
        catch(error){
            setError(true)
            seterrMsg(error.message)
        }
    }   

  return <>
            <div className='row justify-content-center mt-10'>
      {/* {loading && <Loader/>} */}
      <div className='col-md-5'>
        <div className='bs mt-5 color1'>
        {error && <Error message= {errMsg} />}
      <Form>
       <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary"className='mt-10' onClick={()=>handleLogin()} >
        Log On
      </Button>
      
    </Form>

    </div>
    </div>
    </div>
  </>
}

export default Login