import { fetch3Users } from "@/services/user";
import { fetchTweets, createTweet } from "@/services/tweet";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { use, useEffect, useState } from "react";
import useAccountStore from "@/stores/useAccountStore";
import { useLoadingBar } from "react-top-loading-bar";
import supabase from "@/lib/supabase";
import { saveDraft, fetchDrafts, deleteSingleDraft } from "@/services/draft";
import { v4 } from "uuid";
import useSWRInfinite from "swr/infinite";
import useDraftOpen from "@/stores/useDraftOpen";
import useTweetComposeOpen from "@/stores/useTweetComposeOpen";

const useTweet = () => {
  const methods = useForm({
    mode: "all",
    defaultValues: {
      halfPastVH: false,
      draftHalfPastVH: false,
    },
  });
  const { isOpen: draftOpen, setIsOpen: setDraftOpen } = useDraftOpen();
  const { isOpen, setIsOpen } = useTweetComposeOpen();
  const [readiedMedia, setReadiedMedia] = useState([]);
  const { token, account } = useAccountStore();
  const { watch, reset, setValue } = methods;
  const shouldFetch = !!token;
  const { start, complete } = useLoadingBar({
    color: "white",
    height: 2,
  });

  const getKeyFor3Users = (pageIndex, previousPageData) => {
    if (!token) return null;
    if (previousPageData && !previousPageData.nextCursor) return null;

    const base = process.env.NEXT_PUBLIC_DATABASE_URL + "/users/fetch3Users";
    if (pageIndex === 0) {
      return `${base}?take=3`;
    }
    return `${base}?cursor=${previousPageData.nextCursor}&take=3`;
  };

  const {
    data,
    error,
    mutate,
    size: usersSize,
    setSize: setUsersSize,
  } = useSWRInfinite(
    shouldFetch ? getKeyFor3Users : null,
    (key) => fetch3Users(key, token),
    { keepPreviousData: true }
  );
  const usersData = data ? data.flatMap((data) => data.users) : [];

  const handleCreateDraftTweet = async (data) => {
    start();
    try {
      if (data.draftItem?.id) {
        const uploadedURLs = await Promise.all(
          data.draftItem.media.map(async (url) => {
            const parts = url.split("/storage/v1/object/public/")[1];
            if (!parts) return null;

            const [bucket, ...pathParts] = parts.split("/");
            const filePath = pathParts.join("/");
            console.log(parts);
            console.log(pathParts);
            console.log(bucket);
            console.log(filePath);
            const { data: copyData,error : copyError } = await supabase.storage
              .from(bucket)
              .copy(filePath, `${account.userTag + v4()}`,{
                destinationBucket : "Tweets"
              });
            console.log(copyData);
            console.log(copyError);
            const resPath = copyData.path.split("Tweets/")[1];
            
            const { data: imageURL } =  supabase.storage
                .from("Tweets")
                .getPublicUrl(resPath);
            
            const { error } = supabase.storage.from(bucket).remove([filePath]);

            return imageURL.publicUrl;
          })
        );
         deleteSingleDraft({id : data.draftItem.id}, token);
        const finalData = {
          authorId: account.id,
          content: data.draftTweetText,
          media: uploadedURLs,
        };
        createTweet(finalData, token);
      } else {
        if (data.draftMedia?.length > 0) {
          const allMedia = data.draftMedia;
          const uploadedURLs = await Promise.all(
            allMedia.map(async (media) => {
              const { data: response, error } = await supabase.storage
                .from("Tweets")
                .upload(account.userTag + v4(), media);
              if (error) throw error;

              
              const { data: imageURL } =  supabase.storage
                .from("Tweets")
                .getPublicUrl(response.path);
              return imageURL.publicUrl;
            })
          );
          const finalData = {
            authorId: account.id,
            content: data.draftTweetText,
            media: uploadedURLs,
          };
          createTweet(finalData, token);
        } else {
          
          const finalData = {
            authorId: account.id,
            content: data.draftTweetText,
            media: [],
          };
          createTweet(finalData, token);
        }
      }
    } catch (e) {
      console.log(e);
    }
    reset();
    setValue("draftTweetText", "");
    setIsOpen(false);
    complete();
  };
  const handleCreateTweet = async (data) => {
    start();
    try {
      if (data.media.length > 0) {
        const allMedia = data.media;
        const uploadedURLs = await Promise.all(
          allMedia.map(async (media) => {
            const { data: response, error } = await supabase.storage
              .from("Tweets")
              .upload(account.userTag + v4(), media);
            if (error) throw error;

            const { data: imageURL } = supabase.storage
              .from("Tweets")
              .getPublicUrl(response.path);
            return imageURL.publicUrl;
          })
        );
        const finalData = {
          authorId: account.id,
          content: data.tweetText,
          media: uploadedURLs,
        };
        createTweet(finalData, token);
      } else {
        const finalData = {
          authorId: account.id,
          content: data.tweetText,
          media: [],
        };
        createTweet(finalData, token);
      }
    } catch (error) {}
    reset();
    setValue("tweetText", "");
    complete();
  };
  const handleCreateDraft = async (data) => {
    start();
    try {
      if (data.draftMedia?.length > 0) {
        const allMedia = data.draftMedia;
        const uploadedURLs = await Promise.all(
          allMedia.map(async (media) => {
            const { data: response, error } = await supabase.storage
              .from("Drafts")
              .upload(account.userTag + v4(), media);
            if (error) throw error;

            const { data: imageURL } = supabase.storage
              .from("Drafts")
              .getPublicUrl(response.path);
            return imageURL.publicUrl;
          })
        );
        const finalData = {
          authorId: account.id,
          content: data.draftTweetText,
          media: uploadedURLs,
        };
        saveDraft(finalData, token);
        setIsOpen(false);
        setDraftOpen(false);
      } else if (
        data.draftMediaURL?.length > 0 &&
        data.draftMedia?.length === 0
      ) {
        const finalData = {
          authorId: account.id,
          content: data.draftTweetText,
          media: data.draftMediaURL,
        };
        saveDraft(finalData, token);
        setIsOpen(false);
        setDraftOpen(false);
      } else {
        
        const finalData = {
          authorId: account.id,
          content: data.draftTweetText,
          media: [],
        };
        saveDraft(finalData, token);
        setIsOpen(false);
        setDraftOpen(false);
      }
    } catch (error) {}
    reset();
    setValue("draftTweetText", "");
    complete();
  };
  const getKey = (pageIndex, previousPageData) => {
    if (!token) return null;
    if (previousPageData && !previousPageData.nextCursor) return null;

    const base = process.env.NEXT_PUBLIC_DATABASE_URL + "/tweets/fetchTweets";

    if (pageIndex === 0) {
      return `${base}?limit=10`;
    }

    return `${base}?cursor=${previousPageData.nextCursor}&limit=10`;
  };

  const {
    data: tweetsData,
    size,
    setSize,
    mutate: tweetsMutate,
  } = useSWRInfinite(
    shouldFetch ? getKey : null,
    (key) => fetchTweets(key, token),
    {
      keepPreviousData: true,
    }
  );

  const tweets = tweetsData ? tweetsData.flatMap((data) => data.tweets) : [];
  
  

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
    setUsersSize,
    handleCreateDraft,
    handleCreateDraftTweet
  };
};

export default useTweet;
