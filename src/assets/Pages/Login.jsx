import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi"
import Form from "../../components/Form/Form"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()

useEffect(() => {
    if (data.email) {
        axios.post("https://vica.website/api/login", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            console.log(res)
            toast.success(
            <div className="flex items-center gap-2">
                <FiCheckCircle size={22} className="text-green-500" />
                <span> you have been Logged in successfully</span>
            </div>,
            {
                position: "top-right",
                className:
                "bg-white text-green-700 border-b-2 border-green-500 rounded-lg shadow-md font-medium dark:bg-gray-600 drak:text-green-500",
                closeButton: true,
                icon: false,
            }
            )
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.data.user))
            navigate("/items")
        })
        .catch((err) => {
            console.error(err.response?.data || err.message);
            toast.error(
            <div className="flex items-center gap-2">
                <FiAlertCircle size={22} className="text-red-500" />
                <span>Something went wrong. Please try again.</span>
            </div>,
            {
                position: "top-right",
                className:
                "bg-white text-red-600 border-b-2 border-red-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-red-400 ",
                closeButton: true,
                icon: false,
                hideProgressBar : false
            }
            )
        })
    }
    }, [data])

    const inputs = [
    { label: "Email:", type: "email", name: "email", placeholder: "example@gmail.com" },
    { label: "Password:", type: "password", name: "password", placeholder: "********" }
    ]

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-100 p-4 dark:from-gray-500 dark:to-gray-200">
        <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg dark:bg-gray-600">
        <div className="text-center mb-3">
            <h1 className="text-3xl font-bold mb-1 text-gray-800 dark:text-white">Login to Account</h1>
            <p className="text-gray-500  dark:text-gray-50 ">Please enter your email and password to continue</p>
        </div>
        <Form inputs={inputs} setData={setData} btn="Sign In" className="flex flex-col gap-4" />
        <div className="text-center mt-4">
            <p className="text-gray-600  dark:text-gray-50">
            Don't have an account?
            <Link to="/" className="text-blue-500 hover:underline ml-1">
                    Create Account
            </Link>
            </p>
        </div>
        </div>
    </div>
    )
}
export default Login