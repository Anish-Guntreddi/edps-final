"use client"
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Formik } from 'formik'
import { usePathname } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import FileUpload from '../_components/FileUpload'
import { Loader } from 'lucide-react'
  

function EditListing({params}) {
    const {user} = useUser();
    const router = useRouter()
    const [listing,setListing] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() =>{
        if(user){
            verifyUser()
        }
    },[user]);

    const verifyUser=async()=>{
        const {data, error}= await supabase
        .from('listing')
        .select('*, listingImages(listing_id,url)')
        .eq('createdBy', user?.primaryEmailAddress.emailAddress)
        .eq("id", params.id)

        if(data){
            console.log(data);
            setListing(data[0])
            if(data.length <= 0){
                router.replace('/');
            }
        }
    }

    const onSubmitHandler = async(formValue)=>{
        setLoading(true);

        const { data, error } = await supabase
        .from('listing')
        .update(formValue)
        .eq('id', params.id)
        .select();

        if(data){
            console.log(data);
            toast("Listing updated and Published")
        }
        for(const image of images){
            const file = image;
            const fileName = Date.now().toString()
            const fileExt = fileName.split('.').pop();
            const {data, error} = await supabase.storage
            .from('listingImages')
            .upload(`${fileName}`, file, {
                contentType:`image/${fileExt}`,
                upsert:false,
            });

            if(error){
                setLoading(false)
                toast('Error while uploading images')
            }
            else{
                const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL+fileName;
                const {data, error} = await supabase
                .from('listingImages')
                .insert([
                    {url:imageUrl, listing_id:params?.id}
                ])
                .select();
                if(error){
                    setLoading(false)
                }
            }
            setLoading(false);
        }
        
    }

  return (
    <div className='px-10 md:px-20 myy-10'>
      <h2 className='font-bold text-2xl'>Enter some more details about your listing</h2>
    <Formik initialValues={{
        type:'',
        propertyType:'',
        profileImage:user?.imageUrl,
        fullName:user?.fullName,
    }}
    onSubmit={(values) =>{
        console.log(values);
        onSubmitHandler(values);
    }}
    >
        {({
            values,
            handleChange,
            handleSubmit
        })=>(
            <form onSubmit={handleSubmit}>
    <div className='p-8 rounded-lg shadow-md'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-lg text-slate-500'>Rent or Sell?</h2>
                <RadioGroup defaultValue={listing?.type?listing?.type:"Sell"} onValueChange={(v) => values.type = v}>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="Rent" id="Rent" />
                <Label htmlFor="Rent">Rent</Label>
                </div>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="Sell" id="Sell" />
                <Label htmlFor="Sell">Sell</Label>
                </div>
                </RadioGroup>



            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-lg text-slate-500'>Property Type</h2>
            <Select onValueChange={(e) => values.propertyType=e} name="propertyType" defaultValue={listing?.propertyType}>
        <SelectTrigger className="w-[180px] font-bold">
        <SelectValue placeholder={listing?.propertyType?listing?.propertyType:"Select Property Value"}/>
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="Single Family House">Single Family House</SelectItem>
        <SelectItem value="Town House">Town House</SelectItem>
        <SelectItem value="Condo">Condo</SelectItem>
        </SelectContent>
        </Select>

            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='flex gap-2 flex-col mt-5'>
                <h2 className='text-gray-500'>Bedroom</h2>
                <Input placeholder="Ex.2" name="bedroom" onChange={handleChange} defaultValue={listing?.bedroom}/>
            </div>
            <div className='flex gap-2 flex-col mt-5'>
                <h2 className='text-gray-500'>Bathroom</h2>
                <Input placeholder="Ex.2" name="bathroom" onChange={handleChange} defaultValue={listing?.bathroom}/>
            </div>
            <div className='flex gap-2 flex-col mt-5'>
                <h2 className='text-gray-500'>Built in</h2>
                <Input placeholder="Year built" name="builtin" onChange={handleChange} defaultValue={listing?.builtin}/>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='flex gap-2 flex-col mt-5'>
                <h2 className='text-gray-500'>Parking</h2>
                <Input placeholder="Ex.2" name="parking" onChange={handleChange} defaultValue={listing?.parking}/>
            </div>
            <div className='flex gap-2 flex-col mt-5'>
                <h2 className='text-gray-500'>Lot Size(Sq.Ft)</h2>
                <Input placeholder="" name="lotSize" onChange={handleChange} defaultValue={listing?.lotSize}/>
            </div>
            <div className='flex gap-2 flex-col mt-5'>
                <h2 className='text-gray-500'>Area(Sq.ft)</h2>
                <Input placeholder="Ex.1900 sq.ft" name="area" onChange={handleChange} defaultValue={listing?.area}/>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='flex gap-2 flex-col mt-5'>
                <h2 className='text-gray-500'>Selling Price</h2>
                <Input placeholder="$40000" name="price" onChange={handleChange} defaultValue={listing?.price}/>
            </div>
            <div className='flex gap-2 flex-col mt-5'>
                <h2 className='text-gray-500'>HOA Fees</h2>
                <Input placeholder="Ex.2" min="0" name="hoa" onChange={handleChange} defaultValue={listing?.hoa}/>
            </div>
        </div>
        
            <div className='grid grid-cols-1 gap-10 mt-5'>
                <div className='flex gap-2 flex-col'>
                    <h2 className='text-gray-500'>Description</h2>
                    <Textarea placeholder="Write a small description about the house" name="description" onChange={handleChange}/>
                </div>
            </div>
            <div className='mt-10'>
                <h2 className='font-lg text-gray-500 my-3'>Upload Property Images</h2>
                <FileUpload 
                className='w-500 h-500' setImages={(value)=>setImages(value)} imageList={listing?.listingImages}/>
            </div>
        <div className='flex gap-7 justify-end mt-5'>
        <Button className="text-purple-500 border-primary" variant="outline">Save</Button>
        <Button disabled={loading} className="text-white font-semibold bg-primary" variant="outline">{loading?<Loader className=''/>:'Save and Publish'}</Button>
    </div>

    </div>
    </form>)}
    </Formik> 
    
    </div>
  )
}

export default EditListing
