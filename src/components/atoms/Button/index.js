import React from "react"

const Button = ({title, onClick, loading}) => {
    if(loading){
        return <button className="btn disable">Sedang Memuat, Mohon Tunggu...</button>
    }
    return(
        <button className="btn" onClick={onClick}>{title}</button>
    )
}

export default Button;