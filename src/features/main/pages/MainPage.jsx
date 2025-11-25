"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import SignUpModal from "@/features/auth/components/SignUpModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import LogInModal from "@/features/auth/components/LogInModal";
import useDialogOpen from "@/stores/useLogInModalOpen";
import { useRouter,usePathname } from "next/navigation";
import useLogInModalOpen from "@/stores/useLogInModalOpen";
import useSignUpModalOpen from "@/stores/useSignUpModalOpen";
import useRegister from "@/features/auth/hooks/useRegister";
import { FormProvider } from "react-hook-form";
import useLogIn from "@/features/auth/hooks/useLogIn";

export default function MainPage() {
  const [bottomNav, setBottomNav] = useState([]);
  const { isOpen:logInOpen,setIsOpen:setLogInOpen} = useLogInModalOpen();
  const { isOpen:signUpOpen,setIsOpen:setSignUpOpen} = useSignUpModalOpen();
  const methods = useRegister();
  const logInMethods = useLogIn();
  // const router = useRouter();
  // const pathname = usePathname();
  // const isOpen = pathname === "/login";

  // const handleOpenChange = (open) =>{
  //   if(!open){
  //     router.push("/");
  //   }
  // }
 

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("/Bottom_nav.json").then((res) => res.json());
        setBottomNav(response.bottom_navs);
        
      }catch(error){
        console.error("Error fetching data:", error.message);
      }
    }
    fetchData();
  },[])
  return (
    
    <div className="bg-black h-full">
      <div className="grid grid-cols-2 pt-20 ">
      <Image src="/X_logo_white.png" className="m-auto" width={300} height={300} alt="X logo" />
      <div>
        <h1 className="text-white text-7xl font-bold">Happening now</h1>
        <h3 className="text-white text-3xl font-semibold mt-14">Join today.</h3>
        <div className="mt-8">
          <button className="bg-white rounded-3xl text-black py-2 px-16 w-1/2 flex gap-2">
          <Image src="/google_logo.png" width={20} height={20} alt="Google logo" />
          <span>Sign up with Google</span>
          </button>
        </div>
        <div className="mt-4">
         <button className="bg-white rounded-3xl text-black py-2 px-16 w-1/2 flex gap-2">
          <Image src="/apple_logo.png" width={20} height={20} alt="Google logo" />
          <span>Sign up with Apple</span>
          </button>
        </div>
        <div className="mt-4 w-1/2 flex">
          <div className="w-1/2 mt-3 mr-2 ">
            <hr className="border-0 border-t border-gray-700"></hr>
          </div>
          <div className="text-white">
            OR
          </div>
          <div className="w-1/2 mt-3 ml-2">
            <hr className="border-0 border-t border-gray-700"></hr>
          </div>
        </div>
        <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
      <DialogTrigger className="w-1/2" >
        <div className="mt-4">
          <span className="bg-white rounded-3xl text-black py-2 px-16 flex gap-2">
            <span className="mx-auto">Create account</span>
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-black h-[90%] px-0"
        onOpenAutoFocus={(e) => e.preventDefault()}>
      <FormProvider {...methods}>
      <SignUpModal />
      </FormProvider>
      </DialogContent>

      
      </Dialog>
        <div className="font-light text-xs text-gray-500 mt-4 w-1/2">
          By signing up, you agree to the 
          <Link href='' className="text-blue-500"> Terms of Service</Link> and 
          <Link href='' className="text-blue-500"> Privacy Policy</Link>,
           including <Link href='' className="text-blue-500"> Cookie Use.</Link>
        </div>
        <div className="mt-10 text-lg text-white">
          <h1>Already have an account?</h1>
          <Dialog open={logInOpen} onOpenChange={setLogInOpen} >
            <DialogTrigger className="w-1/2" >
            <div className="mt-4">
              <span className="text-sm border border-gray-500 rounded-3xl text-white py-2 px-16 flex gap-2">
               <span className="mx-auto">Sign in</span>
              </span>
            </div>
            </DialogTrigger>
            <DialogContent className="bg-black h-[90%] px-0"
            onOpenAutoFocus={(e) => e.preventDefault()}>
                <FormProvider {...logInMethods}>
                <LogInModal  />
                </FormProvider>
            </DialogContent>
          </Dialog>
          
          <div className="mt-4">  
               <button className="border border-gray-500  text-sm rounded-3xl text-white py-2 px-16 w-1/2">
               <div className="w-fit mx-auto flex gap-2">
                  <Image src='/grok_white.png' width={20} height={10} alt="Grok logo" />
                  <span>Get Grok</span>
               </div>
               
               </button>
          </div>
        </div>
        
      </div>
      </div>
      <div className="flex flex-wrap text-nowrap mt-10 gap-y-2 justify-center">
        {bottomNav?.map((nav, index) => (
          
          <span key={index} className={`border-0 border-gray-400 ${index === bottomNav.length - 1 ? "border-r-0" : "border-r-2"} px-5 text-xs text-gray-500 w-fit`}>{nav.name}</span>
          
        ))}
        
      </div>
    </div>
    
  );
}