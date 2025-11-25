import useChooseHomeTab from "@/stores/useChooseHomeTab";
import HomeForYou from "./HomeForYou";
const ChosenHomeTab = () => {
  const {isChosenTab,setIsChosenTab} = useChooseHomeTab();
  return(
    <div className="text-white w-full border-x border-zinc-600 h-auto ">
      {isChosenTab === "forYou" && (
        <HomeForYou />
      )
      }
    </div>
  )
}

export default ChosenHomeTab;