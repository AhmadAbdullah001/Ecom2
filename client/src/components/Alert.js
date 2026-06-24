import React from 'react'
import './alert.css'

export default function Alert(props) {
  return (
    props.alert && (
      <div className={`custom-alert custom-alert-${props.alert.type} alert-show`} role="alert">
        <div className="alert-content">
          <strong>{props.alert.msg}</strong>
        </div>
      </div>
    )
  )
}
