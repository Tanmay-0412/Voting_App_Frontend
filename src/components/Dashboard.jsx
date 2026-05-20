import React from "react"
import { BASE_URL } from "../../config"

const Dashboard = () => {


  const candidateList = async()=>{
    try{
      const URL = `${BASE_URL}/candidates/list`
      const data = await fetch(URL)
      const response = await data.json()
    }catch(err){

    }
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p> View votes </p>
    </div>
  )
}

export default Dashboard