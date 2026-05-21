import React, { useState } from 'react'
import { BASE_URL } from '../../config'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [aadharCardNumber,setAadharCardNumber] = useState('')
    const [age,setAge] = useState('')
    const navigate = useNavigate()

    const handleSignup = async() =>{
        try{
            const payload ={
                username : username,
                age:age,
                email:email,
                mobile:mobile,
                aadharCardNumber: aadharCardNumber,
                password:password
            }

            const URL = `${BASE_URL}/signup`
            const response = await fetch(URL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body : JSON.stringify(payload)
            })

            if(!response.ok){
                const errorData = await response.json()
                throw new Error(errorData.message || `Error ${response.status}`)
            }
            const res = await response.json()
            toast.success(res.message, {
                    position: "top-right",
                    theme: "colored",
                    });
            if(res){
                navigate('/')
            }
        }catch(err){
            console.error("Login error:", err);
            toast.error(`Login failed! ${err.message}`, {
            position: "top-center",
            theme: "dark",
            });
        }
        
    }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-300">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h1>
        <form className="space-y-4" onSubmit={(e)=>{
            e.preventDefault()
            if(mobile.length > 10){
                toast.error('Enter valid mobile number')
            }


            handleSignup()
        }}>
            <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e)=> setUsername(e.target.value)}
            />
            </div>
            <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e)=> setEmail(e.target.value)}
            />
            </div>
            <div>
            <label className="block text-gray-700 font-medium mb-1">Mobile</label>
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e)=> setMobile(e.target.value)}
                maxLength={10}
            />
            </div>
            <div>
            <label className="block text-gray-700 font-medium mb-1">Age</label>
            <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e)=> setAge(e.target.value)}
            />
            </div>
            <div>
            <label className="block text-gray-700 font-medium mb-1">Aadhar Card Number</label>
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e)=> setAadharCardNumber(e.target.value)}
                maxLength={12}
            />
            </div>
            <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e)=> setPassword(e.target.value)}
            />
            </div>
            <button
            // type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
            Sign Up
            </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 hover:underline font-medium">
            Login here
            </a>
        </p>
        </div>
    </div>
    );

}

export default SignupPage
