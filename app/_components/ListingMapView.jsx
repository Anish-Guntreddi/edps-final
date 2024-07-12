"use client"
import { supabase } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Listing from './Listing'

function ListingMapView({type}) {

    const[searchedAddress,setSearchedAddress] = useState([])
    const[listing,setListing] = useState([])
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
            console.log(data)
            setListing(data)
        }

        if(error){
            toast('Server side error')
        }
    }
    const handleSearchclick=async()=> {
        console.log(searchedAddress);
        const searchTerm = searchedAddress?.value?.structured_formatting?.main_text
        const{data, error}= await supabase
        .from('listing')
        .select(`*, listingImages(
            url,
            listing_id
        )`)
        .eq('active', true)
        .eq('type', type)
        .like('address', '%'+searchTerm+'%')
        .order('id',{ascending:false})

        if(data){
            setListing(data);
        }
        
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
            <Listing listing={listing} handleSearchClick={handleSearchclick} searchedAddress={(v)=>setSearchedAddress(v)}/>
        </div>
        <div>
            Map
        </div>
    </div>
  )
}

export default ListingMapView
