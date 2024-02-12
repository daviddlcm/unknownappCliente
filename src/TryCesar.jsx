import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import comentar from "./assets/comentario.png"
import Message from "./Message"
import io from "socket.io-client"
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:80",{
    auth:{
        token:localStorage.getItem("token")
    }
})
function TryCesar(props) {

    const [comentarios, setComentarios] = useState([])

    useEffect(() => {
        
        socket.emit("comentario:verTodosDeUnaPublicacion",props.id_publicacion)
        socket.on("comentario:verTodosDeUnaPublicacion_succes", data => {
        
            setComentarios(data)
            data = null
        });
        socket.on("comentario:creado",data => console.log(data));
        return () => {
            socket.off("comentario:creado",data => console.log(data))
            socket.off("comentario:verTodosDeUnaPublicacion_succes",data => setComentarios(data))
        }
    },[comentarios])

  return (
    <>
    {
        comentarios.map((comentario,index) => (
            <RecorrerComentarios key={index} comentarios={comentario.comentarios}/>
        ))
    }
    </>
  )
}
function RecorrerComentarios(props){
    console.log(props.comentarios)
        return <Message comentario = {props.comentarios}/>
  }

export default TryCesar