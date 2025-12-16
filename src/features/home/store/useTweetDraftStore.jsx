import {create} from "zustand";

 const useTweetDraftStore = create((set) => ({
  tweetText : "",
  media: [],
  mediaURL : [],
  fullTweet: undefined,
  dialogHalfPastVH: false,

  setTweetText: (text) => set({ tweetText: text }),
  setMedia: (media) => set({ media: media }),
  setMediaURL: (urls) => set({ mediaURL: urls }),
  setFullTweet: (item) => set({ fullTweet: item }),
  setDialogHalfPastVH: (value) => set({ dialogHalfPastVH: value }),

  clearDraft: () =>
    set({
      tweetText: "",
      media: [],
      mediaURL: [],
      fullTweet : undefined,
      dialogHalfPastVH: false,
    }),


}));
export default useTweetDraftStore;