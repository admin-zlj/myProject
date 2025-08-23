const visrtualViewport = document.querySelector(".virtual-scroll-viewport");
const visrtualSpacer = document.querySelector(".virtual-scroll-spacer");
const visrtualList = document.querySelector(".virtual-scroll-list");
const VIEWPORT_HEIGHT = 300;	// 视口高度
const ITEM_HEIGHT = 50;		// 列表项高度
const RENDER_COUNT = 10;	// 渲染数量
const TOTAL_COUNT = 1000;	// 总条数
const TOTAL_HEIGHT = ITEM_HEIGHT * TOTAL_COUNT; //总高度
visrtualSpacer.style.height = `${TOTAL_HEIGHT}px`;
let translateY = 0;
const render = (start, end) => {
	let html = "";
	for (let i = start; i < end; i++) {
		html += `<div class="virtual-scroll-item" >item${i}</div>`;
	}
	visrtualList.innerHTML = html;
};
// 初次渲染
render(0, RENDER_COUNT);

visrtualViewport.addEventListener("scroll", function () {
	let scrollTop = this.scrollTop;
	const startIndex = Math.max(Math.floor(scrollTop / ITEM_HEIGHT) - 2, 0);
	const endIndex = Math.min(startIndex + RENDER_COUNT, TOTAL_COUNT);
	const y = startIndex * ITEM_HEIGHT;

	if ( scrollTop === 0 || scrollTop === TOTAL_HEIGHT - VIEWPORT_HEIGHT || Math.abs(translateY - y) >= ITEM_HEIGHT * 2 ) {
		render(startIndex, endIndex);
		translateY = y;
		visrtualList.style.transform = "translate3d(0px, " + translateY + "px, 0px)";
		// visrtualList.style.transform = 'translateY(' + translateY + 'px)';
	}
});
