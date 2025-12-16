import { useForm } from "react-hook-form";

export const useTweetForm = () =>{
  const methods = useForm({
      mode: "all",
      defaultValues: {
        halfPastVH: false,
        
      },
    });

    return{
      ...methods
    }
}