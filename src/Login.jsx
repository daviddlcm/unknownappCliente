import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
function Login() {
    const [login,setLogin] = useState({
        correo:"",
        password:""
    })
    const handleSubmit = async (e) =>{
    e.preventDefault()
    if(login.correo === "" || login.password === ""){
        alert("Rellene todos los campos")
    }else{
      const response = await axios.post("http://localhost:80/usuarios/login",login)
        if(response.data.token){
            const token = response.data.token
            localStorage.setItem("token",token)
            window.location.href = "/home"
        }
    }
    }
    const handleOnChange = (e) => {
    e.preventDefault()
    setLogin({
        ...login,
        [e.target.name]:e.target.value
    })
    }
  return (
    <>
    <div style={{width:"50%",margin:"10vw auto"}}>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo electronico</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='correo' onChange={handleOnChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleOnChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Ingresar
      </Button>
      <Link to = {`/register`}>Registrarse</Link>
    </Form>
    </div>
    </>
  )
}

export default Login