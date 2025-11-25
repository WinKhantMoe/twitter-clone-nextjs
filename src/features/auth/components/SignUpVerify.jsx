'use client';
import { useState } from "react";
import SignUpPassword from "./SignUpPassword";
import { useFormContext } from "react-hook-form";
import useRegister from "../hooks/useRegister";

const SignUpVerify = ({verifyTarget}) => {
  const [passwordPage,setPasswordPage] = useState(false);
  const {
    register,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext();
  const {tableSignUpUser} = useRegister();
  console.log(passwordPage);
  const goToPassword = () => setPasswordPage(true);
  const verifier = watch("verifier");
    return(
      <>
      {passwordPage === true ? (
        <SignUpPassword />
      )
      : (
        <div className="px-16 ">
          <h1 className="text-white text-3xl font-semibold mt-5">
            We sent you a code
          </h1>
          <h3 className="text-zinc-600">
            Enter it below to verify {verifyTarget}
          </h3>
          <div className="mb-10">
          <div className="relative mt-4">
            <input
              id="verifier"
              className={`peer text-zinc-300 rounded
             focus:border-blue-500 focus:outline-none px-4 
             ${errors.verifier ? "border-red-500" : "border-zinc-700"}
             pt-8 pb-1 border-2 border-zinc-700 w-full`}
              placeholder=""
              maxLength="50"
              {...register("verifier", { required: true })}
            />
            <label
              htmlFor="verifier"
              className={`absolute transition-all
              duration-200 
              peer-focus:text-blue-500 text-zinc-500 
              ${verifier?.length > 0 ? "text-sm top-1" : "top-4 text-xl"}
              peer-focus:top-1 peer-focus:text-sm  left-2`}
            >
              Verification code
            </label>
          </div>
            <div className="text-blue-500 text-sm">
              Didn't receive email?
            </div>
           </div>
          <div>
            <div className="text-zinc-600 text-xl mb-20">
              There is no verification process.Just put anything in the box to proceed.
            </div>
          </div>
          <button
            disabled={!verifier || verifier === ""}
            onClick={() => {goToPassword()}}
            className={`${
              !verifier || verifier === ""
                ? "bg-zinc-500 "
                : "bg-white text-black cursor-pointer"
            } mt-4 w-full  text-center  rounded-3xl py-3 `}
          >
            Next
          </button>
        </div>
      )
      }
       
      
        </>
    )
}

export default SignUpVerify;