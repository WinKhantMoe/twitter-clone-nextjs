'use client';
import {FaEye,FaEyeSlash} from 'react-icons/fa';
import { useState } from 'react';
import SignUpProfile from './SignUpProfile';
import { useFormContext } from 'react-hook-form';

const SignUpPassword = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [profilePage,setProfilePage] = useState(false);
  const {
    register,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext();
  const password = watch("password");
    return(
      <>
      {profilePage === true ? (
        <SignUpProfile />
      ) : (
              <div className="px-16 ">
          <h1 className="text-white text-3xl font-semibold mt-5">
            You'll need a password
          </h1>
          <h3 className="text-zinc-600">
            Make sure it's 8 characters or more
          </h3>
          
          <div className="relative mt-4 mb-30">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`peer text-zinc-300 rounded
             focus:border-blue-500 focus:outline-none px-4 
             ${errors.password ? "border-red-500" : "border-zinc-700"}
             pt-8 pb-1 border-2 border-zinc-700 w-full`}
              placeholder=""
              maxLength="50"
              {...register("password", { required: true })}
            />
            <label
              htmlFor="password"
              className={`absolute transition-all
              duration-200 
              peer-focus:text-blue-500 text-zinc-500 
              ${password?.length > 0 ? "text-sm top-1" : "top-4 text-xl"}
              peer-focus:top-1 peer-focus:text-sm  left-2`}
            >
              Password
            </label>
            <span className="absolute top-1/2 right-3 -translate-y-1/2">
              {showPassword ?
                <FaEyeSlash className="cursor-pointer text-zinc-500" onClick={() => setShowPassword(false)}/>
                :
                <FaEye className="cursor-pointer text-zinc-500" onClick={() => setShowPassword(true)}/>
              }
              
              </span>
          </div>
            
           
          
          <button
            disabled={!password || password === ""}
            onClick={() => setProfilePage(true)}
            className={`${
              !password || password === ""
                ? "bg-zinc-500 "
                : "bg-white text-black cursor-pointer"
            } mt-4 w-full  text-center  rounded-3xl py-3 `}
          >
            Next
          </button>
        </div>
      )}

         </>
    )
   
}

export default SignUpPassword;