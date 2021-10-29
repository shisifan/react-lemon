import React from 'react'
import './app.css'
const image = require('./public/images/logo.png')

const index = () => {
  return(
    <div className="page" >
        <div className="content" >
          <img src={image} />
          <p className="title" >欢迎使用lemon!</p>
      </div>
    </div>
  )
}
export default index;