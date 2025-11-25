"use client";
import HomePage from "@/features/home/pages/HomePage";
import { LoadingBarContainer } from "react-top-loading-bar";

const Page = ()=>{
  return(
    <LoadingBarContainer>
    <HomePage />
    </LoadingBarContainer>
  )
}

export default Page;