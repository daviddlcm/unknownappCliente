import React from 'react'
import noti from "./assets/notificacion.png"
function Nav() {
  return (
    <div style={{background:"#CDAF7B",height:"5vw",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h1 style={{color:"white",width:"15vw",paddingTop:"1vw"}}>UNKNOWN</h1>
        <img src={noti} width={30} height={30} style={{marginRight:"2vw"}}/>
    </div>
  )
}

export default Nav