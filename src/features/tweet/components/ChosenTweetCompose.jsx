import {
  Image,
  Gif,
  Settings2,
  Smile,
  CalendarClock,
  MapPin,
  PlusIcon,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { use, useRef, useEffect,useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useAccountStore from "@/stores/useAccountStore";
import { TweetImagePreview } from "@/features/home/components/TweetImagePreview";
export const ChosenTweetCompose = (author) => {
  const { register, handleSubmit, setValue, watch } = useFormContext();
  const [draftOpen, setDraftOpen] = useState(false);
  const {account} = useAccountStore();
  const mediaRef = useRef(null);
  const text = watch("tweetText");
  const media = watch("media");
  const mediaURL = watch("mediaURL");
  const allData = watch();

  console.log(text?.length);
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);

    setValue("media", [...media, file]);
    if (mediaURL !== undefined) {
      setValue("mediaURL", [...mediaURL, fileURL]);
    } else {
      setValue("mediaURL", [fileURL]);
    }
  };
  const handleClick = () => mediaRef.current.click();
  return (
    <div className={`flex w-full ${!draftOpen && "items-center"}  border-t border-zinc-600 pt-2 py-4`}>
      {account?.user_profile_image ? (
          <img
            src={account.user_profile_image}
            className={`p-2 ${draftOpen === true && "mt-8"}  size-16 rounded-full`}
          />
        ) : (
          <img src="/default_user.svg" className={`p-2 ${draftOpen === true && "mt-8"}  size-12 rounded-full`} />
        )}
      <div className="w-full flex flex-col">
        {draftOpen &&
          <div className="w-fit text-zinc-500 ">
          Replying to{" "}
          <span className="text-blue-500">@{author?.author?.userTag}</span>
        </div>
        }
        
        <div className="">
          <div className="flex justify-between items-center">
            <input
            onClick={() => setDraftOpen(true)}
            placeholder="Post your reply"
            className={`text-xl  w-full ${
              draftOpen === true && "mt-4 mb-5"
            } font-semibold focus:outline-none focus:ring-0  text-white`}
            {...register("tweetText")}
          />
          <button
              onClick={() => {}}
              className={`bg-zinc-500 ${
                draftOpen === true && "hidden"
              } text-black font-semibold px-4 py-1.5 rounded-3xl`}
            >
              Reply
            </button>
          </div>
          
          {mediaURL && <TweetImagePreview />}
        </div>
        {draftOpen &&
            <div className="flex justify-between w-full">
          <div className="flex items-center text-blue-500 gap-3">
            <div className="relative group" onClick={() => handleClick()}>
              <Image className="h-5 cursor-pointer " />
              <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2 -top-2.5  group-hover:opacity-10 opacity-0"></div>
              <div className="absolute p-1 rounded-xs text-white bg-zinc-600 text-xs -left-2 top-8 group-hover:opacity-100 opacity-0">
                Media
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                {...register("media")}
                ref={(e) => {
                  mediaRef.current = e;
                  register("media").ref(e);
                }}
                style={{ display: "none" }}
                onChange={handleMediaChange}
              />
            </div>
            <div className="relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
              <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2 -top-2 z-10 group-hover:opacity-10 opacity-0"></div>
              <div className="absolute px-2 py-1 rounded-xs text-white bg-zinc-600 text-xs -left-1 top-8 group-hover:opacity-100 opacity-0">
                GIF
              </div>
            </div>
            <div className="relative group">
              <img src="/grok_blue.png" className="h-5 cursor-pointer" />
              <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2.5   -top-2.5 z-10 group-hover:opacity-10 opacity-0"></div>
              <div className="absolute p-1 rounded-xs text-white bg-zinc-600 text-xs -left-17 top-8 group-hover:opacity-100 opacity-0 text-nowrap">
                Enhance your post with Grok
              </div>
            </div>

            <div className="relative group">
              <Smile className="h-5 cursor-pointer" />
              <div className="bg-blue-500 absolute cursor-pointer size-10 rounded-full -left-2   -top-2.5 z-10 group-hover:opacity-10 opacity-0"></div>
              <div className="absolute p-1 rounded-xs text-white bg-zinc-600 text-xs -left-2 top-8 group-hover:opacity-100 opacity-0">
                Emoji
              </div>
            </div>

            <MapPin className="opacity-50 h-5 cursor-pointer" />
          </div>
          <div className="flex gap-3 items-center">
            <div
              className={`${
                text?.length > 0 || (text === "" && "hidden")
              } flex items-center gap-2`}
            >
              <div className="h-5 w-5">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: "#4299e1",
                    trailColor: "#71717a",
                  })}
                  value={text?.length}
                  maxValue={280}
                />
              </div>
              <div className="border-l h-8 border-zinc-500"></div>
              <PlusIcon className="border cursor-pointer text-blue-500 size-6 p-1 rounded-full border-zinc-500" />
            </div>
            <button
              onClick={() => {}}
              className={`bg-white opacity-50 pointer-events-none  ${
                media?.length > 0 && "cursor-pointer opacity-100"
              } ${text?.length > 0 &&  "cursor-pointer opacity-100"} text-black font-semibold px-4 py-1.5 rounded-3xl`}
            >
              Reply
            </button>
          </div>
        </div>
        }
        
      </div>
    </div>
  );
};
