import React from 'react'
import Hero from "../Components/Hero"
import Biography from "../Components/Biography"
import Department from '../Components/Department'
import MessageForm from "../Components/MessageForm"


const Home = () => {
  return (
    <div>
      <Hero title ={"Welcome to TRUHealing "}/>
      <Biography/>
      <Department/>
      <MessageForm/>
    </div>
  )
}

export default Home
