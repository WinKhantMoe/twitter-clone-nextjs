import { FaBookmark, FaChartBar, FaChartLine, FaComment, FaEllipsisH, FaHeart, FaRetweet, FaShare, FaUpload } from "react-icons/fa";
import { timePassedCalc } from "@/utils/timePassedCalc";
export const Tweet = ({tweet}) => {
  
  return (
    <div className="text-white  flex gap-2 border-b border-zinc-600 p-4 ">
      { tweet?.author.user_profile_image ?
        <img src={tweet?.author.user_profile_image} className="size-12 rounded-full" />
        :
        <img src="/default_user.svg" className="size-12 rounded-full" />

      }
      
      <div className="flex-1">
        <div>
          <div className="flex  gap-1 justify-between items-center">
            <div>
              <span className="text-xl font-semibold">{tweet?.author.username}</span> 
            <span className="ml-1 text-zinc-500">@{tweet?.author.userTag}</span>  <span className="text-zinc-500"> {timePassedCalc(tweet?.createdAt)} </span>
            </div>
            <div className="flex gap-2 items-center">
              <img src="grok_zinc.png" className="size-5 " />
              <FaEllipsisH className="text-zinc-500"/>
            </div>
            
          </div>
          <div className="">
            {tweet?.content}
          </div>
          <div className={`grid ${tweet?.media.length > 1  ? "grid-cols-2" : "grid-cols-1"} mt-5 gap-1`}>
            {tweet?.media?.map((item,index)=>(
              <img key={index} src={item} className={`w-full h-[200px] object-cover  rounded-lg ${index / 2 === 1 && "col-span-2 w-auto"}`}/>
            ))

            }
          </div>
        </div>
        <div className="flex justify-between text-zinc-500 mt-5">
          <span>
            <FaComment className="size-4" />
          </span>
          <span>
            <FaRetweet className="size-5" />
          </span>
          <span>
            <FaHeart className="size-4" />
          </span>
          <span>
            <FaChartBar className="size-4" />
          </span>
          <span className="flex gap-2">
            <FaBookmark className="size-4" />
            <FaUpload className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
