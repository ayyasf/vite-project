import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { FiCheckCircle, FiAlertCircle, FiUser } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import Form from "../../components/Form/Form"

const Register = () => {
  const [data, setData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (data.first_name) {
      if (data.password !== data.password_confirmation) {
        toast.error(
          <div className="flex items-center gap-2">
            <FiAlertCircle size={22} className="text-red-500" />
            <span className="dark:text-white">Passwords do not match!</span>
          </div>,
          {
            position: "top-right",
            className:
              "bg-white text-red-600 border-b-2 border-red-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-red-400",
            closeButton: true,
            icon: false,
          }
        )
        return;
      }

      axios.post("https://vica.website/api/register", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(
            <div className="flex items-center gap-2">
              <FiCheckCircle size={22} className="text-green-500" />
              <span>Account created successfully!</span>
            </div>,
            {
              position: "top-right",
              className:
                "bg-white text-green-700 border-b-2 border-green-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-green-500",
              closeButton: true,
              icon: false,
            }
          )
          localStorage.setItem("token", res.data.data.token)
          localStorage.setItem("user", JSON.stringify(res.data.data.user))
          navigate("/items")
        })
        .catch((err) => {
          toast.error(
            <div className="flex items-center gap-2">
              <FiAlertCircle size={22} className="text-red-500" />
              <span>Something went wrong. Please try again.</span>
            </div>,
            {
              position: "top-right",
              className:
                "bg-white text-red-600 border-b-2 border-red-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-red-400",
              closeButton: true,
              icon: false,
              hideProgressBar: false,
            }
          )
          console.error(err.response?.data || err.message);
        })
    }
  }, [data])

  const inputs = [
    { label: "First Name", type: "text", name: "first_name", placeholder: "First Name" },
    { label: "Last Name", type: "text", name: "last_name", placeholder: "Last Name" },
    { label: "User Name", type: "text", name: "user_name", placeholder: "User Name" },
    { label: "Email", type: "email", name: "email", placeholder: "example@gmail.com" },
    { label: "Password", type: "password", name: "password", placeholder: "********" },
    { label: "Confirm Password", type: "password", name: "password_confirmation", placeholder: "********" },
    { label: "Profile Image", type: "file", name: "profile_image" }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-100 p-4 dark:from-gray-700 dark:to-gray-400">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Create an Account
          </h1>
          <p className="text-gray-500 dark:text-gray-200">
            Create an account to continue
          </p>
        </div>
        <Form
          inputs={inputs}
          setData={setData}
          btn="Sign Up"
          fileIcon={FiUser}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        />
        <div className="text-center mt-0.5">
          <p className="text-gray-600 dark:text-gray-200">
            Already have an account?
            <Link to="/" className="text-blue-500 hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register