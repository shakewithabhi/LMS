import {React,useState} from 'react'
import { assets } from '../../assets/assets'
import {useNavigate} from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate = useNavigate();
  const [Input,setInput] = useState(data? data : "");
  const onSearchHandler = (e) =>{
    e.preventDefault()
    navigate('/course-list/'+ Input)
  }

  return (
      <form onSubmit={onSearchHandler} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'>
        <img src={assets.search_icon} alt="" className='md:w-auto w-10 px-3' />
        <input onChange={e => setInput(e.target.value)}  value={Input}
         type="text" placeholder='Search the courses' className='w-full h-full outline-none text-gray-500/80' />
        <button type="submit" className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>
      </form>

  )
}

export default SearchBar
