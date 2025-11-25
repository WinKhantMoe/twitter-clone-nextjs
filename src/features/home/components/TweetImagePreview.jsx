import { Carousel, CarouselContent, CarouselItem, CarouselPrevious,CarouselNext } from "@/components/ui/carousel"
import { set } from "idb-keyval";
import { XIcon } from "lucide-react";
import { useEffect, useState,useRef } from "react";
import { useFormContext } from "react-hook-form"
import { FaXing } from "react-icons/fa";


export const TweetImagePreview = () =>{
  const {getValues,setValue,watch } = useFormContext();
  const urls = getValues("mediaURL");
  const media = getValues("media");
  const halfPastVH = watch("halfPastVH");
  const targetRef = useRef(null);
  

  const count = urls.length;
  
  const decideCarouselSlide = () =>{
    if( count === 1) return "basis-full";
    if( count === 2) return "basis-1/2";
    
    return "basis-auto"
  }
  const takeOutImageURL = (index) =>{
    const newURL = urls.filter((url) => index !== urls.indexOf(url));
    const newMedia = media.filter((url) => index !== media.indexOf(url));
    
    setValue("mediaURL",newURL);
    setValue("media",newMedia);
  }
  useEffect(() => {
    if (!targetRef.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      
        setValue("halfPastVH",entry.isIntersecting);
        
      
    }, {threshold: 1});
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  },[]);
  
  return(
    <div ref={targetRef}>
    <Carousel 
    
    opts = {{
      draggable: false
    }}
    className={"mt-5 relative"}>
      <CarouselContent
        
        className={"snap-x snap-mandatory"}
        onDragStart = {(e)=> e.preventDefault()}
      >
        {urls?.map((url,index) => (
          <CarouselItem key={index} className={`${decideCarouselSlide()} snap-start ${decideCarouselSlide() === "basis-auto" && "w-1/2"}`}>
            <div className="relative">
              <img src={url} alt="" className={`h-70 object-cover w-full  rounded-lg`}/>
              <XIcon onClick={() => takeOutImageURL(index)} className="absolute top-2 right-2 size-8 text-white bg-black p-2 rounded-full cursor-pointer"/>
            </div>
            
          </CarouselItem>
        ))

        }
      </CarouselContent>
      <CarouselPrevious className={`absolute left-3 disabled:hidden hover:text-white hover:bg-zinc-800 bg-black border-black`}/>
      <CarouselNext className={`absolute right-3 disabled:hidden hover:text-white hover:bg-zinc-800 bg-black border-black`}/>
    </Carousel>
    </div>
  )
}