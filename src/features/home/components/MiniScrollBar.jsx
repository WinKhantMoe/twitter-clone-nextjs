import { useState,useEffect,useRef } from "react";
import { FaSearch } from "react-icons/fa";

export const MiniScrollBar = () => {
  const clickRef = useRef(null);
  const searchRef = useRef(null);
   const [searchIsOpen, setSearchIsOpen] = useState(false);

  useEffect(()=>{
    if(!searchIsOpen) return;
    const handleClickOutside = (event) => {
      
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
    useEffect(()=>{
      if(!searchIsOpen) return;
      const handleClickOutside = (event) => {
        
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
  )
}