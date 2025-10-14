import axios from "axios"
import {  BiHeart } from "react-icons/bi"
import { FiPower, FiCheckCircle, FiAlertCircle} from "react-icons/fi"
import { HiMiniSquares2X2 } from "react-icons/hi2"
import { RiListUnordered } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    toast.info(
      <div className="flex flex-col items-center gap-3 px-6 py-2 ">
        <span className="font-medium text-gray-800 dark:text-white">Do you want to logout?</span>
        <div className="flex gap-6">
          <button
            className="px-7 py-1 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-400"
            onClick={() => {
              toast.dismiss()
              axios.post( 
                  "https://vica.website/api/logout",
                  null,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                      Accept: "application/json",
                    },
                  }
                )
                .then(() => {
                  localStorage.removeItem("token")
                  localStorage.removeItem("user")
                  toast.success(
                    <div className="flex items-center gap-2">
                      <FiCheckCircle size={22} className="text-green-500" />
                      <span>Logged out successfully!</span>
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
                        "bg-white text-green-700 border-b-2 border-green-500 rounded-lg shadow-md font-medium dark:bg-gray-600 dark:text-green-400",
                      closeButton: true,
                    }
                  )
                  navigate("/")
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
            className="px-7 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400
            dark:bg-gray-500  dark:text-white dark:hover:bg-gray-600"
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
        className:"bg-white dark:bg-gray-600"
      }
    )
  }

  const menuItems = [
    { icon: <HiMiniSquares2X2 size={20} />, link:""  ,text: "Product" },
    { icon: <BiHeart size={20} />, link:"/items/favourites", text: "Favourite" },
    { icon: <RiListUnordered size={20} />, link:"/items/order" ,text: "Order List" },
  ]
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col justify-between p-4 z-20 dark:bg-gray-500">
      <div>
        <h1 className="text-2xl font-bold my-6 dark:text-white"><span className="text-blue-500">Dash</span>Stack</h1>
        <ul className="flex flex-col gap-3 md:gap-4">
          {menuItems.map((item, index) => (
            <li 
              key={index}>
                <Link to={item.link}
              className="flex items-center gap-2 md:gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700 dark:text-gray-100 "
            >
              {item.icon}
              <span className="text-sm md:text-base">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex justify-center gap-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors dark:hover:bg-blue-400"
        >
          <FiPower size={22} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar;