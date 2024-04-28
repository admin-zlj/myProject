const { useRef, useEffect, useState } = require('react');

function Compontent() {
  const [nowTime, setNowTime] = useCount(0);
  const onClick = () => {
    setNowTime(60);
  };
  return (
    <>
      <button onClick={onClick}>{nowTime}</button>
    </>
  );
}

function useCount(init) {
  const [secound, setSecound] = useState(init);
  const timerRef = useRef();
  const isCountLoading = useRef().current;

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startCount = () => {
    if (isCountLoading) return;
    isCountLoading = true;
    timerRef.current = setInterval(() => {
      if (secound <= 0) {
        clearInterval(timerRef.current);
        isCountLoading = false;
      } else {
        setSecound((s) => s - 1);
      }
    }, 1000);
  };
  
  return [secound, startCount];
}
