import React from 'react'
import locationIcon from '../images/locationIcon.png'
const imagePath = locationIcon.src;
export default function SearchContainer() {

    



    function attractionSearch(){
        return(
                <div className=' w-full h-full relative'>

            <div className='w-full bg-white rounded drop-shadow-md flex items-center gap-2  pl-5 h-[70px] justify-between absolute left-0 bottom-0 translate-y-[50%]' >
                
                <div className='flex items-center gap-3 '>

                <img src={imagePath} alt="" />
                <div className='flex flex-col'>

                    <input 
                    className='focus:outline-none'
                    placeholder='Location'
                    type="text" />
                    <h6 className='text-blue-400 text-sm w-full'>Where do you want to go?</h6>
                </div>
                </div>

                <button className='h-full px-10  rounded bg-blue-500 flex items-center text-white justify-center'>
                SEARCH
                </button>
                
            </div>
            
                </div>
        )
    }
  return (
    <div className='padding w-full h-[200px] bg-blue-200  items-center flex '>
      
    
{attractionSearch()}
    </div>
  )
}
