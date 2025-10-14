const Container = ({ children }) => {
    return (
        <div className=" pt-11 px-4  ">
        <div className="flex flex-wrap gap-6 justify-start ">
        {children}
        </div> 
    </div>
    )
}

export default Container
