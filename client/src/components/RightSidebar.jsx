import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({ selectedUser }) => {
  return selectedUser && (
    <div className={`bg-[#8185b2]/10 text-white w-full relative overflow-y-auto no-scrollbar flex flex-col px-4 pb-6 ${selectedUser ? "max-md:hidden" : ""}`}>

      {/* Profile Section */}
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 aspect-[1/1] rounded-full' />
        <h1 className='px-10 text-xl font-medium flex items-center gap-2'>
          {selectedUser.fullName}
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
        </h1>
        <p className='px-10 text-center'>{selectedUser.bio}</p>
      </div>

      {/* Media Section */}
      <hr className='border-[#ffffff50] my-4' />
      <p className='text-center text-sm mb-2'>Media</p>
      <div className='max-h-[200px] grid grid-cols-2 gap-4 opacity-80'>
        {imagesDummyData.map((url, index) => (
          <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'>
            <img src={url} alt="" className='w-full h-full object-cover rounded-md' />
          </div>
        ))}
      </div>

      {/* Push button to bottom */}
      <div className='mt-auto pt-6 flex justify-center'>
        <button className='bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-8 rounded-full cursor-pointer'>
          Logout
        </button>
      </div>

    </div>
  )
}

export default RightSidebar
