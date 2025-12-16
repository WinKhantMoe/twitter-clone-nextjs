import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { FaMarker } from "react-icons/fa";
import { Check } from "lucide-react";
import { deleteDrafts } from "@/services/draft";
import useAccountStore from "@/stores/useAccountStore";
import { useLoadingBar } from "react-top-loading-bar";
import useTweetDraftStore from "../store/useTweetDraftStore";
import useTweetComposeOpen from "@/stores/useTweetComposeOpen";

export const DraftList = ({ drafts,editMode,setDraftsOpen }) => {
  const {setTweetText,setMediaURL,setMedia,setFullTweet} = useTweetDraftStore();
  const { isOpen: tweetComposeOpen, setIsOpen: setTweetComposeOpen } = useTweetComposeOpen();
  const [selected, setSelected] = useState([]);
  const { token } = useAccountStore();
  const { start, complete } = useLoadingBar({
    color: "white",
    height: 2,
  });
  
  
  const handleDelete = () => {
    start();
    deleteDrafts(selected,token);
    complete();
    setTweetComposeOpen(false);
  };
  const handleSelect = (id) => {
    if (selected.length === 0) {
      setSelected([id]);
    } else if (selected.includes(id)) {
      const tempSelect = selected.filter((item) => item !== id);
      console.log(tempSelect);
      setSelected(tempSelect);
    } else {
      setSelected([...selected, id]);
    }
  };
  const handleSelectAll = () =>{
    let tempSelect = [];
     drafts.map((draft)=> tempSelect.push(draft.id));
     setSelected(tempSelect);
  }
  return (
    <div className="overflow-y-auto scrollbar-thumb-hover">
      {drafts[0] === undefined ? (
        <div className="flex mt-8 min-h-[60vh] max-h-[60vh]">
          <div className="mx-auto max-w-[60%] ">
            <h3 className="font-bold text-3xl">Hold that thought</h3>
            <p className="py-2 text-zinc-400">
              Not ready to post just yet?Save it to your drafts or schedule it
              for later.
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-[60vh] max-h-[60vh] max-w-fit ">
          {drafts?.map((draft, index) => {
            return (
              <div
                onClick={() => {
                  if(editMode){
                    handleSelect(draft.id)
                  }else{
                    setMediaURL(draft.media);
                    setTweetText(draft.content);
                    setFullTweet(draft);
                    setDraftsOpen(false);
                  }
                  
                }}
                className={`flex min-h-20 justify-between cursor-pointer px-3 hover:bg-zinc-900 border-zinc-500 border-b py-3`}
                key={index}
              >
                <div className="flex   max-w-1/2 truncate items-center gap-3">
                  {editMode === true && (
                    <div className="relative">
                      <div
                        className={`${
                          selected?.includes(draft.id)
                            ? "bg-blue-500 border-blue-500"
                            : "border-zinc-500"
                        } border-2  rounded-sm size-5`}
                      ></div>
                      {selected?.includes(draft.id) &&
                        <Check className="absolute top-0.5 left-0.5 size-4" />
                      }
                      
                    </div>
                  )}

                  <div className="">{draft?.content}</div>
                </div>

                <div
                  className={`grid w-40 gap-1 ${
                    draft?.media.length > 2 && "grid-cols-2"
                  } ${draft?.media.length === 2 && "grid-cols-2"} `}
                >
                  {draft?.media.map((media, index) => {
                    return (
                      <img
                        className={`${
                          draft?.media.length > 2 && "row-span-2"
                        } h-16 w-full object-cover`}
                        src={media}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        {editMode &&
        <div className="flex justify-between px-3 pt-2">
        {selected.length === drafts.length ? (
          <div onClick={()=>setSelected([])} className="text-blue-500 py-1 px-3 hover:bg-blue-900 rounded-full cursor-pointer">
            Deselect All
          </div>
        ) : (
          <div onClick={()=>handleSelectAll()} className="text-blue-500 py-1 px-3 hover:bg-blue-900 rounded-full cursor-pointer">
            Select All
          </div>
        )}
        
        <div onClick={()=>handleDelete()} className="text-red-500 py-1 px-3 hover:bg-red-900 rounded-full cursor-pointer">
          Delete
        </div>
      </div>
      }
        </div>
      )}
      
      
    </div>
  );
};
