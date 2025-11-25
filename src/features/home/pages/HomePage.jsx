
import SideNav from "@/components/SideNav";
import HomeForYou from "../components/HomeForYou";
import ChosenHomeTab from "../components/ChosenHomeTab";
import HomeMiddleTab from "../components/HomeMiddleTab";
import { FormProvider } from "react-hook-form";
import useTweet from "../hooks/useTweet";
import HomeEndTab from "../components/HomeEndTab";
import { useEffect, useRef } from "react";

const HomePage = () =>{
  const methods = useTweet();
  const scrollTopForEndTab = methods.watch("scrollTopForEndTab");
  
  
  return(
    <div  className=" bg-black flex h-screen overflow-hidden ">
      <FormProvider {...methods} >
        <SideNav />
      <div 
      onScroll={(e)=>{
        console.log(e.target.scrollTop);
        methods.setValue("scrollTopForEndTab",e.target.scrollTop);
      }}
      className="flex overflow-y-auto scrollbar-thumb-hover">
        <HomeMiddleTab />
        <HomeEndTab />
      </div>
      
      </FormProvider>
    </div>
  )
}

export default HomePage;