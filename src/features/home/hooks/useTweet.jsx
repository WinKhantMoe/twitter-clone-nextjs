import { fetch3Users } from "@/services/user";
import { fetchTweets } from "@/services/tweet";
import { useForm } from "react-hook-form"
import useSWR from "swr";
import { use, useEffect, useState } from "react";
import useAccountStore from "@/stores/useAccountStore";
import { useLoadingBar } from "react-top-loading-bar";
import supabase from "@/lib/supabase";
import { createTweet } from "@/services/tweet";
import { v4 } from "uuid";
import useSWRInfinite from 'swr/infinite';
import { set } from "idb-keyval";
import { Users } from "lucide-react";

const useTweet = () => {
  const methods = useForm({ mode: "all",defaultValues: {
    halfPastVH : false
  } });
  const [readiedMedia,setReadiedMedia] = useState([]);
  const {token,account} = useAccountStore();
  const { watch,reset } = methods;
  const shouldFetch = !!token;
  const {start,complete} = useLoadingBar({
    color: "white",
    height: 2
  })
  
  const getKeyFor3Users = (pageIndex, previousPageData) => {
    if(!token) return null;
    if(previousPageData && !previousPageData.nextCursor) return null;

    const base = process.env.NEXT_PUBLIC_DATABASE_URL + "/users/fetch3Users";
    if(pageIndex === 0){
      return  `${base}?take=3` ;
    }
    return `${base}?cursor=${previousPageData.nextCursor}&take=3`;
  }

  
  const { data,error,mutate,size : usersSize, setSize : setUsersSize } = useSWRInfinite(
    shouldFetch ? getKeyFor3Users : null,
    (key) => fetch3Users(key,token),
    { keepPreviousData : true});
  const usersData = data ? data.flatMap(data => data.users) : [];
  const handleCreateTweet = async (data) =>{
    start();
      try{
        if(data.media.length > 0){
          const allMedia = data.media;
        const uploadedURLs = await Promise.all(
          allMedia.map(async (media) => {
            const {data:response,error} = await supabase.storage.from('Tweets').upload(account.userTag + v4(),media);
            if(error) throw error;

            const {data : imageURL} = supabase.storage.from('Tweets').getPublicUrl(response.path);
            return imageURL.publicUrl;
          })
        )
        const finalData = { authorId : account.id, content: data.tweetText, media : uploadedURLs };
        createTweet(finalData,token);
        }else{
          const finalData = { authorId : account.id, content: data.tweetText, media : [] };
          createTweet(finalData,token);
        }
        

      }catch(error){
        console.log(error);
      }
      reset();
      complete();
  }
  const getKey = (pageIndex, previousPageData) =>{
    if(!token) return null;
    if(previousPageData && !previousPageData.nextCursor) return null;

    const base = process.env.NEXT_PUBLIC_DATABASE_URL + "/tweets/fetchTweets";
    
    if(pageIndex === 0){
      return  `${base}?limit=10`;
    }

    return `${base}?cursor=${previousPageData.nextCursor}&limit=10`;
  }
  
  
  const {data:tweetsData , size ,setSize, mutate : tweetsMutate} = useSWRInfinite(
    shouldFetch ? getKey : null,(key) =>fetchTweets(key,token),{
    keepPreviousData : true
  });
  
  const tweets = tweetsData ? tweetsData.flatMap(data => data.tweets) : [];

  

  

  return { 
    ...methods,
    data,
    usersData,
    mutate,
    handleCreateTweet,
    tweetsData,
    tweets,
    size,
    setSize,
    tweetsMutate,
    usersSize,
    setUsersSize
   };
}

export default useTweet;