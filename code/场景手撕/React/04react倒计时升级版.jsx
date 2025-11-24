/**
 * 四、考察技术栈
 * 请通过 React Hooks API 实现一个具有倒计时功能的自定义 Hook useCountdown，
 * 要求可以使组件每秒自动更新倒计时。
 * 当超过倒计时截止时间 targetDate 时，变成正计时（返回的 expired 为 false)
 *
 * @param {Date} targetDate 倒计时截止时间
 */
function useCountdown(targetDate) {
	// 你的代码实现...
	const [timeInfo, setTimeInfo] = useState(getTargetDateInfo(targetDate));
	const timer = useRef().current;
	useEffect(() => {
	  timer = setInterval(() => {
		setTimeInfo(getTargetDateInfo(targetDate));
	  }, 1000);
	  return () => clearInterval(timer);
	}, [targetDate]);
	// 返回的数据结构示例
	return {
	  ...timeInfo,
	};
  }
  
  /**
   *
   * @param {Date} targetDate
   */
  function getTargetDateInfo(targetDate) {
	const diff = targetDate - new Date();
	let expired = false;
  
	if (diff < 0) {
	  expired = true;
	  diff = diff * -1;
	}
  
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
	return {
	  expired,
	  days,
	  hours,
	  minutes,
	  seconds,
	};
  }
  