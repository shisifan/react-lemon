import React from 'react'
import './app.css'
const image = require('./public/images/logo.png')
const tsImage = require('./public/images/typescript-def.png')
const index = () => {
  return(
    <div className="page" >
        <div className="content" >
          <div><img src={image}/></div>
          <div className="add">+</div>
          <div><img src={tsImage}/></div>
        </div>
        <p className="title" >欢迎使用lemon!</p>
    </div>
  )
}
export default index;