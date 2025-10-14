import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { FiCheckCircle, FiAlertCircle, FiCamera } from "react-icons/fi"
import Form from "../../components/Form/Form"
import { useNavigate } from "react-router-dom"
import Container from "../../components/Container/Container"

const AddItem = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
    if (data.name) {
        axios.post("https://vica.website/api/items", data, {
            headers: {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" : "Bearer "   + localStorage.getItem("token") 
                }
        })
        .then((res) => {
            console.log(res)
            toast.success(
            <div className="flex items-center gap-2">
                <FiCheckCircle size={22} className="text-green-500" />
                <span>item Added successfully</span>
            </div>,
            {
                position: "top-right",
                className:
                "bg-white text-green-700 border-b-2 border-green-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-green-500",
                closeButton: true,
                icon: false,
            })
            navigate("/items")
        })
        .catch((err) => {
            console.error(err.response?.data || err.message)
            toast.error(
            <div className="flex items-center gap-2">
                <FiAlertCircle size={22} className="text-red-500" />
                <span>Something went wrong. Please try again.</span>
            </div>,
            {
                position: "top-right",
                className:
                "bg-white text-red-600 border-b-2 border-red-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-red-500",
                closeButton: true,
                icon: false,
            }
            )
        })
    }
    }, [data])

    const inputs = [
    { label: "Product name:", type: "text", name: "name", placeholder: "Product New" },
    { label: "Product Image", type: "file", name: "image" },
    { label: "Product Price:", type: "text", name: "price", placeholder: "Product price" },
    ]

    return (
        <Container>
            <div className=" max-w-4xl w-full max-auto  p-8 ">
            <div className="w-full max-w-5xl p-8  bg-gray-200 dark:bg-gray-600 ">
            <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">Create Product</h1>
            <Form inputs={inputs} setData={setData}  fileIcon={FiCamera}btn="Create" className= "bg-gray-200"/>
        </div>
    </div>
    </Container>
    )
}
export default AddItem