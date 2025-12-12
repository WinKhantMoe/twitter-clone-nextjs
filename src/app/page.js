"use client";
import MainPage from "@/features/main/pages/MainPage";
import { LoadingBarContainer } from "react-top-loading-bar";
import { GoogleOAuthProvider } from '@react-oauth/google';



export default function Home() {
  return ( 
    <GoogleOAuthProvider clientId= {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} >
    <LoadingBarContainer>
    <MainPage />
    </LoadingBarContainer>
    </GoogleOAuthProvider>
   
)
}