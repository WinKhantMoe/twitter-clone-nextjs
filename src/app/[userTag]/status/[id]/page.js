"use client";
import TweetPage from "@/features/tweet/pages/TweetPage";
import { LoadingBarContainer } from "react-top-loading-bar";

const Page = ()=>{
  return(
    <LoadingBarContainer>
    <TweetPage />
    </LoadingBarContainer>
  )
}

export default Page;