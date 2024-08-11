import { Button } from '@/components/ui/button'
import { Bath, BedDouble, MapPin, Ruler, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function MarkerListingItem({item, closeHandler}) {
  return (
    <div>
      <div className='cursor-pointer rounded-lg w-[180px]'>
        <X onClick={() => closeHandler()}/> 
                    <Image src={item.listingImages[0].url} width={800} height={150}
                    className="rounded-lg object-cover h-[120px] w-[150px]" alt=""/>
                    <div className='flex mt-2 flex-col gap-2 bg-white'>
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
                    </div>
                    <Link href={"/view-listing/"+item.id} className="w-full"><Button className='w-[180px]'>View Details</Button></Link>
                </div>
    </div>
  )
}

export default MarkerListingItem
