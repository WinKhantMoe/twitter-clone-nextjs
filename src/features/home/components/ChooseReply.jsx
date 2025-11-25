import { Globe,Check,UserCheck, User,BadgeCheck,AtSign } from "lucide-react"
import { useState,useRef, useEffect, use } from "react"
import { useFormContext } from "react-hook-form";

export const ChooseReply = () =>{
  const [isOpen,setIsOpen] = useState(false);
  const clickRef = useRef(null);
  
  const [chosenReply,setChosenReply] = useState('everyone');
  const {getValues,watch} = useFormContext();
  const halfPastVH = getValues("halfPastVH");
  

  console.log(halfPastVH);
  

  useEffect(()=>{
    if(!isOpen) return;
    const handleClickOutside = (event) => {
      console.log("clicked outside");
      if (clickRef.current && !clickRef.current.contains(event.target)) {
        setIsOpen(false);
        event.stopPropagation();
        event.preventDefault();
        
      }
    };
    document.addEventListener("mousedown", handleClickOutside,true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside,true);
    };
  },[isOpen])
  return(
    <div className="mt-5 ml-3 relative">
      <div onClick={()=>setIsOpen(!isOpen)} className={`flex w-fit font-bold items-center text-sm gap-2 cursor-pointer text-blue-500`}>
        <Globe className="size-5" /> Everyone can reply
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-10">
        </div>
      )}
      <div
        ref={clickRef}
        className={`absolute  ${
          isOpen ? "block" : "hidden"
        }  bg-black mt-2 h-auto w-2/3 -left-20 ${halfPastVH && "bottom-10"}   rounded-2xl shadow-custom z-20 `}
      >
        <h3 className="text-md px-3 mt-2 font-bold">Who can reply?</h3>
        <h2 className="px-3 text-md text-zinc-500">Choose who can reply to this post.</h2>
        <h2 className="px-3 text-md text-zinc-500">Anyone mentioned can always reply.</h2>
        
        <div className="mt-1">
          <div onClick={()=>setChosenReply("everyone")} className="flex transition-all cursor-pointer duration-200 items-center justify-between p-3 hover:bg-zinc-700">
            <div className="flex font-semibold items-center gap-3 ">
              <Globe className="bg-blue-500 size-10 p-2 rounded-full" /> Everyone 
            </div>
            <div className={`${chosenReply === "everyone" ? "block" : "hidden"}`}>
            <Check className="float-end size-5 text-blue-500" />
            </div>
            
          </div>
          <div onClick={()=>setChosenReply("followedAccount")} className="flex transition-all cursor-pointer duration-200 items-center justify-between p-3 hover:bg-zinc-700">
            <div className="flex font-semibold items-center gap-3 ">
              <UserCheck className="bg-blue-500 size-10 py-2 pl-1 rounded-full" /> Accounts you follow
            </div>
            <div className={`${chosenReply === "followedAccount" ? "block" : "hidden"}`}>
            <Check className="float-end size-5 text-blue-500" />
            </div>
            
          </div>
          <div onClick={()=>setChosenReply("verifiedAccount")} className="flex transition-all cursor-pointer duration-200 items-center justify-between p-3 hover:bg-zinc-700">
            <div className="flex font-semibold  items-center gap-3 ">
              <BadgeCheck className="bg-blue-500 size-10 p-2 rounded-full" /> Verified accounts 
            </div>
            <div className={`${chosenReply === "verifiedAccount" ? "block" : "hidden"}`}>
            <Check className="float-end size-5 text-blue-500" />
            </div>
            
          </div>
          <div onClick={()=>setChosenReply("mentionedAccount")} className="flex transition-all cursor-pointer duration-200 items-center justify-between p-3 hover:bg-zinc-700">
            <div className="flex font-semibold items-center gap-3 ">
              <AtSign className="bg-blue-500 size-10 p-2 rounded-full" /> Only accounts you mention
            </div>
            <div className={`${chosenReply === "mentionedAccount" ? "block" : "hidden"}`}>
            <Check className="float-end size-5 text-blue-500" />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}