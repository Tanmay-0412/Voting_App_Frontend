import React from "react"
import { BASE_URL } from "../../config"

const Dashboard = () => {

  const role = localStorage.getItem(Role)
  
  const userList = async()=>{
    try{
      const URL = `${BASE_URL}/users/list`
      const data = await fetch(URL)
      const response = await data.json()
    }catch(err){
      console.error("User listing error:", err);
      toast.error(`${err.message}`, {
      position: "top-center",
      theme: "dark",
      });
    }
  }

  const candidateList = async()=>{
    try{
      const URL = `${BASE_URL}/candidates/list`
      const data = await fetch(URL)
      const response = await data.json()
    }catch(err){
      console.error("Candidate listing error:", err);
      toast.error(`${err.message}`, {
      position: "top-center",
      theme: "dark",
      });
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