import { LogIn } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

function FileUpload({setImages, imageList}) {
    const [imagePreview, setImagePreview] = useState([]);
    const handleFileUpload=(event)=>{
        const files = event.target.files;
        console.log(files);
        setImages(files)
        const previews = Array.from(files).map((file)=>URL.createObjectURL(file));
        setImagePreview(previews)
    }
  return (
    <div>
    <label htmlFor="uploadFile1"
      className="bg-white text-gray-500 font-semibold text-base rounded w-100 h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 64 100">
        <path
          d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
          data-original="#000000" />
        <path
          d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
          data-original="#000000" />
      </svg>
      Upload file

      <input type="file" id='uploadFile1' className="hidden" multiple onChange={handleFileUpload} accept="image/png, image/gif, image/jpeg, image/svg"/>
      <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
    </label>
    <div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-3'>
        {imagePreview.map((image,index)=> (
            <div>
                <Image src={image} width={500} height={500} className='rounded-lg object-cover h-[100px] w-[100px]' alt={index}/>
            </div>
        ))}
    </div>


    {imageList&&
    <div className='grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-3'>
        {imageList.map((image,index)=> (
            <div>
                <Image src={image?.url} width={500} height={500} className='rounded-lg object-cover h-[100px] w-[100px]' alt={index}/>
            </div>
        ))}
    </div>}

    </div>
  )
}

export default FileUpload
