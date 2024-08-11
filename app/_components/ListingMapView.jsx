"use client"
import { supabase } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import GoogleMapSection from './GoogleMapSection'
import Listing from './Listing'

function ListingMapView({type}) {

    const[searchedAddress,setSearchedAddress] = useState([])
    const[listing,setListing] = useState([])
    const[bedCount, setBedCount] = useState(0);
    const[bathCount, setBathCount] = useState(0);
    const[parkingCount, setParkingCount] = useState(0);
    const[homeType, setHomeType] = useState()
    const[coordinates,setCoordinates] = useState()


    useEffect(()=> {
        getLatestListing()
    }, [])

    const getLatestListing=async()=>{
        const{data, error}= await supabase
        .from('listing')
        .select(`*, listingImages(
            url,
            listing_id
        )`)
        .eq('active', true)
        .eq('type', type)
        .order('id',{ascending:false})
        if(data){
            setListing(data)
        }

        if(error){
            toast('Server side error')
        }
    }
    const handleSearchclick=async()=> {
        const searchTerm = searchedAddress?.value?.structured_formatting?.main_text
        let query = supabase
        .from('listing')
        .select(`*, listingImages(
            url,
            listing_id
        )`)
        .eq('active', true)
        .eq('type', type)
        .gte('bedroom', bedCount)
        .gte('bathroom', bathCount)
        .gte('parking', parkingCount)
        .like('address', '%'+searchTerm+'%')
        .order('id',{ascending:false})

        if(homeType){
            query = query.eq('propertyType', homeType)
        }

        const{data, error}= await query
        if(data){
            setListing(data);
        }
        
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
            <Listing listing={listing} handleSearchClick={handleSearchclick} searchedAddress={(v)=>setSearchedAddress(v)} setBathCount={setBathCount} setBedCount={setBedCount} setParkingCount={setParkingCount} setHomeType={setHomeType} setCoordinates={setCoordinates}/>
        </div>
        <div className='fixed right-10 md:w-[400px] lg:[500px] xl:w-[650px]'>
            <GoogleMapSection listing={listing} coordinates={coordinates}/>
        </div>
    </div>
  )
}

export default ListingMapView
