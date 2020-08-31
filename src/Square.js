import React from "react"

const Square =(props)=>{
return <div className="squares" onClick={props.handleClick} >
  {props.value}
</div>
}

export default Square