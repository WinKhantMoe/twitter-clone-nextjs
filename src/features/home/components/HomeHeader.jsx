import useChooseHomeTab from "@/stores/useChooseHomeTab";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const HomeHeader = () => {
  const { isChosenTab, setIsChosenTab } = useChooseHomeTab();
  return (
    <div className="border-b pb-0.5 z-20 sticky top-0 border-x bg-black border-zinc-600 w-full text-white">
      <Carousel className={'relative'}>
        <CarouselContent className={'-ml-0'}>
          <CarouselItem className={'basis-auto pr-3 flex justify-center hover:bg-zinc-800'}>
            <div
              onClick={() => setIsChosenTab("forYou")}
              className={`w-fit cursor-pointer ${
                isChosenTab === "forYou" ? "font-bold" : 'text-zinc-400'
              }`}
            > 
            <div
                className={`mt-2`}
              ></div>
              For you
              <div
                className={`${
                  isChosenTab === "forYou" &&
                  "bg-blue-400 mt-2 p-0.5 rounded-full"
                }`}
              ></div>
            </div>
          </CarouselItem>
          <CarouselItem className={'basis-auto pr-3 flex justify-center hover:bg-zinc-800'}>
            <div
              onClick={() => setIsChosenTab("following")}
              className={`w-fit cursor-pointer ${
                isChosenTab === "following" ? "font-bold" : 'text-zinc-400'
              }`}
            >
              <div
                className={`mt-2`}
              ></div>
              Following
              <div
                className={`${
                  isChosenTab === "following" &&
                  "bg-blue-400 mt-2 p-0.5 rounded-full"
                }`}
              ></div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className={`absolute left-1 bg-black border-black disabled:hidden`} />
        <CarouselNext className={`absolute right-1 bg-black border-black disabled:hidden`} />
      </Carousel>
    </div>
  );
};
export default HomeHeader;
