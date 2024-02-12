import { useEffect,useState } from "react"
import axios from "axios"
function Message(props) {

  const [usuario,setUsuario] = useState("")

  const getUsuario = async () => {
    const response = await axios.get(`http://localhost:80/usuarios/${props.id_usuario}`)
    setUsuario(response.data.usuario.nombre)
  }
  useEffect(() => {
    getUsuario()
  },[])
  return (
    <div style={{background:"#C8C8C8",borderRadius:"10px",padding:"0.5vw",margin:"0.4vw 0"}}>
        <h6>{usuario}</h6>
        <p>{props.comentario}</p>
    </div>
  )
}

export default Message