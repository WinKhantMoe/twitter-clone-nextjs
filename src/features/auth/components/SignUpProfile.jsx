'use client';
import Image from "next/image";
import { useState,useRef, use } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { set, useFormContext } from "react-hook-form";
import SignUpUserTag from "./SignUpUserTag";


const SignUpProfile = () => {
  const [userTagPage,setUserTagPage] = useState(null);
  const [previewImage,setPreviewImage]  = useState(null);
  const {
    register,
    watch,
    resetField,
    setValue,
    uploadProfileImage,
    formState: { errors },
  } = useFormContext();
  const inputRef=useRef(null);
  const user_profile_image = watch('user_profile_image');
  
  
  
  const handleClick = () => inputRef.current.click();
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if(!file) return ;
    setPreviewImage(URL.createObjectURL(file));
    
    setValue('user_profile_image',file);
    
      
     
    
    
    }
  
    return(
          <>
          {userTagPage === true ? (
            <SignUpUserTag />
          ) : (
            <div className="px-16 ">
              <h1 className="text-white text-3xl font-semibold mt-5">
                Pick a profile picture
              </h1>
              <h3 className="text-zinc-600">
                Have a favorite photo? Upload it now
              </h3>
              {previewImage
                ?
                <>
                <img className="mx-auto my-5" src={previewImage} width={160} height={100} alt={"Image preview"} />
                <input
                type='file'
                style={{display:'none'}}
                accept="image/*"
                {...register("user_profile_image")} 
                ref={inputRef}
                onChange={handleFileChange}
                />
                </>
                :
                <div className="relative mt-4 mb-5 ">
                <Image className="mx-auto bg-zinc-500 rounded-full p-3" src='/default_user.svg' width={160} height={100} alt='' />
                <input
                type='file'
                style={{display:'none'}}
                accept="image/*"
                {...register("user_profile_image")} 
                ref={inputRef}
                onChange={handleFileChange}
                />
                <span className="absolute top-1/2 z-99 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <FaCameraRetro className=" text-white bg-black rounded-full px-5 py-2 size-16 z-99 cursor-pointer" onClick={handleClick} />
                </span>
              </div>
              }
              {previewImage && (
                <div onClick={handleClick} className={` bg-white text-black cursor-pointer w-1/2 my-10  mx-auto text-center rounded-3xl py-3`}>
                  Change Profile Picture
              </div>
              )}
              
              <button
                onClick={() => setUserTagPage(true)}
                className={` bg-white text-black cursor-pointer
                 mt-10 w-full  text-center  rounded-3xl py-3 `}
              >
                {user_profile_image ? "Next" : "Skip for now"}
              </button>
              
              
            </div>
          )
          }
          </>
          
        )
}

export default SignUpProfile;