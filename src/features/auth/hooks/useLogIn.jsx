import supabase from "@/lib/supabase";
import { useLoadingBar } from "react-top-loading-bar";
import { set, useForm } from "react-hook-form";
import useAccountStore from "@/stores/useAccountStore";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Login } from "@/services/auth";
import { base64ToArrayBuffer, base64ToFile } from "@/services/image";

const useLogIn = () => {
  const methods = useForm({ mode: "all" });
  const router = useRouter();
  const { setAccount, setToken } = useAccountStore();
  const { start, complete } = useLoadingBar({
    color: "white",
    height: 2,
  });

  const tableLogInUser = async (values) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^\+?[0-9\s\-().]{7,15}$/;
    start();
    if (emailRegex.test(values.identifier)) {
      const res = await Login({
        email: values.identifier,
        password: values.password,
      });

      const data = await res.json();
      
      setToken(data.accessToken);
      setAccount(data.safeUser);
    } else if (phoneRegex.test(values.identifier)) {
      const res = await Login({
        phone: values.identifier,
        password: values.password,
      });
      const data = await res.json();
      const file = base64ToFile(
        data.user.user_profile_image,
        "user_profile_image"
      );
      
      data.user.user_profile_image = file;

      setToken(data.accessToken);
      setAccount(data.safeUser);
    } else {
      const res = await Login({
        username: values.identifier,
        password: values.password,
      });
      const data = await res.json();
      
      setToken(data.accessToken);
      setAccount(data.safeUser);
    }
    complete();
    router.push("/home");
  };
  return {
    ...methods,
    tableLogInUser,
  };
};

export default useLogIn;
