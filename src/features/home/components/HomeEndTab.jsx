import { FaEllipsisH, FaSearch } from "react-icons/fa";
import { useState,useEffect,useRef } from "react";
import useTweet from "../hooks/useTweet";
import useSWR from "swr";
import useAccountStore from "@/stores/useAccountStore";
import { useFormContext } from "react-hook-form";
import { Watch } from "lucide-react";

const HomeEndTab = ()=>{
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [endTabNav,setEndTabNav] = useState([]);
  const [keepScrolling,setKeepScrolling] = useState(false);
 
  const clickRef = useRef(null);
  const searchRef = useRef(null);
  const {token} = useAccountStore();
  const {
    data,
    usersData,
    mutate,
    watch,
    usersSize,
    setUsersSize
  } = useFormContext();
  console.log(data);
  const scrollTopForEndTab = watch("scrollTopForEndTab");
  const handleMoreUsers = () =>{
    console.log(usersSize);
    setUsersSize(usersSize + 1);
  }
  useEffect(()=>{
    
  },[scrollTopForEndTab])
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
  useEffect(()=>{
    if(!searchIsOpen) return;
    const handleClickOutside = (event) => {
      console.log("clicked outside");
      if (clickRef.current && !clickRef.current.contains(event.target)) {
        setSearchIsOpen(false);
        searchRef.current.blur();
        event.stopPropagation();
        event.preventDefault();
        
        
      }
    };
    document.addEventListener("mousedown", handleClickOutside,true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside,true);
    };
  },[searchIsOpen])
  
  return(
    <div className="w-3/4 pl-7 relative self-start ">
      <div className=" ">
      <div className="w-3/4 ">

      <div className="sticky top-0 bg-black pb-5 pt-1">
      <div className="relative w-full" ref={clickRef}>
        <FaSearch className="text-zinc-700 absolute top-3 left-4 size-4 " />
        <input ref={searchRef} onClick={()=>setSearchIsOpen(true)} placeholder="Search" className="border border-zinc-700 pl-10 text-white outline-none  focus:ring-2 focus:ring-blue-500 rounded-3xl w-full px-1 py-2" />
        <div  className={`${searchIsOpen === false && "hidden"} absolute bg-black z-20 mt-0.5 shadow-custom-search  w-full h-24 text-white border border-zinc-700 rounded-xl`}>
              <div className="text-sm text-center pt-5 text-zinc-500">
              Try searching for people,lists, or keywords
              </div>
            
        </div>
      </div>
      </div>
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
        {usersData?.map((user,index) => {
          
          return(
            <div className="flex justify-between items-center px-2  cursor-pointer hover:bg-zinc-900" key={index}>
            <div className="flex items-center gap-2 text-white my-2">
              <img src={user.user_profile_image} className="size-11 rounded-full" />
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