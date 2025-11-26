import supabase from "@/lib/supabase";
import { Table } from "lucide-react";
import { useLoadingBar } from "react-top-loading-bar";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSignUpModalOpen from "@/stores/useSignUpModalOpen";
import { Register } from "@/services/auth";

const useRegister = () => {
  const methods = useForm({ mode: "all",
   
   });
  const router = useRouter();
  const { isOpen:signUpOpen,setIsOpen:setSignUpOpen} = useSignUpModalOpen();
  const {start,complete} = useLoadingBar({
    color: "white",
    height: 2
  })
 
  const tableSignUpUser = async (data) => {
    start();
    try{
      const {data:response,error} = await supabase.storage.from('Users').upload(data.username,data.user_profile_image);
      
      const {data:imageURL} = supabase.storage.from('Users').getPublicUrl(response.path);
      
      data.user_profile_image = imageURL.publicUrl;
      const res = await Register(data);
      
      const json = res.json();

      if(!res.ok){
        throw new Error(json.message);
      }

      setSignUpOpen();
      methods.reset();
      complete();
      
    }catch(error){
      
    }

        
      
    
  };

  return {
    ...methods,
    tableSignUpUser,
    
    
  };
};

export default useRegister;
