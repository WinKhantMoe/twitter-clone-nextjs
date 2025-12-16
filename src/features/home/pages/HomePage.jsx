
import SideNav from "../components/SideNav";
import HomeForYou from "../components/HomeForYou";
import ChosenHomeTab from "../components/ChosenHomeTab";
import HomeMiddleTab from "../components/HomeMiddleTab";
import { FormProvider } from "react-hook-form";
import { useTweetForm } from "../hooks/useTweetForm";
import HomeEndTab from "../components/HomeEndTab";
import { useEffect, useRef } from "react";
import useAccountStore from "@/stores/useAccountStore";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import useTweetComposeOpen from "@/stores/useTweetComposeOpen";
import useDraftOpen from "@/stores/useDraftOpen";
import HomeHeader from "../components/HomeHeader";

const HomePage = () =>{
  const methods = useTweetForm();
  
  const {token} = useAccountStore();
  const { isOpen, setIsOpen } = useTweetComposeOpen();
  const {isOpen:draftOpen,setIsOpen:draftSetIsOpen} = useDraftOpen();
  

  
  
  if(token === undefined | null){
    redirect("/");
  }
  
  return(
    <div  className=" bg-black flex h-screen overflow-hidden ">
      <FormProvider {...methods} >
        <SideNav />
      <div className="flex overflow-y-auto scrollbar-thumb-hover">
        
        <HomeMiddleTab />
        <HomeEndTab />
      </div>
      {
        isOpen && <div className="bg-white opacity-40 absolute w-full h-full z-20"></div>
      }
      
      
      </FormProvider>
    </div>
  )
}

export default HomePage;