'use client';
import { FaBell } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import useRegister from "../hooks/useRegister";



const SignUpAllowNoti = () => {
  const {tableSignUpUser} = useRegister();
  const {getValues} = useFormContext();
  const allValues = getValues();
  return(
    <div className="px-16 ">
      <FaBell className="text-blue-500 size-10 mx-auto" />
      <h1 className="text-white text-3xl font-semibold my-5">
        Turn on notifications
      </h1> 
      <h3 className="text-zinc-600 text-sm my-5">
        Get the most out of X by staying up to date with what's happening
      </h3>
      <div className="relative mt-4 mb-30">
        
        
      </div>
      <button
        onClick={() => tableSignUpUser(allValues)}
        className={` bg-black text-white cursor-pointer
                     mt-4 w-full border border-zinc-600 text-center  rounded-3xl py-3 `}
      >
        Allow notifications
      </button>
      <button
        onClick={() => tableSignUpUser(allValues)}
        className={` bg-white text-black cursor-pointer
                     mt-4 w-full  text-center  rounded-3xl py-3 `}
      >
        Skip for now
      </button>
    </div>
  )
}

export default SignUpAllowNoti;