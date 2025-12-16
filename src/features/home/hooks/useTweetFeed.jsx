import { fetch3Users } from "@/services/user";
import { fetchTweets, createTweet } from "@/services/tweet";
import useSWRInfinite from "swr/infinite";
import useAccountStore from "@/stores/useAccountStore";
import { v4 } from "uuid";


export const useTweetFeed = () => {
  const {token} = useAccountStore();
  const shouldFetch = !!token;


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
    data : usersData,
    error,
    mutate : usersMutate,
    size: usersSize,
    setSize: setUsersSize,
  } = useSWRInfinite(
    shouldFetch ? getKeyFor3Users : null,
    (key) => fetch3Users(key, token),
    { keepPreviousData: true }
  );
  const users = usersData ? usersData.flatMap((data) => data.users) : [];

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
    setSize : tweetsSetSize,
    mutate: tweetsMutate,
  } = useSWRInfinite(
    shouldFetch ? getKey : null,
    (key) => fetchTweets(key, token),
    {
      keepPreviousData: true,
    }
  );

  const tweets = tweetsData ? tweetsData.flatMap((data) => data.tweets) : [];
  console.log(tweets);
  return{
    tweets,
    tweetsData,
    tweetsMutate,
    tweetsSetSize,
    users,
    usersData,
    usersSize,
    setUsersSize,
    usersMutate
  }
};
