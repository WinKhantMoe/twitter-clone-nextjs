import { FaEllipsisH, FaSearch } from "react-icons/fa";
import { useState,useEffect,useRef } from "react";
import useTweet from "../hooks/useTweet";
import useSWR from "swr";
import useAccountStore from "@/stores/useAccountStore";
import { useFormContext } from "react-hook-form";
import { Watch } from "lucide-react";
import { useTweetFeed } from "../hooks/useTweetFeed";
import { MiniScrollBar } from "./MiniScrollBar";

const HomeEndTab = ()=>{
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [endTabNav,setEndTabNav] = useState([]);
  const [keepScrolling,setKeepScrolling] = useState(false);
 
  const clickRef = useRef(null);
  const searchRef = useRef(null);
  const {token} = useAccountStore();
  const {
    users,
    usersData,
    usersSize,
    setUsersSize
  } = useTweetFeed();
  
  
  const handleMoreUsers = () =>{
    
    setUsersSize(usersSize + 1);
  }

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await fetch("/endTab_nav.json").then((res) => res.json());
        setEndTabNav(response.endTab_navs);
        
      }catch(error){
        console.error("Error fetching data:", error.message);
      }
    }
    fetchData();
  },[])
  
  
  return(
    <div className="w-3/4 pl-7 relative self-start ">
      <div className=" ">
      <div className="w-3/4 ">
      <MiniScrollBar />
      
      <div className="">
      <div className="border border-zinc-700  w-full p-4 rounded-xl">
        <h3 className="text-white font-bold text-xl">Subscribe to Premium</h3>
        <p className="text-white font-normal my-2 text-md">
          Subscribe to unlock new features and if eligible,receive a share of revenue.
        </p>
        <button className="bg-blue-400 font-semibold text-white py-1 px-5 rounded-full">Subscribe</button>
      </div>
      <div className="border border-zinc-700  mt-5 w-full  rounded-xl">
        <h3 className="text-white font-bold p-4 text-xl">What's happening</h3>
        <div>
          <div className="flex justify-between cursor-pointer px-3 py-1 hover:bg-zinc-800">
            <div className="flex flex-col">
                <div className="text-zinc-500 text-sm">Trending</div>
                <div className="text-white font-bold">T1 Oner</div>
                <div className="text-zinc-500 text-sm">13k posts</div>
            </div>
            <FaEllipsisH className="text-zinc-500" />
          </div>
          <div className="flex justify-between cursor-pointer px-3 py-1 hover:bg-zinc-800">
            <div className="flex flex-col">
                <div className="text-zinc-500 text-sm">Trending</div>
                <div className="text-white font-bold">T1 Doran</div>
                <div className="text-zinc-500 text-sm">1,450 posts</div>
            </div>
            <FaEllipsisH className="text-zinc-500" />
          </div>
          <div className="flex justify-between cursor-pointer px-3 py-1 hover:bg-zinc-800">
            <div className="flex flex-col">
                <div className="text-zinc-500 text-sm">Trending</div>
                <div className="text-white font-bold">T1 Faker</div>
                <div className="text-zinc-500 text-sm">53k posts</div>
            </div>
            <FaEllipsisH className="text-zinc-500" />
          </div>
          <div className="flex justify-between cursor-pointer px-3 py-1 hover:bg-zinc-800">
            <div className="flex flex-col">
                <div className="text-zinc-500 text-sm">Trending</div>
                <div className="text-white font-bold">T1 Gumayusi</div>
                <div className="text-zinc-500 text-sm">9,422 posts</div>
            </div>
            <FaEllipsisH className="text-zinc-500" />
          </div>
          <div className="text-blue-400 rounded-b-xl p-3 cursor-pointer hover:bg-zinc-800">
              Show more
          </div>
        </div>
        
      </div>
      <div className="border border-zinc-700  mt-5 w-full  rounded-xl">
        <h3  className="text-white font-bold p-4 text-xl">Who to follow</h3>
        {users?.map((user,index) => {
          
          return(
            <div className="flex justify-between items-center px-2  cursor-pointer hover:bg-zinc-900" key={index}>
            <div className="flex items-center gap-2 text-white my-2">
              {user.user_profile_image ?
                <img src={user.user_profile_image} className="size-11 rounded-full" />
              :
                <img src="/default_user.svg" className="size-11 rounded-full" />
              }
              
              <div className="flex flex-col ">
              <span className="text-lg hover:underline">
                {user.username}
              </span>
              <span className="text-zinc-500">
                @{user.userTag}
              </span>
              </div>
            </div>
            <button className="text-black font-semibold bg-white h-fit w-fit py-1 px-3 rounded-xl">Follow</button>
          </div>
          )
          
        })

        }
        <div onClick={()=>handleMoreUsers()}  className="text-blue-400 rounded-b-xl p-3 cursor-pointer hover:bg-zinc-800">
              Show more
          </div>
      </div>
      <div className="flex flex-wrap text-nowrap mt-10 gap-y-2 justify-center">
        {endTabNav?.map((nav, index) => (
          
          <span key={index} className={`border-0 border-gray-400 ${index === endTabNav.length - 1 ? "border-r-0" : "border-r-2"} px-3 text-xs text-gray-500 w-fit`}>{nav.name}</span>
          
        ))}
        
      </div>
      
      </div>
      </div>
       </div>
    </div>
  )
}

export default HomeEndTab;