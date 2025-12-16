import { useForm } from "react-hook-form";

export const useSingleTweetForm = () =>{
  const methods = useForm({
      mode: "all",
    });

    return{
      ...methods
    }
}