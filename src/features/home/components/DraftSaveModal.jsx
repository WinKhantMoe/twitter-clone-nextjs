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
import useDraftOpen from "@/stores/useDraftOpen";
import useTweetComposeOpen from "@/stores/useTweetComposeOpen";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { get } from "idb-keyval";
import { useFormContext } from "react-hook-form";
import useTweetDraftStore from "../store/useTweetDraftStore";
import { useTweetActions } from "../hooks/useTweetActions";

export const DraftSaveModal = () => {
  const {isOpen : draftOpen, setIsOpen :setDraftOpen} = useDraftOpen();
  const {isOpen,setIsOpen} = useTweetComposeOpen();
  const {media,tweetText,mediaURL,clearDraft} = useTweetDraftStore();
  const {handleCreateDraft} = useTweetActions();
  const data = {
    tweetText : tweetText,
    media : media,
    mediaURL : mediaURL
  }

  const discard = () =>{
    clearDraft();
    setIsOpen(isOpen);
    setDraftOpen(draftOpen);
  }
  return (
    <div className="flex flex-col  p-4 border-x max-w-[80%] mx-auto border-black bg-black">
      <DialogHeader className="z-99">
        <VisuallyHidden>
          <DialogTitle className=" ">Tweet Compose</DialogTitle>
        </VisuallyHidden>
        
      </DialogHeader>
      <div className="text-2xl font-semibold">Save post?</div>
      <div className="mt-1 mb-6 text-zinc-500">You can save this to send later from your drafts</div>
      <button onClick={()=>handleCreateDraft(data)} className="my-2 cursor-pointer bg-white py-2 rounded-full text-black">Save</button>
      <button onClick={()=>{discard()}} className="my-2 cursor-pointer border-zinc-400 border py-2 rounded-full">Discard</button>
    </div>
  );
};
