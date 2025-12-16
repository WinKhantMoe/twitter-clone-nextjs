import useAccountStore from "@/stores/useAccountStore";
import { useLoadingBar } from "react-top-loading-bar";
import useTweetComposeOpen from "@/stores/useTweetComposeOpen";
import useDraftOpen from "@/stores/useDraftOpen";
import { v4 } from "uuid";
import { createTweet } from "@/services/tweet";
import supabase from "@/lib/supabase";
import { saveDraft,deleteSingleDraft } from "@/services/draft";
import useTweetDraftStore from "../store/useTweetDraftStore";

export const useTweetActions = () =>{
  const { token, account } = useAccountStore();
  const { clearDraft } = useTweetDraftStore();
  const { start, complete } = useLoadingBar({ color: "white", height: 2 });
  const { isOpen, setIsOpen } = useTweetComposeOpen();
  const { isOpen: draftOpen, setIsOpen: setDraftOpen } = useDraftOpen();

  const handleCreateDraftTweet = async (data) => {
    start();
    try {
      if (data.fullTweet?.id) {
        const uploadedURLs = await Promise.all(
          data.fullTweet.media.map(async (url) => {
            const parts = url.split("/storage/v1/object/public/")[1];
            if (!parts) return null;

            const [bucket, ...pathParts] = parts.split("/");
            const filePath = pathParts.join("/");

            const { data: copyData,error : copyError } = await supabase.storage
              .from(bucket)
              .copy(filePath, `${account.userTag + v4()}`,{
                destinationBucket : "Tweets"
              });
            console.log(copyData);
            console.log(copyError);
            const resPath = copyData.path.split("Tweets/")[1];
            
            const { data: imageURL } =  supabase.storage
                .from("Tweets")
                .getPublicUrl(resPath);
            
            const { error } = supabase.storage.from(bucket).remove([filePath]);

            return imageURL.publicUrl;
          })
        );
         deleteSingleDraft({id : data.fullTweet.id}, token);
        const finalData = {
          authorId: account.id,
          content: data.tweetText,
          media: uploadedURLs,
        };
        createTweet(finalData, token);
      } else {
        if (data.media?.length > 0) {
          const allMedia = data.media;
          const uploadedURLs = await Promise.all(
            allMedia.map(async (media) => {
              const { data: response, error } = await supabase.storage
                .from("Tweets")
                .upload(account.userTag + v4(), media);
              if (error) throw error;

              
              const { data: imageURL } =  supabase.storage
                .from("Tweets")
                .getPublicUrl(response.path);
              return imageURL.publicUrl;
            })
          );
          const finalData = {
            authorId: account.id,
            content: data.tweetText,
            media: uploadedURLs,
          };
          createTweet(finalData, token);
        } else {
          
          const finalData = {
            authorId: account.id,
            content: data.tweetText,
            media: [],
          };
          createTweet(finalData, token);
        }
      }
    } catch (e) {
      console.log(e);
    }
    
    clearDraft();
    setIsOpen(false);
    complete();
  };
  const handleCreateTweet = async (data) => {
    start();
    try {
      if (data.media.length > 0) {
        const allMedia = data.media;
        const uploadedURLs = await Promise.all(
          allMedia.map(async (media) => {
            const { data: response, error } = await supabase.storage
              .from("Tweets")
              .upload(account.userTag + v4(), media);
            if (error) throw error;

            const { data: imageURL } = supabase.storage
              .from("Tweets")
              .getPublicUrl(response.path);
            return imageURL.publicUrl;
          })
        );
        const finalData = {
          authorId: account.id,
          content: data.tweetText,
          media: uploadedURLs,
        };
        createTweet(finalData, token);
      } else {
        const finalData = {
          authorId: account.id,
          content: data.tweetText,
          media: [],
        };
        createTweet(finalData, token);
      }
    } catch (error) {}
    clearDraft();
    complete();
  };
  const handleCreateDraft = async (data) => {
    start();
    try {
      if (data.media?.length > 0) {
        const allMedia = data.media;
        const uploadedURLs = await Promise.all(
          allMedia.map(async (media) => {
            const { data: response, error } = await supabase.storage
              .from("Drafts")
              .upload(account.userTag + v4(), media);
            if (error) throw error;

            const { data: imageURL } = supabase.storage
              .from("Drafts")
              .getPublicUrl(response.path);
            return imageURL.publicUrl;
          })
        );
        const finalData = {
          authorId: account.id,
          content: data.tweetText,
          media: uploadedURLs,
        };
        saveDraft(finalData, token);
        setIsOpen(false);
        setDraftOpen(false);
      } else if (
        data.mediaURL?.length > 0 &&
        data.media?.length === 0
      ) {
        const finalData = {
          authorId: account.id,
          content: data.tweetText,
          media: data.mediaURL,
        };
        saveDraft(finalData, token);
        setIsOpen(false);
        setDraftOpen(false);
      } else {
        
        const finalData = {
          authorId: account.id,
          content: data.tweetText,
          media: [],
        };
        saveDraft(finalData, token);
        setIsOpen(false);
        setDraftOpen(false);
      }
    } catch (error) {}
    clearDraft();
    complete();
  };

  return {
    handleCreateDraft,
    handleCreateTweet,
    handleCreateDraftTweet
  }
}