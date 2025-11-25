import { useEffect,useState,useRef,useCallback } from "react";

export const useViewpointObserve = (options) => {
  

  const refCallback = useCallback((node) => {
    if(!node) return;

    const observer = new IntersectionObserver(([entry])=>{
      setIsIntersecting(entry.isIntersecting);
    },options)
    const currentRef = ref.current;
    if(currentRef){
      observer.observe(currentRef);
    }
    return() => {
      if(currentRef){
        observer.unobserve(currentRef);
      }
    }
  },[])
  return refCallback
}