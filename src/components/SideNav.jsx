"use client";
import Image from "next/image";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaEllipsisH,
  FaRegCircle,
  FaFeatherAlt,
  FaPlus,
} from "react-icons/fa";
import useAccountStore from "@/stores/useAccountStore";
import { base64ToFile } from "@/services/image";

const SideNav = () => {
  const { account: account } = useAccountStore();

  return (
    <div className=" ml-24 flex items-center flex-col float-right mr-3 mt-2">
      <div className="flex flex-col w-fit  items-center float-right">
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <Image
            src="/X_logo_white.png"
            className="z-10"
            width={25}
            height={30}
            alt=""
          />
        </div>
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaHome className="mt-2 mb-2 text-white " size={30} />
        </div>
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaSearch className=" text-white " size={30} />
        </div>
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaBell className="text-white  " size={30} />
        </div>
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaEnvelope className="text-white  " size={28} />
        </div>
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <Image
            src="/grok_white.png"
            className=" "
            width={32}
            height={30}
            alt=""
          />
        </div>
        <div className="flex items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaUser className="text-white  " size={30} />
        </div>
        <div className="flex relative items-center justify-center rounded-full size-12 hover:border-zinc-900 hover:bg-zinc-900">
          <FaRegCircle className="text-white " size={30} />
          <FaEllipsisH className="text-white  absolute top-4ft-2" size={15} />
        </div>

        <div className="flex mt-2 cursor-pointer relative bg-white  items-center justify-center rounded-full size-12">
          <FaFeatherAlt className=" " size={25} />
          <FaPlus className="  absolute top-1.5 left-2.5" size={13} />
        </div>
      </div>

      {account?.user_profile_image ? (
        <div className=" mt-12 flex relative items-center justify-center rounded-full size-18 hover:border-zinc-900 hover:bg-zinc-900">
          <img
            src={account.user_profile_image}
            className=" rounded-full size-12  "
            alt=""
          />
        </div>
      ) : (
        <div className="mt-12 flex relative items-center justify-center rounded-full size-14 hover:border-zinc-900 hover:bg-zinc-900">
          <img
            src="/default_user.svg"
            className=" size-12 rounded-full object-fill px-1 py-1 "
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default SideNav;
