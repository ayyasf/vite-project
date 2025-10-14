import { useRef, useState } from "react"

const Form = ({ inputs, setData, btn, fileIcon: FileIcon }) => {
  const formDataRef = useRef({});
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const sentData = (e) => {
    e.preventDefault();
    setData(formDataRef.current)
  }

  const handleChange = (e, input) => {
    if (input.type === "file") {
      const file = e.target.files[0]
      formDataRef.current[input.name] = file
      if (file && file.type.startsWith("image")) setImagePreview(URL.createObjectURL(file))
    } else {
      formDataRef.current[input.name] = e.target.value
    }
  }

  const handleFileSelect = () => fileInputRef.current.click()
  const fileInput = inputs.find(i => i.type === "file")
  const textInputs = inputs.filter(i => i.type !== "file")

  return (
    <form onSubmit={sentData} className="w-full p-4 md:p-6 bg-transparent rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {textInputs.map((input, idx) => (
          <div key={idx} className="flex flex-col">
            {input.label && <label className="mb-1 text-gray-700 dark:text-white">{input.label}</label>}
            <input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              defaultValue={input.value}
              onChange={(e) => handleChange(e, input)}
              required
              className="border p-2 rounded-md dark:bg-gray-200 dark:border-gray-600"
            />
          </div>
        ))}
      </div>
      {fileInput && (
        <div className="mb-4 flex flex-col items-start">
          {fileInput.label && <label className="mb-1 text-gray-700 dark:text-white">{fileInput.label}</label>}
          <div
            onClick={handleFileSelect}
            className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-blue-400 rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-800 transition-all duration-200 overflow-hidden"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
              ) : fileInput.preview? (
              <img src={fileInput.preview} alt="old" className="w-full h-full object-cover rounded-xl" />
            ): FileIcon ? (
              <FileIcon className="text-3xl text-blue-500" />
            ) : (
              <span className="text-gray-400 text-sm">Select</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            name={fileInput.name}
            ref={fileInputRef}
            onChange={(e) => handleChange(e, fileInput)}
            className="hidden"
          />
        </div>
      )}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-7 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {btn}
        </button>
      </div>
    </form>
  )
}

export default Form