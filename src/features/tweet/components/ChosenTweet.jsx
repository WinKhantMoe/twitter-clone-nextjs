"use client";
import { ArrowLeft, Sliders, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTweetFeed } from "@/features/home/hooks/useTweetFeed";
import { useParams } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { postedTimeCalc } from "@/utils/postedTimeCalc";
import { FaRegComment,FaRetweet,FaHeart,FaRegHeart,FaUpload,FaRegBookmark } from "react-icons/fa";
import { toggleLike } from "@/services/like";
import useAccountStore from "@/stores/useAccountStore";
import { ChosenTweetCompose } from "./ChosenTweetCompose";

export const ChosenTweet = () => {
  const router = useRouter();
  const params = useParams();
  const { tweets,tweetsMutate } = useTweetFeed();
  const {token} = useAccountStore();
  const tweet = tweets.filter((data) => {
    return data.id === params.id;
  });
  const author = tweet[0]?.author;

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
    <div className="text-white w-full border-x border-zinc-600">
      <div className="flex justify-between  p-4">
        <div className="flex items-center gap-5">
          <span>
            <ArrowLeft
              onClick={() => router.back()}
              className="hover:bg-zinc-900 p-2 rounded-full cursor-pointer size-10"
            />
          </span>
          <span className="font-semibold text-xl">Post</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-sm border border-gray-500 rounded-3xl text-white py-2 px-5 flex gap-2">
            <span className="">Reply</span>
          </span>
          <span className="">
            <SlidersHorizontal />
          </span>
        </div>
      </div>
      <div className="text-white flex flex-col gap-2 border-b border-zinc-600   ">
        <div className="mx-4 ">
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            {tweet[0]?.author.user_profile_image ? (
              <img
                src={tweet[0]?.author.user_profile_image}
                className="size-12 rounded-full"
              />
            ) : (
              <img src="/default_user.svg" className="size-12 rounded-full" />
            )}
            <div className="flex flex-col">
              <span className="font-bold">{tweet[0]?.author.username}</span>
              <span className="text-zinc-400">@{tweet[0]?.author.userTag}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/grok_zinc.png" className="size-5 " />
            <FaEllipsisH className="text-zinc-500" />
          </div>
        </div>
        <div className="text-lg">{tweet[0]?.content}</div>
        <div
          className={`grid ${
            tweet[0]?.media.length > 1 ? "grid-cols-2" : "grid-cols-1"
          } mt-5 gap-1`}
        >
          {tweet[0]?.media?.map((item, index) => (
            <img
              key={index}
              src={item}
              className={`w-full h-[300px] object-cover  rounded-lg ${
                index / 2 === 1 && "col-span-2 w-auto"
              }`}
            />
          ))}
        </div>
        <div className="my-2">
          <div className="relative group hover:underline text-zinc-400 w-fit">
            <span>{postedTimeCalc(tweet[0]?.createdAt)}</span>
            <div className="absolute p-1 rounded-xs text-white bg-zinc-600 text-xs left-2 top-7 group-hover:opacity-100 opacity-0">
              {postedTimeCalc(tweet[0]?.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-zinc-500 border-t border-zinc-600 py-1 ">
          <div className="flex group relative items-center gap-1 cursor-pointer">
            <span className="group-hover:bg-blue-600   p-2 rounded-full">
              <FaRegComment className="size-5 group-hover:text-blue-500 opacity-100" />
            </span>
            <span className="group-hover:text-blue-500 absolute pl-8 z-10">
              {tweet[0]?._count.replies > 0 && tweet[0]?._count.replies}
            </span>
            <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">
              Reply
            </div>
          </div>
          <div className="flex group relative items-center gap-1 cursor-pointer">
            <span className="group-hover:bg-green-600   p-2 rounded-full">
              <FaRetweet className="size-5 group-hover:text-green-500 opacity-100" />
            </span>
            <span className="group-hover:text-green-500 absolute pl-8 z-10">
              {tweet[0]?._count.retweets > 0 && tweet[0]?._count.retweets}
            </span>
            <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">
              Repost
            </div>
          </div>
          <div
            onClick={() => {handleToggleLike(tweet[0]?.id);}}
            className="flex group relative items-center gap-1 cursor-pointer"
          >
            <span className="group-hover:bg-red-600   p-2 rounded-full">
              {tweet[0]?.likes.length > 0 ? (
                <FaHeart className="size-5 text-red-500" />
              ) : (
                <FaRegHeart className="size-5 group-hover:text-red-500 opacity-100" />
              )}
            </span>
            <span
              className={`${
                tweet[0]?.likes.length > 0 && "text-red-500"
              } group-hover:text-red-500 absolute pl-8 z-10`}
            >
              {tweet[0]?._count.likes}
            </span>
            <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">
              Like
            </div>
          </div>
          <div className="flex group relative items-center gap-1 cursor-pointer">
            <span className="group-hover:bg-blue-600   p-2 rounded-full">
              <FaRegBookmark className="size-5 group-hover:text-blue-500" />
            </span>
            <span className="group-hover:text-blue-500 absolute pl-8 z-10">
              
            </span>
            <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">
              View
            </div>
          </div>

          <span className="flex  my-auto">
            <span className="group hover:bg-blue-600 p-2 rounded-full cursor-pointer">
              <FaUpload className="size-5 group-hover:text-blue-500" />
            </span>
          </span>
        </div>
        <ChosenTweetCompose author={author} />
      </div>
      </div>
    </div>
  );
};
