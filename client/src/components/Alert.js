import React from 'react'
export default function Alert(props) {
  function Cap(word)
  {
    const Lower=word.charAt(0).toUpperCase()+word.slice(1);
    return Lower;
  }
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} style={{position:"absolute",top:"5.8vh",zIndex:"10",width:"99.5vw"}} role="alert">
  <strong> {props.alert.msg}</strong>
</div>
  )
}
