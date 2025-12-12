import { ArrowBigLeft, ArrowLeft } from "lucide-react"
import { useState } from "react";
import { DraftList } from "./DraftList";
import { useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { fetchDrafts } from "@/services/draft";
import useSWRInfinite from "swr/infinite";
import useAccountStore from "@/stores/useAccountStore";

export const DraftsAndSchedule = ({setDraftsOpen}) => {
  const [isOpen,setIsOpen] = useState("unsent");
  const [editMode,setEditMode] = useState(false);
  const {token,account} = useAccountStore();
  const shouldFetch = !!token;

  const getKeyForDrafts = (pageIndex, previousPageData) => {
    if (!token) return null;
    if (previousPageData && !previousPageData.nextCursor) return null;

    const base = process.env.NEXT_PUBLIC_DATABASE_URL + "/drafts/fetchDrafts";

    if (pageIndex === 0) {
      return `${base}?limit=10`;
    }

    return `${base}?cursor=${previousPageData.nextCursor}&limit=10`;
  };
  
  const {
    data: draftsData,
    size: draftSize,
    setSize: setDraftSize,
    mutate: draftsMutate,
  } = useSWRInfinite(
    shouldFetch ? getKeyForDrafts : null,
    (key) => fetchDrafts(key,{id :account.id}, token),
    {
      keepPreviousData: true,
    }
  );

  const drafts = draftsData ? draftsData.flatMap((data) => data.drafts) : [];
  return(
    <div className="">
      <div className="flex justify-between items-center px-5  ">
        <div className="flex items-center gap-5">
        <ArrowLeft onClick={()=>setDraftsOpen(false)} className="hover:bg-zinc-900 p-2 rounded-full cursor-pointer size-10"/>
        <span className="text-xl font-semibold">Drafts</span>
        </div>
        {drafts.length > 0 & editMode === false ?
          <div onClick={()=>setEditMode(true)} className="px-4 cursor-pointer rounded-full py-1 text-black bg-white">
            Edit
          </div>
          :
          <div onClick={()=>setEditMode(false)} className="px-4 cursor-pointer rounded-full py-1 text-black bg-white">
            Done
          </div>
        }
      </div>
      <div className="flex justify-between border-b  border-zinc-600">
        <div onClick={()=>setIsOpen("unsent")} className="w-full hover:bg-zinc-900  cursor-pointer">
          <div className="w-fit mx-auto">
            <div className={`text-center text-lg py-2  ${isOpen === "unsent" ? "text-white font-semibold" : "text-zinc-500 "} `}>
               Unsent posts
            </div>
            <div
                className={`${
                  isOpen=== "unsent" &&
                  "bg-blue-400 mt-2 p-0.5 rounded-full"
                }`}
              ></div>
              </div>
        </div>
        <div onClick={()=>setIsOpen("scheduled")} className="w-full hover:bg-zinc-900  cursor-pointer">
          <div className="w-fit mx-auto">
            <div className={`text-center text-lg py-2  ${isOpen === "scheduled" ? "text-white font-semibold" : "text-zinc-500 "} `}>
               Scheduled
            </div>
            <div
                className={`${
                  isOpen=== "scheduled" &&
                  "bg-blue-400 mt-2 p-0.5 rounded-full"
                }`}
              ></div>
              </div>
        </div>
      </div>
      {isOpen === "unsent"
        ?
          <DraftList drafts={drafts} editMode={editMode} setDraftsOpen={setDraftsOpen} />
        :
          <DraftList drafts={drafts} editMode={editMode} setDraftsOpen={setDraftsOpen} />
      }
      
    </div>
  )
}