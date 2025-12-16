import useTweetComposeOpen from "@/stores/useTweetComposeOpen";
import useAccountStore from "@/stores/useAccountStore";
import { useSingleTweetForm } from "../hooks/useSingleTweetForm";
import { ChosenTweet } from "../components/ChosenTweet";
import SideNav from "@/features/home/components/SideNav";
import HomeEndTab from "@/features/home/components/HomeEndTab";
import { FormProvider } from "react-hook-form";

const TweetPage = () =>{
  const methods = useSingleTweetForm();
  
  const {token} = useAccountStore();
  const { isOpen, setIsOpen } = useTweetComposeOpen();

  if(token === undefined | null){
    redirect("/");
  }
  
  return(
    <div  className=" bg-black flex min-h-screen ">
      <FormProvider {...methods} >
       
        <SideNav />
        
      <div className="flex flex-1 overflow-y-auto h-full scrollbar-thumb-hover">
        <ChosenTweet />
        <HomeEndTab />
      </div>
      {
        isOpen && <div className="bg-white opacity-40 absolute w-full h-full z-20"></div>
      }
      
      
      </FormProvider>
    </div>
  )
}

export default TweetPage;