import usuario from "./assets/usuario.png"

import axios from "axios"
import { useEffect,useState } from 'react'
import ModalComments from "./ModalComments"
//import TryCesar from "./TryCesar"

function Post(props) {
  const [user,setUser] = useState({})

  const getUser = async() =>{
    const token = localStorage.getItem("token")
    const response = await axios.get(`http://localhost:80/usuarios/${props.id_usuario}`,{
      headers:{
        token:token
      }
    })
    setUser(response.data.usuario)
  }
  
  useEffect(()=>{
    getUser()
  },[])

  return (
    <div style={{background:"#F3ECBE",width:"60vw",borderRadius:"40px",padding:"1vw",height:"16vw"}}>
        <img src={usuario} width={60} height={60}/>
        <h4>{user.correo}</h4>
        <p>{props.contenido}</p>
        <div style={{width:"100%",height:"1.5px",background:"#59291B"}}></div>
          <ModalComments id_publicacion={props.id_publicacion}/>
    </div>
  )
}

export default Post