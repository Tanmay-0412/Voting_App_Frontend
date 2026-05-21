import { useState } from 'react'
import { toast } from "react-toastify";
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
    try {
        const payload = {
        username: username,
        password: password,
        };

        const URL = `${BASE_URL}/login`;
        const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        });

        // Check if response is not OK (e.g., 400, 401, 500)
        if (!response.ok) {
        const errorData = await response.json(); // backend error message
        throw new Error(errorData.message || `Error ${response.status}`);
        }

        const res = await response.json();
        console.log(res)
        toast.success(res.message, {
        position: "top-right",
        theme: "colored",
        });
        localStorage.setItem("Role",res.data.role)

        if(res){
            navigate('/home')
        }
    } catch (err) {
        console.error("Login error:", err);
        toast.error(`Login failed! ${err.message}`, {
        position: "top-center",
        theme: "dark",
        });
    }
    };



  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-300">
            <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h1>
            <form className="space-y-4" onSubmit={(e)=>{
                e.preventDefault()
                handleLogin()
            }}>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Username</label>
                <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Role</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>User</option>
                <option>Admin</option>
                </select>
            </div>
            <button
                // type='submit'
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Login
            </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
                Do not have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline font-medium">
                Register yourself
                </a>
            </p>
        </div>
        </div>
        
        </>
    );

}

export default LoginPage
