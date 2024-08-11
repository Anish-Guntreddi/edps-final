import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

function Slider({ imageList }) {
  console.log(imageList)
  return (
    <div className='mt-100'>
      {imageList ? (
        <Carousel>
          <CarouselContent>
            {imageList.map((item, index) => (
              <CarouselItem key={index}>
                <Image
                  src={item.url}
                  width={2000}
                  height={1500}
                  alt="image"
                  className='rounded-xl object-cover h-[400px] xl:h-[1100px]'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className='h-[200px] bg-slate-200 animate-pulse rounded-lg'></div>
      )}
    </div>
  )
}

export default Slider
