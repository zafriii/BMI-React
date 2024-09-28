import React from 'react'
import './footer.css'

function Footer() {
  return (
    <div className="footer">
        <p>©{new Date().getFullYear()} | All rights reserved</p> 
    </div>
  )
}

export default Footer