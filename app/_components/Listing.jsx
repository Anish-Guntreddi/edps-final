import { Button } from '@/components/ui/button'
import { Bath, BedDouble, MapPin, Ruler, Search } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import FilterSection from './FilterSection'
import GoogleAddressSearch from './GoogleAddressSearch'

function Listing({listing, handleSearchClick, searchedAddress, setBathCount, setBedCount, setParkingCount, setHomeType, setCoordinates}) {
    const[address, setAddress] = useState([]);
  return (
    <div>
        <div className='p-3 flex gap-6'>
        <GoogleAddressSearch selectedAddress={(v)=> {searchedAddress(v); setAddress(v)}} setCoordinates={setCoordinates}/>
        <Button onClick={handleSearchClick} className="flex gap-2"><Search className='h-4 w-4'/>Search</Button>
        </div>
        <FilterSection setBathCount={setBathCount} setBedCount={setBedCount} setParkingCount={setParkingCount} setHomeType={setHomeType}/>
        {address&&<div className='px-3'>
            <h2 className='text-lg'>
                 Found <span className='font-bold'>{listing.length}</span> Result in <span className='text-primary font-bold'>{address.label}</span></h2>
            
        </div>}
        <div className='grid grid-cols-1 md:grid grid-cols-2 gap-5'>
            {listing?.length>0? listing.map((item, index) => (
                <div className='p-3 hover:border hover:border-primary cursor-pointer rounded-lg'>
                    <Image src={item.listingImages[0].url} width={800} height={150}
                    className="rounded-lg object-cover h-[170px]" alt=""/>
                    <div className='flex mt-2 flex-col gap-2'>
                        <h2 className='font-bold text-xl'>${item.price}</h2>
                        <h2 className='flex gap-2 text-sm text-gray-400'><MapPin className='h-5 w-5'/>{item.address}</h2>
                        <h2 className='flex gap-2 w-full text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center'>
                        <BedDouble className='h-5 w-5'/>
                        {item?.bedroom}
                    </h2>

                    <h2 className='flex gap-2 w-full text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center'>
                        <Bath className='h-5 w-5'/>
                        {item?.bathroom}
                    </h2>

                    <h2 className='flex gap-2 w-full text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center'>
                        <Ruler className='h-5 w-5'/>
                        {item?.area}
                    </h2>
                    </div>

                </div>
            ))
        :[1,2,3,4,5,6,7,8].map((item, index) => (
            <div key={index} className='h-[230px] w-full bg-slate-200 animate-pulse'>

            </div>
        ))
        }
        </div>
    </div>
  )
}

export default Listing
