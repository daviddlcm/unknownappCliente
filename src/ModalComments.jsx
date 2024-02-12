import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import comentar from "./assets/comentario.png"
import Message from "./Message"
import io from "socket.io-client"
import { useEffect, useState } from 'react';
import axios from "axios"
import NewMessageJoinRoom from './NewMessageJoinRoom';

const socket = io.connect("http://localhost:80/unknown",{
    auth:{
        token:localStorage.getItem("token")
    }
})




function MyVerticallyCenteredModal(props) {
  const [usuario,setUsuario] = useState("")
  const getMe = async () => {
    const response = await axios.get("http://localhost:80/usuarios",{headers:{token:localStorage.getItem("token")}})
    setUsuario(response.data.usuario.nombre)
  }
  const [room,setRoom] = useState({
    room:"",
    usuario:""
  })

  const JoinRoom = () => {
    if(props.id_publicacion && usuario){
      socket.emit("joinRoom",props.id_publicacion,usuario)
      socket.on("whoJoin", (data,idroom) => {
        setRoom({
          usuario:data,
          room:idroom
        })
      })
      return <NewMessageJoinRoom room={room.room} usuario={room.usuario}/>
    }
  }

  
    const [addComment, setAddComment] = useState({
        comentario:"",
        id_publicacion:props.id_publicacion
    })
    const [comentarios, setComentarios] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit("comentario:crear",addComment)
    }
    const handleOnChange = (e) => {
        setAddComment({
            ...addComment,
            comentario:e.target.value
        })
    }

    const agregarSetComentarios = (data) => {
          setComentarios((state) => [...state,data])
    }
    useEffect(() => {
        getMe();

        socket.emit("comentario:verTodosDeUnaPublicacion",props.id_publicacion)
        socket.on("comentario:verTodosDeUnaPublicacion_succes",data => {
          console.log(data)
          if(data.idPublicacion == props.id_publicacion){
            setComentarios(data.comentarios)
          }
        })

        socket.on("comentario:creado",data => {
          const newjiji = {
            comentarios:data.comentario,
            id_publicacion:data.id_publicacion,
            id_usuario:data.id_usuario
          }
            if(data.id_publicacion == props.id_publicacion){
              agregarSetComentarios(newjiji)
            }
        });


        return () => {
            socket.off("comentario:creado")
            socket.off("comentario:verTodosDeUnaPublicacion")
            socket.off("comentario:verTodosDeUnaPublicacion_succes")
        }
        
    },[props.id_publicacion])
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Comentarios
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <JoinRoom/>
        {
            comentarios.map((comentario,index) => (
                <Message key={index} comentario = {comentario.comentarios} id_publicacion={props.id_publicacion} id_usuario={comentario.id_usuario}/>
            ))
        }

        <div style={{display:"flex",height:"3vw",marginTop:"0.5vw"}}>
            <input placeholder='Agregar un nuevo comentario' onChange={handleOnChange} name="comentario" style={{width:"80%"}}/>
            <Button variant="success" style={{width:"20%"}} onClick={handleSubmit}>Comentar</Button>
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }


//   function RecorrerComentarios(props){
//     console.log(props.comentarios)
//         return <Message comentario = {props.comentarios}/>
//   }

  
function ModalComments(props) {
    const [modalShow, setModalShow] = React.useState(false);
    
  return (
    <>
      <Button style={{display:"flex",width:"8vw",margin:"1vw auto",background:"none", border:"none",color:"black"}} onClick={() => setModalShow(true)}>
        <img src={comentar} width={40} height={40}/>
          <p style={{width:"5vw",paddingTop:"0.5vw"}}>Comentar</p>
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id_publicacion={props.id_publicacion}
      />
    </>
  );
}

export default ModalComments