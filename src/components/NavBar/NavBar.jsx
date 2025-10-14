import { useContext } from "react"
import { BiSearch, BiMoon} from "react-icons/bi"
import { SearchContext} from "../../App"
import { GrSun } from "react-icons/gr"


const Navbar = () => {
  const{searchValue , setSearchValue , theme , setTheme}  = useContext(SearchContext)
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <nav className="fixed top-0 left-[250px] right-0 h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6 z-10
    dark:bg-gray-500  ">
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search a Product..."
            value={searchValue}
            onChange={(e) =>{
              setSearchValue(e.target.value)
            }}
            className="pl-10 px-8 py-1  border rounded-4xl focus:outline-none  focus:ring-blue-400 focus:ring-2
            dark:bg-gray-600 dark:text-white"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white"  size={20} />
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4 ml-4">
        {user && (
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src={user.profile_image_url}
              alt="profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-800  dark:text-white">{user.first_name}</span>
              <span className="text-gray-500 text-xs dark:text-white">{user.user_name}</span>
            </div>
          </div>
        )}
        <button onClick={()=>setTheme(!theme)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-400 transition-colors dark:text-white"> 
          {theme ?<GrSun size={33}/> : <BiMoon size={33}/>  }
        </button> 
      </div>
    </nav>
  )
}

export default Navbar