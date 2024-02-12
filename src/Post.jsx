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
  const [numberComments,setNumberComments] = useState(0)
  
  

  useEffect(()=>{
    const interval = setInterval(() => {
      getNumberComments(props.id_publicacion)
    },5000)

    const getNumberComments = async (id_publicacion) => {
      const res = await axios.get(`http://localhost/comentarios/publicacion/numero/${id_publicacion}`)
      setNumberComments(res.data.data)
    }

    getUser()

    return () => {
      clearInterval(interval);
    }
  },[])

  return (
    <div style={{background:"#F3ECBE",width:"60vw",borderRadius:"40px",padding:"1vw",height:"16vw"}}>
        <img src={usuario} width={60} height={60}/>
        <h4>{user.correo}</h4>
        <p>{props.contenido}</p>
        <p>comentarios: {numberComments}</p>
        <div style={{width:"100%",height:"1.5px",background:"#59291B"}}></div>
          <ModalComments id_publicacion={props.id_publicacion}/>
    </div>
  )
}

export default Post