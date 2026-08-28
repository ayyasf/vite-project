import { Route, Routes } from "react-router-dom"
import Register from "./assets/Pages/Register"
import Items from "./assets/Pages/Items"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Login from "./assets/Pages/Login"
import ListItems from "./assets/Pages/ListItems"
import AddItem from "./assets/Pages/AddItem"
import EditItem from "./assets/Pages/EditItem"
import { createContext, useState } from "react"
import Favourites from "./assets/Pages/Favourites"
import Orders from "./assets/Pages/Orders"

export const SearchContext = createContext()
function App() {
  const [theme, setTheme]  = useState(false)
  const [searchValue, setSearchValue] = useState("")
  return (
    <SearchContext.Provider value={{searchValue , setSearchValue , theme, setTheme}}>
        <div className={`font-inter ${theme? "dark":"" }`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/items" element={<Items />} >
            <Route path="/items/favourites" element={<Favourites />} />
            <Route path="/items/order" element={<Orders />} />
            <Route path="" element={<ListItems />} />
            <Route path="add" element={<AddItem />} />
            <Route path="edit/:id" element={<EditItem />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="auto"
      />
      </div>
    </SearchContext.Provider>
  )
}

export default App