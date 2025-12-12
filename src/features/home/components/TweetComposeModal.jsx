import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogPortal,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import useAccountStore from "@/stores/useAccountStore";
import { useFormContext } from "react-hook-form";
import { ChooseAudience } from "./ChooseAudience";
import { ChooseDraftReply } from "./ChooseDraftReply";
import useDraftOpen from "@/stores/useDraftOpen";
import useTweetComposeOpen from "@/stores/useTweetComposeOpen";
import { DraftSaveModal } from "./DraftSaveModal";
import { ChooseDraftFile } from "./ChooseDraftFile";
import { DraftImagePreview } from "./DraftImagePreview";
import { useState } from "react";
import { DraftsAndSchedule } from "./DraftsAndSchedule";
export const TweetComposeModal = () => {
  const { account } = useAccountStore();
  const [isDraftsOpen, setDraftsOpen] = useState(false);
  const [turnReplyOn, setTurnReplyOn] = useState(false);
  const [turnAudienceOn, setTurnAudienceOn] = useState(false);
  const {
    register,
    watch,
    getValues,
    resetField,
    formState = { errors },
  } = useFormContext();
  const { isOpen, setIsOpen } = useDraftOpen();
  const { isOpen: tweetComposeOpen, setIsOpen: setTweetComposeOpen } = useTweetComposeOpen();

  const draftTweetText = watch("draftTweetText");
  const draftMediaURL = getValues("draftMediaURL");

  return (
    <>
      {isDraftsOpen ? (
        <DraftsAndSchedule setDraftsOpen={setDraftsOpen} />
      ) : (
        <>
          <DialogHeader className="z-20">
            <VisuallyHidden>
              <DialogTitle className=" ">Tweet Compose</DialogTitle>
            </VisuallyHidden>
            <div className="flex  items-center justify-between px-2">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {draftMediaURL?.length > 0 || draftTweetText?.length > 0 ? (
                  <DialogTrigger className=" cursor-pointer">
                    <span
                      className={`text-xl px-2 cursor-pointer
                         hover:border-zinc-500 hover:bg-zinc-500  
                         border-4 rounded-full  bg-black border-black text-white`}
                    >
                      X
                    </span>
                  </DialogTrigger>
                ) : (
                  <span
                    onClick={()=>setTweetComposeOpen(tweetComposeOpen)}
                    className={`text-xl px-2 cursor-pointer
                         hover:border-zinc-500 hover:bg-zinc-500  
                         border-4 rounded-full  bg-black border-black text-white`}
                  >
                    X
                  </span>
                )}

                <DialogContent
                  className="bg-black text-white w-fit border-black p-0"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <DraftSaveModal />
                </DialogContent>
              </Dialog>

              <div
                onClick={() => setDraftsOpen(true)}
                className="text-blue-500 hover:cursor-pointer mr-5"
              >
                Drafts
              </div>
            </div>
          </DialogHeader>

          <div className="flex flex-col  p-4 border-x  border-black">
            <div className="flex ">
              {account?.user_profile_image ? (
                <img
                  src={account.user_profile_image}
                  className="p-2 size-16 rounded-full"
                />
              ) : (
                <img
                  src="/default_user.svg"
                  className="p-2 size-12 rounded-full"
                />
              )}
              <div className={`flex w-full flex-col`}>
                <ChooseAudience />

                <input
                  placeholder="What's happening?"
                  className={`text-xl ml-3 w-full 
             font-semibold focus:outline-none focus:ring-0  text-white`}
                  {...register("draftTweetText")}
                />
                {draftMediaURL && <DraftImagePreview />}
              </div>
            </div>

            <ChooseDraftReply />

            <hr className="border-zinc-700 my-3"></hr>

            <ChooseDraftFile setDraftOpen={setIsOpen} />
          </div>
          {isOpen && (
            <div className="bg-white rounded-md border-0 opacity-40 absolute w-full h-full z-30"></div>
          )}
        </>
      )}
    </>
  );
};
