import { useEffect, useRef } from "react";

const useEventListener = (
  eventType: string,
  callback: (e: any) => void,
  element: any = window
) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element?.current === null) return;
    const handler = (e: any) => callbackRef.current(e);

    element.addEventListener(eventType, handler);
    return () => {
      if (element?.current === null) return;
      element.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
};

export default useEventListener;
