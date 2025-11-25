import supabase from "@/lib/supabase";

const useSupabaseDatabase = () => {

  const fetchUsers = async () =>{
    const {data,error} = await supabase.from("Users").select("*");
    return {data,error};
  }
  const fetchUser = async (userId) =>{
    const {data,error} = await supabase.from("Users").select("*").eq("id",userId);
    return {data,error};
  }

  return {
    fetchUser,
    fetchUsers
  }
}

export default useSupabaseDatabase;