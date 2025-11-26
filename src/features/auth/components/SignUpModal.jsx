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
import { useViewpointObserve } from "@/hooks/ViewpointObserve";
import { useState, useEffect, useRef, useCallback } from "react";
import SignUpVerify from "./SignUpVerify";
import useRegister from "../hooks/useRegister";
import { useFormContext } from "react-hook-form";

const SignUpModal = () => {
  const [useEmail, setUseEmail] = useState(false);
  const [birthdayData, setBirthdayData] = useState([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [allFieldFilled, setAllFieldFilled] = useState(false);
  const [currentPage, setCurrentPage] = useState("SignUpStart");
  const { tableSignUpUser } = useRegister();
  const {
    register,
    watch,
    resetField,
    formState: { errors },
    getValues,
  } = useFormContext();
  
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   resetField,
  //   reset,
  //   formState: { errors },
  // } = useForm({ mode: "all" });
  const phone = watch("phone");
  const username = watch("username");
  
  const email = watch("email");
  const month = watch("month");
  const day = watch("day");
  const year = watch("year");
  const ref = useRef(null);
  const fieldsToWatch = useEmail
    ? ["username", "email", "day", "month", "year"]
    : ["username", "phone", "day", "month", "year"];

  const allValues = watch(fieldsToWatch);
  const continueSignUp = () => {
    if (allFieldFilled && email === undefined) {
      setCurrentPage("phoneSignUp");
    } else if (allFieldFilled && phone === undefined) {
      setCurrentPage("emailSignUp");
    }
  };
  useEffect(() => {
    if (!allValues) return;

    const complete = Object.values(allValues).every(
      (value) => value !== undefined && value !== null && value !== "" && !Number.isNaN(value)
    );

    setAllFieldFilled(complete);
    
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.9 }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    } else {
      
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/birthdayRange.json").then((res) =>
          res.json()
        );
        setBirthdayData(response);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
    
  }, []);
  return (
    <>
      <DialogHeader className="mb-5">
        <VisuallyHidden>
          <DialogTitle className=" ">Sign Up</DialogTitle>
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
      {currentPage === "SignUpStart" && (
        <>
          <div
            className={`px-14 pb-5 overflow-y-scroll border-zinc-400 ${
              isIntersecting ? "border-b-0" : "border-b"
            } border-0 `}
          >
            <h1 className="text-3xl text-white">Create your account</h1>

            <div className="relative mt-8">
              <input
                id="username"
                className={`peer text-zinc-300 rounded
             focus:border-blue-500 focus:outline-none px-4 
             ${errors.username ? "border-red-500" : "border-zinc-700"}
             pt-8 pb-1 border-2 border-zinc-700 w-full`}
                placeholder=""
                maxLength="50"
                {...register("username", { required: true })}
              />
              <label
                htmlFor="username"
                className={`absolute transition-all
              duration-200 
              ${
                username?.length > 50
                  ? "text-red-500"
                  : "peer-focus:text-blue-500 text-zinc-500 "
              }
              ${username?.length > 0 ? "text-sm top-1" : "top-4 text-xl"}
              peer-focus:top-1 peer-focus:text-sm  left-2`}
              >
                Name
              </label>
              <span className="text-zinc-500 absolute right-6 top-1 opacity-0 peer-focus:opacity-100">
                {`${username?.length ? username.length : 0}`} / 50
              </span>
            </div>
            {useEmail === true ? (
              <div className="relative mt-8">
                <input
                  id="email"
                  className={`peer text-zinc-300 rounded
              focus:outline-none px-4 
             ${
               errors.email
                 ? "border-red-500"
                 : "focus:border-blue-500 border-zinc-700"
             }
             pt-8 pb-1 border-2  w-full`}
                  placeholder=""
                  maxLength="50"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                <label
                  htmlFor="email"
                  className={`absolute transition-all
              duration-200 
              ${
                errors.email
                  ? "text-red-500"
                  : "peer-focus:text-blue-500 text-zinc-500 "
              }
              ${email?.length > 0 ? "text-sm top-1" : "top-4 text-xl"}
              peer-focus:top-1 peer-focus:text-sm  left-2`}
                >
                  Email
                </label>
                <div
                  className={`text-red-500 ${
                    errors.email ? "block" : "hidden"
                  }`}
                >
                  Please enter a valid email.
                </div>
              </div>
            ) : (
              <div className="relative mt-8">
                <input
                  id="phone"
                  className={`peer text-zinc-300 rounded
              focus:outline-none px-4 
             ${
               errors.phone
                 ? "border-red-500"
                 : "focus:border-blue-500 border-zinc-700"
             }
             pt-8 pb-1 border-2  w-full`}
                  placeholder=""
                  maxLength="50"
                  {...register("phone", {
                    required: true,
                    pattern: /^\+?[0-9\s\-().]{7,15}$/,
                  })}
                />
                <label
                  htmlFor="phone"
                  className={`absolute transition-all
              duration-200 
              ${
                errors.phone
                  ? "text-red-500"
                  : "peer-focus:text-blue-500 text-zinc-500 "
              }
              ${phone?.length > 0 ? "text-sm top-1" : "top-4 text-xl"}
              peer-focus:top-1 peer-focus:text-sm  left-2`}
                >
                  Phone
                </label>
                <div
                  className={`text-red-500 ${
                    errors.phone ? "block" : "hidden"
                  }`}
                >
                  Please enter a valid phone number.
                </div>
              </div>
            )}

            <div
              className="float-end text-blue-500 underline cursor-pointer"
              onClick={() => {
                setUseEmail(!useEmail),
                  resetField("email"),
                  resetField("phone");
              }}
            >
              Use {useEmail === true ? "phone" : "email"} instead
            </div>
            <div className="mt-8">
              <h1 className="text-white">Date of birth</h1>
              <h3 className="text-zinc-500 text-sm">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </h3>
              <div className="grid grid-cols-7 mt-8 gap-2" ref={ref}>
                <div className="relative col-span-3">
                  <select
                    id="month"
                    className="w-full peer text-white rounded
             focus:border-blue-500 focus:outline-none px-4  border-zinc-700  bg-black pt-6 pb-1 border-2"
                    {...register("month",{ required: true })}
                  >
                    {month ? <option disabled></option> : <option></option>}
                    {birthdayData?.months?.map((month, index) => (
                      <option key={index}>{month.month}</option>
                    ))}
                  </select>
                  <label
                    htmlFor="month"
                    className={`absolute transition-all
                  text-sm top-1
                  duration-200 peer-focus:text-blue-500 text-zinc-500  peer-focus:top-1 peer-focus:text-sm  left-2`}
                  >
                    Month
                  </label>
                </div>
                <div className="relative col-span-2">
                  <select
                    id="day"
                    type="number"
                    className="w-full peer text-white rounded
             focus:border-blue-500 focus:outline-none px-4  border-zinc-700  bg-black pt-6 pb-1 border-2"
                    {...register("day", { valueAsNumber: true })}
                  >
                    {day ? <option disabled></option> : <option></option>}
                    {birthdayData?.days?.map((day, index) => (
                      <option key={index}>{day.day}</option>
                    ))}
                  </select>
                  <label
                    htmlFor="day"
                    className={`absolute transition-all
                  text-sm top-1
                  duration-200 peer-focus:text-blue-500 text-zinc-500  peer-focus:top-1 peer-focus:text-sm  left-2`}
                  >
                    Day
                  </label>
                </div>
                <div className="relative col-span-2">
                  <select
                    id="year"
                    type="number"
                    className="w-full peer text-white rounded
             focus:border-blue-500 focus:outline-none px-4  border-zinc-700  bg-black pt-6 pb-1 border-2"
                    {...register("year", { valueAsNumber: true })}
                  >
                    {year ? <option disabled></option> : <option></option>}
                    {birthdayData?.years?.map((year, index) => (
                      <option key={index}>{year.year}</option>
                    ))}
                  </select>
                  <label
                    htmlFor="year"
                    className={`absolute transition-all
                  text-sm top-1
                  duration-200 peer-focus:text-blue-500 text-zinc-500  peer-focus:top-1 peer-focus:text-sm  left-2`}
                  >
                    Year
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="px-14">
            <button
              onClick={()=>{continueSignUp()}}
              disabled={!allFieldFilled || errors.email || errors.phone}
              className={`${
                !allFieldFilled || errors.email || errors.phone
                  ? "bg-zinc-500"
                  : "bg-white cursor-pointer"
              } mt-8 w-full  text-center  rounded-3xl py-3 `}
            >
              Next
            </button>
           
          </DialogFooter>
        </>
      )}
      {currentPage === "emailSignUp" && (
        <SignUpVerify
          
          verifyTarget={email}
        />
      )}
      {currentPage === "phoneSignUp" && (
        <SignUpVerify
          
          verifyTarget={phone}
        />
      )}
    </>
  );
};
export default SignUpModal;
