import ChosenHomeTab from "./ChosenHomeTab";
import HomeHeader from "./HomeHeader";
import useAccountStore from "@/stores/useAccountStore";
import useTweet from "../hooks/useTweet";
import { ChooseAudience } from "./ChooseAudience";
import { ChooseReply } from "./ChooseReply";
import { ChooseFileAttach } from "./ChooseFileAttach";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TweetImagePreview } from "./TweetImagePreview";

const HomeMiddleTab = () => {
  const { account } = useAccountStore();
  const [draftOpen, setDraftOpen] = useState(false);
  const { register, watch,getValues, resetField, formState = { errors } } = useFormContext();

  const tweetText = watch("tweetText");
  const mediaURL = getValues("mediaURL");
 
  return (
    <div className="w-full text-white ">
      <HomeHeader />
      <div className="flex   p-4 border-x border-b border-zinc-600">
        {account?.user_profile_image ? (
          <img
            src={account.user_profile_image}
            className="p-2 size-16 rounded-full"
          />
        ) : (
          <img src="/default_user.svg" className="p-2 size-12 rounded-full" />
        )}
        <div className={`flex-1 ${draftOpen === false && "flex  flex-col"}`}>
          {draftOpen && <ChooseAudience />}

          <input
            onClick={() => setDraftOpen(true)}
            placeholder="What's happening?"
            className={`text-xl ml-3 w-full ${draftOpen === false && "mt-4 mb-10"} font-semibold focus:outline-none focus:ring-0  text-white`}
            {...register("tweetText")}
          />
          {mediaURL && (
            <TweetImagePreview  />
          )

          }
          {draftOpen && (
            <>
              <ChooseReply />
              <hr className="border-zinc-700 my-3"></hr>
              
            </>
            
          )}
          <ChooseFileAttach setDraftOpen={setDraftOpen} />
        </div>
      </div>
      <ChosenHomeTab />
    </div>
  );
};

export default HomeMiddleTab;
