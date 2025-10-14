import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Container from "../../components/Container/Container"
import Form from "../../components/Form/Form"
import { toast } from "react-toastify"
import { FiAlertCircle, FiCamera, FiCheckCircle } from "react-icons/fi"


const EditItem = () => {
    const params = useParams()
    const [item, setItem] = useState({})
    const [data, setData] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`https://vica.website/api/items/${params.id}` , {
            headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token") 
            }
        })
        .then(res  => setItem(res.data))
        .catch(err => console.log(err))
    },[])
    useEffect(()=>{
            axios.post(`https://vica.website/api/items/${params.id}`,{
            name : data.name ? data.name : item.name,
            price: data.price ? data.price : item.price,
            image: data.image,
            _method:"PUT"
            }, {
            headers: {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" : "Bearer "   + localStorage.getItem("token") 
            }
        })
        .then(res  =>{ 
            console.log(res)
            toast.success(
            <div className="flex items-center gap-2">
                <FiCheckCircle size={22} className="text-green-500" />
                <span>item updated successfully</span>
                </div>,
                {
                    position: "top-right",
                    className:
                    "bg-white text-green-700 border-b-2 border-green-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-green-400 ",
                    closeButton: true,
                    icon: false,
                }
                )
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
                    "bg-white text-red-600 border-b-2 border-red-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-red-400",
                    closeButton: true,
                    icon: false,
                    }
                    )
                })
    },[data])
    const inputs = [
    { label: "Product name:", type: "text", name: "name", placeholder: "Product New", value: item.name },
    { label: "Product Image", type: "file", name: "image" , preview: item.image },
    { label: "Product Price:", type: "text", name: "price", placeholder: "Product price", value: item.price }
    ]
    return (
        <Container>
            <div className=" max-w-4xl w-full max-auto    p-8 ">
                <div className="w-full max-w-5xl p-7   bg-gray-200 dark:bg-gray-600">
                <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">Edit Product</h1>
            <Form inputs={inputs} setData={setData}  fileIcon={FiCamera} btn="Edit" className="grid grid-cols-2  gap-4" />
        </div>
    </div>
    </Container>
    )
}

export default EditItem
