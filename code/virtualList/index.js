// 获取dom
const virtualViewportDom = document.querySelector('.virtual-scroll-viewport');
const virtualSpacerDom = document.querySelector('.virtual-scroll-spacer');
const virtualListDom = document.querySelector('.virtual-scroll-list');
const VIEWPORT_HEIGHT = 300; // 视口高度
const ITEM_HEIGHT = 50; // 列表项高度
const COUNT = 10; // 渲染数量
const TOTAL_COUNT = 100; // 总条数
const TOTAL_HEIGHT = ITEM_HEIGHT * TOTAL_COUNT; // 总高度
let scrollTop = 0, translateY = 0;
virtualSpacerDom.style.height = TOTAL_HEIGHT + 'px';

// 监听scroll事件
virtualViewportDom.addEventListener('scroll', function (e) {
    scrollTop = this.scrollTop;
    const start = Math.max(Math.floor(scrollTop / ITEM_HEIGHT) - 2, 0);
    const end = Math.min(start + COUNT, TOTAL_COUNT);
    const y = start * ITEM_HEIGHT;
    if (scrollTop === 0 || scrollTop === TOTAL_HEIGHT - VIEWPORT_HEIGHT || Math.abs(translateY - y) >= 100) {
        render(start, end);
        translateY = y;
        virtualListDom.style.transform = 'translate3d(0px, ' + translateY + 'px, 0px)';
    }
});

// 初次渲染
render(0, COUNT);

function render(start, end) {
    let html = '';
    // 移除多余的dom
    let list = document.querySelectorAll('.virtual-scroll-item');
    // for (const item of list) {
    //     const index = Number(item.dataset.index);
    //     if (index < start || index >= end) {
    //         item.remove();
    //     }
    // }
    // list = document.querySelectorAll('.virtual-scroll-item');
    // if (list.length > 0) {
    //     const lastStart = Number(list[0].dataset.index);
    //     const lastEnd = Number(list[list.length - 1].dataset.index);
    //     if (end - 1 - lastEnd > 0) { // 下滑
    //         for (let i = lastEnd + 1; i < end; i++) {
    //             html += '<div class="virtual-scroll-item" data-index="' + i + '">item' + i + '</div>';
    //         }
    //         virtualListDom.insertAdjacentHTML('beforeend', html);
    //     } else if (start - lastStart < 0) { // 上滑
    //         for (let i = start; i < lastStart; i++) {
    //             html += '<div class="virtual-scroll-item" data-index="' + i + '">item' + i + '</div>';
    //         }
    //         virtualListDom.insertAdjacentHTML('afterbegin', html);
    //     }
    // } else {
        // 快速滑动或拖动滚动条或初次渲染
        for (let i = start; i < end; i++) {
            html += '<div class="virtual-scroll-item" data-index="' + i + '">item' + i + '</div>';
        }
        virtualListDom.innerHTML = html;
    // }
}