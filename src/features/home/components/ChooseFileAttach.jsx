import { Image, Gif, Settings2,Smile,CalendarClock,MapPin,PlusIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { use, useRef,useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';


export const ChooseFileAttach = ({setDraftOpen}) => {
  const {getValues,watch,register,setValue,handleCreateTweet} = useFormContext();
  const mediaRef = useRef(null);
  const text = watch("tweetText");
  const media = watch("media");
  const mediaURL = watch("mediaURL");
  const allData = getValues();
 
  
  const handleClick = () => {
    mediaRef.current.click();
    setDraftOpen(true);
  };
  const handleMediaChange = (e) =>{
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    
    setValue("media",[...media,file]);
    if(mediaURL !== undefined){
      setValue("mediaURL",[...mediaURL,fileURL]);
    }else{
      setValue("mediaURL",[fileURL]);
    }
    
  }
  
  return (
    <div className="ml-3">
      <div className="flex justify-between">
        <div className="flex items-center text-blue-500 gap-3">
          <div className="relative group" onClick={()=>handleClick()}>
            <Image className="h-5 cursor-pointer "  />
            <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2 -top-2.5  group-hover:opacity-10 opacity-0"></div>
            <div className="absolute p-1 rounded-xs text-white bg-zinc-600 text-xs -left-2 top-8 group-hover:opacity-100 opacity-0">Media</div>
            <input 
            type="file" 
            accept="image/*"
            multiple 
            {...register("media")}
            ref={(e)=>{
              mediaRef.current = e;
              register("media").ref(e);
              
            }}
            style={{display : "none"}}
            onChange={handleMediaChange}
             />
          </div>
          <div className="relative group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
           <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2 -top-2 z-10 group-hover:opacity-10 opacity-0"></div>
            <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">GIF</div>
          </div>
          <div className="relative group">
          <img src="/grok_blue.png" className="h-5 cursor-pointer" />
           <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2.5   -top-2.5 z-10 group-hover:opacity-10 opacity-0"></div>
            <div className="absolute p-1 rounded-xs text-white bg-zinc-600 text-xs -left-17 top-8 group-hover:opacity-100 opacity-0 text-nowrap">Enhance your post with Grok</div>
          </div>
          <div className="relative group">
          <Settings2 className="h-5 cursor-pointer"/>
           <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2 -top-2.5 z-10 group-hover:opacity-10 opacity-0"></div>
            <div className="absolute py-1 px-2 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">Poll</div>
          </div>
          <div className="relative group">
          <Smile className="h-5 cursor-pointer"/>
           <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2   -top-2.5 z-10 group-hover:opacity-10 opacity-0"></div>
            <div className="absolute p-1 rounded-xs text-white bg-zinc-600 text-xs -left-2 top-8 group-hover:opacity-100 opacity-0">Emoji</div>
           </div>
           <div className="relative group">
          <CalendarClock className="h-5 cursor-pointer"/>
           <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2   -top-2.5 z-10 group-hover:opacity-10 opacity-0"></div>
            <div className="absolute p-1 rounded-xs text-white bg-zinc-600 text-xs -left-4 top-8 group-hover:opacity-100 opacity-0">Schedule</div>
           </div>
          <MapPin className="opacity-50 h-5 cursor-pointer"/>
        </div>
        <div className="flex gap-3 items-center">
          <div className={`${text?.length > 0 || text === '' && "hidden"} flex items-center gap-2`}>
            <div className="h-5 w-5">
            <CircularProgressbar 
            styles={buildStyles({
              pathColor : "#4299e1",
              trailColor : "#71717a"
            })}
            value={text?.length}  maxValue={280}/>
            </div>
            <div className="border-l h-8 border-zinc-500">
              
            </div>
            <PlusIcon className="border cursor-pointer text-blue-500 size-6 p-1 rounded-full border-zinc-500" />
          </div>
          <button onClick={()=>handleCreateTweet(allData)} className={`bg-white cursor-pointer ${text?.length > 0 || text === ''|| media?.length > 0 && "opacity-50 pointer-events-none"} text-black font-semibold px-4 py-1.5 rounded-3xl`}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
