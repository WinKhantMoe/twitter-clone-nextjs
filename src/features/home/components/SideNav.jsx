"use client";
import Image from "next/image";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaEllipsisH,
  FaRegCircle,
  FaFeatherAlt,
  FaPlus,
} from "react-icons/fa";
import useAccountStore from "@/stores/useAccountStore";
import { base64ToFile } from "@/services/image";
import useTweetComposeOpen from "@/stores/useTweetComposeOpen";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { TweetComposeModal } from "./TweetComposeModal";
import useDraftOpen from "@/stores/useDraftOpen";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import useTweetDraftStore from "../store/useTweetDraftStore";

const SideNav = () => {
  const { account: account } = useAccountStore();
  const { isOpen, setIsOpen } = useTweetComposeOpen();
  const {isOpen:draftOpen,setIsOpen:draftSetIsOpen} = useDraftOpen();
  const {tweetText,media} = useTweetDraftStore();
  

  return (
    <div className={` ${isOpen ? "ml-0 mr-10 w-1/4" : "ml-30 mr-5"} flex  flex-col h-screen sticky top-0 mt-2 transition-all `} >
      <div className={`flex flex-col  w-fit ${isOpen ? "ml-5" : "ml-3"}  `}>
        <div className="flex items-center">
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <Image
            src="/X_logo_white.png"
            className="z-10"
            width={25}
            height={30}
            alt=""
          />
          
        </div>
        {isOpen &&
            <span className="text-white opacity-0  text-xl">Home</span>
        }
        
        </div>
        <div className="flex items-center">
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaHome className="mt-2 mb-2 text-white " size={20} />
          
        </div>
        {isOpen &&
            <span className="text-white text-xl">Home</span>
        }
        
        </div>
        <div className="flex items-center">
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaSearch className=" text-white " size={20} />
          
        </div>
        {isOpen &&
            <span className="text-white text-xl">Explore</span>
        }
        
        </div>
        <div className="flex items-center">
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaBell className="text-white   " size={20} />
          
        </div>
        {isOpen &&
            <span className="text-white text-xl">Notifications</span>
        }
        
        </div>
        <div className="flex items-center">
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaEnvelope className="text-white  " size={20} />
          
        </div>
        {isOpen &&
            <span className="text-white text-xl">Chat</span>
        }
        
        </div>
        <div className="flex items-center">
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <Image
            src="/grok_white.png"
            className=" "
            width={32}
            height={30}
            alt=""
          />
          
        </div>
        {isOpen &&
            <span className="text-white text-xl">Grok</span>
        }
        
        </div>
        <div className="flex items-center">
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaUser className="text-white  " size={20} />
          
        </div>
        {isOpen &&
            <span className="text-white text-xl">Profile</span>
        }
        
        </div>
        <div className="flex items-center">
        <div className="flex relative items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaRegCircle className="text-white " size={30} />
          <FaEllipsisH className="text-white  absolute top-4ft-2" size={15} />
          
        </div>
        {isOpen &&
            <span className="text-white text-xl">More</span>
        }
        
        </div>

        
        
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className=" hover:cursor-pointer">
            {isOpen ?
              <div className="w-full bg-white ml-5 py-3 rounded-full">
                Post
              </div>
            :
              <div className="flex mt-2 ml-3 cursor-pointer relative bg-white  items-center justify-center rounded-full size-12">
          <FaFeatherAlt className=" " size={25} />
          <FaPlus className="  absolute top-1.5 left-2.5" size={13} />
            </div>
            }
            
          </DialogTrigger>
          <DialogContent
            className="bg-black top-10 left-1/2 -translate-x-1/2 translate-y-0  text-white min-w-[50%]  max-h-[90%] scrollbar-thumb-hover  border-black px-0 "
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) =>{ 
              if(media?.length > 0 || tweetText?.length > 0){
                e.preventDefault();
                draftSetIsOpen(true);
              }
              
            }}
          >
              
              <TweetComposeModal />
           
          </DialogContent>
        </Dialog>
      
      {account?.user_profile_image ? (
        <div className=" mt-12 flex relative items-center justify-center rounded-full size-18 hover:border-zinc-900 hover:bg-zinc-900">
          <img
            src={account.user_profile_image}
            className=" rounded-full size-12  "
            alt=""
          />
        </div>
      ) : (
        <div className="mt-12 flex relative items-center justify-center rounded-full size-14 hover:border-zinc-900 hover:bg-zinc-900">
          <img
            src="/default_user.svg"
            className=" size-12 rounded-full object-fill px-1 py-1 "
            alt=""
          />
        </div>
      )}
      
    </div>
  );
};

export default SideNav;
