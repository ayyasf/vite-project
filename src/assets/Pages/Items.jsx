import { Outlet } from "react-router-dom"
import Sidebar from "../../components/SideBar/SideBar"
import Navbar from "../../components/NavBar/NavBar"

const Items = () => {
  return(
    <>
    <Sidebar/>
    <Navbar/>
    <main className="min-h-screen ml-64 pt-16 p-4  bg-gray-200 dark:bg-gray-600">
        <Outlet/>
    </main>
    </>
      )
}
export default Items
    