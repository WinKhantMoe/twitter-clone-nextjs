import { FaBookmark, FaChartBar, FaChartLine, FaComment, FaCommentAlt, FaEllipsisH, FaHeadset, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart, FaRetweet, FaShare, FaUpload } from "react-icons/fa";
import { timePassedCalc } from "@/utils/timePassedCalc";
import { useFormContext } from "react-hook-form";
import useAccountStore from "@/stores/useAccountStore";
import { toggleLike } from "@/services/like";
import { useRouter } from "next/navigation";
import { useTweetFeed } from "../hooks/useTweetFeed";
export const Tweet = ({tweet}) => {
  const {tweetsMutate} = useTweetFeed();
  const {token} = useAccountStore();
  const router = useRouter();

  const handleToggleLike = async (id) =>{
    tweetsMutate(
  (data) => {
    if (!data) return data;

    return data.map((page) => ({
      ...page,
      tweets: page.tweets.map((tweet) => {
        if (tweet.id !== id) return tweet;

        const liked = tweet.likes.length > 0;

        return {
          ...tweet,
          likes: liked ? [] : [{ id }],
          _count: {
            ...tweet._count,
            likes: tweet._count.likes + (liked ? -1 : 1),
          },
        };
      }),
    }));
  },
  false
);
    try{
      await toggleLike({tweetId : id},token);
    }catch (error){
      console.log(error);
      tweetsMutate();
    }
    
    
  }
  return (
    <div  className="text-white  hover:bg-zinc-950 cursor-pointer  flex gap-2 border-b border-zinc-600 p-4 "
    onClick={()=>router.push(`${tweet.author.userTag}/status/${tweet.id}`)}
    >
      { tweet?.author.user_profile_image ?
        <img src={tweet?.author.user_profile_image} className="size-12 rounded-full" />
        :
        <img src="/default_user.svg" className="size-12 rounded-full" />

      }
      
      <div className="flex-1">
        <div>
          <div className="flex  gap-1 justify-between items-center">
            <div className="text-zinc-500">
              <span className="text-xl font-semibold">{tweet?.author.username}</span> 
            <span className="ml-1 text-zinc-500">@{tweet?.author.userTag}</span> · <span className="text-zinc-500"> {timePassedCalc(tweet?.createdAt)} </span>
            </div>
            <div className="flex gap-2 items-center">
              <img src="grok_zinc.png" className="size-5 " />
              <FaEllipsisH className="text-zinc-500"/>
            </div>
            
          </div>
          <div className="">
            {tweet?.content}
          </div>
          <div className={`grid ${tweet?.media?.length > 1  ? "grid-cols-2" : "grid-cols-1"} mt-5 gap-1`}>
            {tweet?.media?.map((item,index)=>(
              <img key={index} src={item} className={`w-full h-[200px] object-cover  rounded-lg ${index / 2 === 1 && "col-span-2 w-auto"}`}/>
            ))

            }
          </div>
        </div>
        <div className="flex justify-between text-zinc-500 mt-5">
          <div className="flex group relative items-center gap-1 cursor-pointer">
          <span className="group-hover:bg-blue-600   p-2 rounded-full">
            <FaRegComment className="size-4 group-hover:text-blue-500 opacity-100" />
          
          </span>
          <span className="group-hover:text-blue-500 absolute pl-7 z-10">{tweet?._count?.replies > 0 && tweet?._count?.replies}</span>
          <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">Reply</div>
          </div>
          <div className="flex group relative items-center gap-1 cursor-pointer">
          <span className="group-hover:bg-green-600   p-2 rounded-full">
            <FaRetweet className="size-4 group-hover:text-green-500 opacity-100" />
          
          </span>
          <span className="group-hover:text-green-500 absolute pl-7 z-10">{tweet?._count?.retweets > 0 && tweet?._count?.retweets}</span>
          <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">Repost</div>
          </div>
          <div  onClick={(e)=>{e.stopPropagation();handleToggleLike(tweet.id);}} className="flex group relative items-center gap-1 cursor-pointer">
          <span className="group-hover:bg-red-600   p-2 rounded-full">
            {tweet?.likes?.length > 0 ?
              <FaHeart className="size-4 text-red-500"/>
              :
              <FaRegHeart className="size-4 group-hover:text-red-500 opacity-100" />
            }
            
          
          </span>
          <span className={`${tweet?.likes?.length > 0 && "text-red-500"} group-hover:text-red-500 absolute pl-7 z-10`}>{tweet?._count?.likes}</span>
          <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">Like</div>
          </div>
          <div className="flex group relative items-center gap-1 cursor-pointer">
          <span className="group-hover:bg-blue-600   p-2 rounded-full">
            <FaChartBar className="size-4 group-hover:text-blue-500 opacity-100" />
          
          </span>
          <span className="group-hover:text-blue-500 absolute pl-7 z-10">12</span>
          <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">View</div>
          </div>
          
          <span className="flex  my-auto">
            <span className="group hover:bg-blue-600 p-2 rounded-full cursor-pointer">
              <FaRegBookmark className="size-4 group-hover:text-blue-500" />
            </span>
            <span className="group hover:bg-blue-600 p-2 rounded-full cursor-pointer">
              <FaUpload className="size-4 group-hover:text-blue-500" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
