import GoogleMapSection from '@/app/_components/GoogleMapSection'
import { Button } from '@/components/ui/button'
import { BathIcon, Bed, BedDouble, BedIcon, CarIcon, Drill, Home, LandPlot, MapPin, ParkingCircle, Share} from 'lucide-react'
import React from 'react'
import AgentDetails from './AgentDetails'

function Details({listingDetail}) {
  return listingDetail&&(
    <div className="my-6 flex gap-2 flex-col">
        <div className='flex justify-between items-center'>
            <div>
                <h2 className='font-bold text-3xl'>$ {listingDetail?.price}</h2>
                <h2 className='text-gray-500 text-lg flex gap-2'>
                    <MapPin/>
                    {listingDetail?.address}
                </h2>
            </div>
            <Button className="flex gap-2"><Share/>Share</Button>
        </div>
        <hr></hr>
        <div className='mt-4 flex flex-col gap-5'>
            <h2 className='font-bold text-2xl'>Key Features</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                <Home/>
                {listingDetail.propertyType}
            </h2>

            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                <Drill/>
                Built in {listingDetail.builtin}
            </h2>

            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                <LandPlot/>
                {listingDetail.area} Sq Feet
            </h2>
            
            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                <BedDouble/>
                {listingDetail.bedroom} Bed
            </h2>

            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                <BathIcon/>
                {listingDetail.bathroom} Bath
            </h2>

            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                <ParkingCircle/>
                {listingDetail.parking} Parking Spaces
            </h2>
            </div>
        </div>
        <div className='mt-4 flex flex-col gap-5'>
        <h2 className='font-bold text-2xl'>House Description</h2>
        <p>{listingDetail.description}</p>
        </div>

        <div>
            <h2 className='font-bold text-2xl'>Find on Map</h2> 
            <GoogleMapSection coordinates={listingDetail.coordinates} listing={[listingDetail]} />  
        </div>
        <div>
            <h2 className='font-bold text-2xl my-5'>Contact Information</h2>
            <AgentDetails listingDetail={listingDetail}/>
        </div>
    </div>
  )
}

export default Details
