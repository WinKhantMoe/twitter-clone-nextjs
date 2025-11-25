'use client';
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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import EmailLogInModal from "./EmailLogInModal";
import PhoneLogInModal from "./PhoneLogInModal";
import UsernameLogInModal from "./UsernameLogInModal";
import { useFormContext } from "react-hook-form";

const LogInModal = (isOpen,onOpenChange) => {
  const [currentPage, setCurrentPage] = useState('SigninStart');
  
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    reset,
    getValues,
    formState: { errors },
  } = useFormContext();

  const identifier = watch("identifier");
  const phoneOrEmail = watch("phoneOrEmail");

  
  const continueLogin = (identifier) =>{
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^\+?[0-9\s\-().]{7,15}$/;
    if(emailRegex.test(identifier)){
      setCurrentPage('emailLogIn');
    }else if(phoneRegex.test(identifier)){
      setCurrentPage('phoneLogIn')
    }else{
      setCurrentPage('nameLogIn');
    }
  }
  return (
    <>
      <DialogHeader className="z-99">
        <VisuallyHidden>
          <DialogTitle className=" ">Sign in</DialogTitle>
        </VisuallyHidden>
        <div className="">
          <DialogClose asChild>
            <div
              className={`text-xl px-2 absolute cursor-pointer
                         hover:border-zinc-500 hover:bg-zinc-500  
                         border-4 rounded-full top-2 left-4 bg-black border-black text-white`}
            >
              X
            </div>
          </DialogClose>
          <Image
            className="mx-auto absolute top-2 right-1/2"
            src="/X_logo_white.png"
            width={35}
            height={35}
            alt="X logo"
          />
        </div>
      </DialogHeader>
      {currentPage === 'SigninStart' && (
        <div className="bg-black overflow-y-scroll px-20">
          <div className="mt-4">
            <h3 className="text-white text-3xl font-semibold">
              Sign in to X
            </h3>
            <button className="bg-white mt-8 rounded-3xl text-black py-2 px-16  w-full flex gap-2">
              <Image
                src="/google_logo.png"
                width={20}
                height={20}
                alt="Google logo"
              />
              <span>Sign up with Google</span>
            </button>
          </div>
          <div className="mt-4">
            <button className="bg-white mt-4 rounded-3xl text-black py-2 px-16  w-full flex gap-2">
              <Image
                src="/apple_logo.png"
                width={20}
                height={20}
                alt="Google logo"
              />
              <span>Sign up with Apple</span>
            </button>
          </div>
          <div className="mt-4  flex">
            <div className="w-full mt-3 mr-2 ">
              <hr className="border-0 border-t border-gray-700"></hr>
            </div>
            <div className="text-white">or</div>
            <div className="w-full mt-3 ml-2">
              <hr className="border-0 border-t border-gray-700"></hr>
            </div>
          </div>

          <div className="relative mt-4">
            <input
              id="identifier"
              className={`peer text-zinc-300 rounded
             focus:border-blue-500 focus:outline-none px-4 
             ${errors.identifier ? "border-red-500" : "border-zinc-700"}
             pt-8 pb-1 border-2 border-zinc-700 w-full`}
              placeholder=""
              maxLength="50"
              {...register("identifier", { required: true })}
            />
            <label
              htmlFor="identifier"
              className={`absolute transition-all
              duration-200 
              peer-focus:text-blue-500 text-zinc-500 
              ${identifier?.length > 0 ? "text-sm top-1" : "top-4 text-xl"}
              peer-focus:top-1 peer-focus:text-sm  left-2`}
            >
              Phone,email,or username
            </label>
          </div>
          <button
            disabled={!identifier || identifier === ""}
            onClick={() => continueLogin(identifier)}
            className={`${
              !identifier || identifier === ""
                ? "bg-zinc-500 "
                : "bg-white text-black cursor-pointer"
            } mt-8 w-full  text-center  rounded-3xl py-1`}
          >
            Next
          </button>
          <button
            onClick={() => console.log("object")}
            className={`border border-zinc-500 text-white bg-black mt-8 w-full  text-center  rounded-3xl py-1  cursor-pointer`}
          >
            Forgot password?
          </button>
          <div className="mt-8">
            <span className="text-zinc-500">
              Don't have an account?
              <span className="text-blue-500">Sign up</span>
            </span>
          </div>
        </div>
      )}
      {currentPage === 'nameLogIn' && (
        <UsernameLogInModal />
      )}
      {currentPage === 'phoneLogIn' && (
        <PhoneLogInModal />
      )}
      {
        currentPage === 'emailLogIn' && (
          <EmailLogInModal  />
        )
      }
    </>
  );
};

export default LogInModal;
