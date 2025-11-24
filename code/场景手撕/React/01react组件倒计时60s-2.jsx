const useCount = ({ targetTime, onEnd }) => {
  const [lastTime, setLastTime] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const diff = dayjs(targetTime).valueOf() - dayjs().valueOf();
      setLastTime(diff);

      if (diff < 0) {
        onEnd && onEnd();
        clearInterval(timerRef.current);
      }
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return {
    lastTime: lastTime < 0 ? 0 : lastTime,
    // formattedTime: formatTime(lastTime),
  };
};

function Test() {
  const { lastTime } = useCount({ targetTime: '2026-01-01' });
  return <>{lastTime}</>;
}
