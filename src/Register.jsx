import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from "axios"
import {Link} from 'react-router-dom';
function Register() {
    const [register,setRegister] = useState({
        nombre:"",
        correo:"",
        password:""
    })

    const handleOnChange = (e) => {
    e.preventDefault()
    setRegister({
        ...register,
        [e.target.name]:e.target.value
    })
    }
    const handleSubmit = async (e) => {
    e.preventDefault()
    if(register.nombre == "" || register.correo == "" || register.password == ""){
        alert("Llena todos los campos")
    }else{
            const response = await axios.post("http://localhost:80/usuarios",register)
            if(response.data.message == "usuario agregado"){
                alert("usuario agregado")
                window.location.href = "/"
            }
    }
    }
  return (
    <div style={{width:"50%",margin:"10vw auto"}}>
    <h1>Register</h1>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control placeholder="Ingresa tu nombre" name="nombre" onChange={handleOnChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo</Form.Label>
        <Form.Control type="email" placeholder="Ingresa tu correo" onChange={handleOnChange} name="correo"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingresa tu contraseña" onChange={handleOnChange} name="password"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrarse
      </Button>
      <Link to={`/`}>
      Inicar sesion
      </Link>
    </Form>
    </div>
    
  )
}

export default Register