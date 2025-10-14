import { Link, useNavigate } from "react-router-dom"
import { FiAlertCircle, FiCheckCircle, FiTrash2 } from "react-icons/fi"
import axios from "axios"
import { toast } from "react-toastify"

const Card = ({ item , setDeletedId }) => {
    const navigate = useNavigate()
    const deleteItem =(id)=> {
        toast.info(
        <div className="flex flex-col items-center gap-3 px-6 py-2 ">
            <span className="font-medium text-gray-800 dark:text-white">Do you sure to delete this product?</span>
            <div className="flex gap-6">
            <button
            className="px-7 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {
                toast.dismiss()
                axios.delete(`https://vica.website/api/items/${id}`,
                    {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        Accept: "application/json",
                    },
                    }
                )
                .then(() => {
                    toast.success(
                    <div className="flex items-center gap-2">
                        <FiCheckCircle size={22} className="text-green-500" />
                        <span>Product deleted successfully!</span>
                    </div>,
                    {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        icon: false,
                        className:
                        "bg-white text-green-700 border-b-2 border-green-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-green-500",
                        closeButton: true,
                    }
                    )
                    setDeletedId(id)
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
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        icon: false,
                        className:
                        "bg-white text-red-600 border-b-2 border-red-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-red-400",
                        closeButton: true,
                    }
                    )
                })
            }}
            >
            Yes
        </button>
        <button
            className="px-7 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => toast.dismiss()}
        >
            No
        </button>
        </div>
    </div>,
        {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            className:"bg-white dark:bg-gray-600  "
    }
    )}
    return (
        <div className= " w-64 bg-white rounded-lg shadow-md duration-300 p-6 flex flex-col  dark:bg-gray-500 ">
        <img
        src={item.image_url}
        alt={item.name}
        className="w-40 h-40 object-cover rounded-md mb-2"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-1 dark:text-white">{item.name}</h2>
        <p className="text-sm text-blue-500 mb-3">${item.price}</p>
        <div className="flex justify-between">
        <Link
            to={`/items/edit/${item.id}`}
            className="bg-gray-400  text-white px-3 py-1 rounded-md hover:bg-gray-600 dark:bg-gray-600  dark:hover:bg-gray-400  transition-colors"
        >
            edit Product 
        </Link>
        <button
            onClick={()=>deleteItem(item.id)}
            className=" text-gray-800"
        >
            <FiTrash2 size={22}  className ="dark:text-white"  />
        </button>
        </div>
    </div>
    )
}

export default Card
