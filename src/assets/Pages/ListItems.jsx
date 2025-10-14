import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Container from "../../components/Container/Container"
import Card from "../../components/Card/Card"
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi"
import { IoAddCircle } from "react-icons/io5"
import { Link } from "react-router-dom"
import { SearchContext } from "../../App"

const ListItems = () => {
    const [items, setItem] = useState([])
    const [deletedId, setDeletedId] = useState(0)
    const  { searchValue} = useContext(SearchContext)
    useEffect(() => {
        axios.get("https://vica.website/api/items", {
            headers: { 
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json"
                }
        })
        .then((res) => {
            setItem(res.data)
            console.log(res)
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
                "bg-white text-red-600 border-b-2 border-red-500 rounded-lg shadow-md font-medium dark:bg-gray-500  dark:text-red-400 ",
                closeButton: true,
                icon: false,
            }
            )
        })
    },[deletedId])

    const filteredItems = searchValue ? items.filter((item) => 
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    ) : items

    return(
    <Container>
        <div className="w-full  flex justify-between items-center pt-2 ">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">All Products</h1>
            <Link to="/items/add"
            className="flex  items-center gap-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors  dark:hover:border-blue-400"
                >
            <IoAddCircle size={22} />
                    Create Product
                </Link>
        </div>
        {filteredItems.length > 0 ?(
                filteredItems.map((item, index) => (
            <Card item={item} key={index} setDeletedId={setDeletedId} />
            ))
        ) : (
            <p className="text-gray-500 col-span-full text-center mt-10 dark:text-gray-300">
            {searchValue
                ? "No matching products found."
                : "No products available yet."}
            </p>
            )}
    </Container>
        )
}
export default ListItems
    