'use client';
import { set, useFormContext } from "react-hook-form";
import { useState, useEffect, use } from "react";
import SignUpAllowNoti from "./SignUpAllowNoti";
import useSupabaseDatabase from "../hooks/useSupabaseDatabase";

const SignUpUserTag = () => {
  const [allowNotiPage, setAllowNotiPage] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userTagTaken, setUserTagTaken] = useState(false);
  const [userTagSuggestions, setUserTagSuggestions] = useState([]);
  const {
    register,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = useFormContext();
  const userTag = watch("userTag");
  const { fetchUsers, fetchUser } = useSupabaseDatabase();

  const createEndTag = (tag) => {
    const endTag = parseInt(Math.random() * 1000);
    const firstNewTag = tag + endTag;
    const secNewTag = tag + "_" + endTag;
    console.log(firstNewTag, secNewTag);

    const existingUserTags = new Set(allUsers.map((user) => user.userTag));

    const newSuggestions = [];
    if (!existingUserTags.has(firstNewTag)) {
      newSuggestions.push(firstNewTag);
    }
    if (!existingUserTags.has(secNewTag)) {
      newSuggestions.push(secNewTag);
    }
    console.log(existingUserTags);
    console.log(newSuggestions);
    setUserTagSuggestions((prevSuggestions) => {
      const suggestionSet = new Set(prevSuggestions);
      console.log(suggestionSet);
      return [
        ...suggestionSet,
        ...newSuggestions.filter((tag) => !suggestionSet.has(tag)),
      ];
    });
  };


  useEffect(() => {
    
    setUserTagSuggestions([]);
    setUserTagTaken(false);
    if (userTag !== undefined && allUsers?.length > 0) {
      allUsers.map((user) => {
        if (user.userTag === userTag) {
          console.log("Tag found");
          
          setUserTagTaken(true);
          createEndTag(userTag);
        }
      });
    }
    console.log(userTagSuggestions);
    console.log(allUsers);
  }, [userTag]);
  return (
    <>
      {allowNotiPage === true ? (
        <SignUpAllowNoti />
      ) : (
        <div className="px-16 ">
          <h1 className="text-white text-3xl font-semibold my-5">
            What should we call you?
          </h1>
          <h3 className="text-zinc-600 text-sm my-5">
            Your @username is unique.You can always change it later.
          </h3>
          <div className="relative mt-4 mb-25">
            <input
              id="userTag"
              className={`peer text-zinc-300 rounded
                   focus:border-blue-500 focus:outline-none px-8
                   ${errors.userTag ? "border-red-500" : "border-zinc-700"}
                   pt-8 pb-1 border-2 border-zinc-700 w-full`}
              placeholder=""
              maxLength="50"
              {...register("userTag", { required: true })}
            />
            <label
              htmlFor="userTag"
              className={`absolute transition-all
                    duration-200 
                    peer-focus:text-blue-500 text-zinc-500 
                    text-sm top-1
                     left-2`}
            >
              Username
            </label>
            <span
              className={`absolute peer-focus:text-blue-500 text-zinc-500 text-xl top-8 left-2`}
            >
              @
            </span>
            <div className="max-h-2">
            <p className={`text-red-500 ${userTagTaken ? "" : "hidden"}`}>Your username is taken.Please try another one or pick from samples below</p>
              {userTagSuggestions?.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setValue("userTag", tag)}
                  className="cursor-pointer text-blue-600 text-sm my-5 mx-1"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div></div>
          <button
            disabled={!userTag || userTag === ""}
            onClick={() => setAllowNotiPage(true)}
            className={`${
              !userTag || userTag === ""
                ? "bg-zinc-500 "
                : "bg-white text-black cursor-pointer"
            } mt-4 w-full  text-center  rounded-3xl py-3 `}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default SignUpUserTag;
