'use client';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { useState } from "react";
import { useFormContext } from "react-hook-form";



const EmailLogInModal = () =>{
  const [showPassword,setShowPassword] = useState(false);
  const {
      register,
      watch,
      resetField,
      formState: { errors },
      getValues,
      tableLogInUser,
    } = useFormContext();
  
  const identifier = getValues("identifier");
  const password = watch("password");
  const allValues = getValues();
  return(
    <div className="px-16 ">
          <h1 className="text-white text-3xl font-semibold mt-5">
            Enter your password
          </h1>
          
          <div className="relative mt-4 ">
            <input
              id="identifier"
              disabled={true}
              className={` text-zinc-500 rounded
              px-4 
             "border-zinc-700
             pt-8 pb-1 border-2 bg-zinc-900 border-zinc-900 w-full`}
              defaultValue={identifier}
            />
            <label
              htmlFor="identifier"
              className={`absolute 
               text-zinc-500 
              text-sm top-1
               left-2`}
            >
              Email
            </label>
          </div>
          <div className="relative mt-8">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`peer text-zinc-300 rounded
              focus:outline-none px-4 
             ${
               errors.password
                 ? "border-red-500"
                 : "focus:border-blue-500 border-zinc-700"
             }
             pt-8 pb-1 border-2  w-full`}
                placeholder=""
                maxLength="50"
                {...register("password", {
                  required: password
                  
                })}
              />
              <label
                htmlFor="phone"
                className={`absolute transition-all
              duration-200 
              ${
                errors.password
                  ? "text-red-500"
                  : "peer-focus:text-blue-500 text-zinc-500 "
              }
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
            <div className="text-blue-500 text-sm">
              Forgot password?
            </div>
            <button
            disabled={!password || password === ""}
            onClick={() => tableLogInUser(allValues)}
            className={`${
              !password || password === ""
                ? "bg-zinc-500 "
                : "bg-white text-black cursor-pointer"
            } mt-8 w-full text-center font-semibold  rounded-3xl py-3 `}
          >
            Log in
          </button>
          <div className="mt-2">
            <span className="text-zinc-500">
              Don't have an account?
              <span className="text-blue-500">Sign up</span>
            </span>
          </div>
          
        </div>
  )
}

export default EmailLogInModal;