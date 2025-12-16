import Home from "@/app/page";
import HomeHeader from "./HomeHeader";
import { Tweet } from "./Tweet";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useTweetFeed } from "../hooks/useTweetFeed";

const HomeForYou = () => {
  const {tweetsData,tweets,size,tweetsSetSize} = useTweetFeed();
  const bottomRef = useRef(null);
  
  
  useEffect(()=>{
    if(!bottomRef.current) return;
    const observer = new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        
        tweetsSetSize((prev) => prev + 1);
      }
    },{threshold : 0});

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  },[tweetsSetSize])
  return (
    <div className="text-white w-full ">
      {tweets?.map((tweet,index)=>{
        return (
        
        <Tweet key={index} tweet={tweet}/>
        
        )
        
      })

      }
      <div ref={bottomRef} className="h-1"></div>
    </div>
  );
}

export default HomeForYou;