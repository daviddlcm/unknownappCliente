import { useState } from 'react'
import usuario from "./assets/usuario.png"
import Button from 'react-bootstrap/Button';
import axios from "axios"

function App() {
  const [texto,setTexto] = useState({texto:""})
  //const [me,setMe] = useState({me:""})
  const handleOnChange = (e) => {
    e.preventDefault()
    setTexto({
      ...texto,
      texto: e.target.value
    })
  } 
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(texto.texto == null || texto.texto == ""){
      alert("no puedes agregar una publicacion vacia")
    }else{
      console.log(texto)
      const token = localStorage.getItem("token")
      const res = await axios.post("http://localhost:80/publicaciones",texto,{headers:{token:token}})
      console.log(res)
      console.log(texto.texto)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} style={{background:"#F3ECBE",width:"60vw",borderRadius:"40px",padding:"1vw",height:"16vw"}}>
          <img src={usuario} width={60} height={60}/>
          <h4>Me</h4>
          <input placeholder='escribe una publicación' onChange={handleOnChange} style={{border:"none",borderRadius:"5px",borderBottom: "2px solid #C8C8C8",borderRight:"2px solid #C8C8C8",background:"none",width:"100%"}}/>
          <Button variant="light" style={{marginTop:"1vw"}} onClick={handleSubmit}>Agregar Publicacion</Button>
    </form>

    </>
  )
}

export default App
