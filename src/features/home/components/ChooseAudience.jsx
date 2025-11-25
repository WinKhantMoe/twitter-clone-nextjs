import { ChevronDown, Globe,Check } from "lucide-react";
import { FaGlobe, FaChevronDown } from "react-icons/fa";
import { useState,useEffect,useRef } from "react";

export const ChooseAudience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const clickRef = useRef(null);
  const [chosenAudience,setChosenAudience] = useState("everyone")

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
  return (
    <div className="mb-5 ml-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex active:bg-blue-500 transition-all duration-400 cursor-pointer items-center gap-3 text-md text-blue-500 border border-zinc-500 shadow-lg  w-fit px-3 rounded-xl"
      >
        Everyone <ChevronDown className="pt-1" />
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-10">
        </div>
      )}
      <div
        ref={clickRef}
        className={`absolute  ${
          isOpen ? "block" : "hidden"
        }  bg-black mt-2 h-2/3 w-1/5 left-1/7 rounded-2xl shadow-custom z-20 `}
      >
        <h3 className="text-xl p-2 font-bold">Choose audience</h3>
        <div className="mt-1">
          <div className="flex transition-all cursor-pointer duration-200 items-center justify-between p-3 hover:bg-zinc-700">
            <div className="flex  items-center gap-3 ">
              <Globe className="bg-blue-500 size-10 p-2 rounded-full" /> Everyone 
            </div>
            <div className={`${chosenAudience === "everyone" ? "block" : "hidden"}`}>
            <Check className="float-end size-5 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
