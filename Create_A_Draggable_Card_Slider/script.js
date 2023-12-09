const wrapper = document.querySelector(".wrapper");
const carousel =document.querySelector(".carousel");
const arrowBtns =document.querySelectorAll(".wrapper i");
const firstCarWith = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];


let isDragging=false , isAutoPlay = true, startX, startScrollLeft, timeoutId;

//Nhận số lượng thẻ có thể vừa với băng chuyền cùng một lúc
let cardPerView=Math.round(carousel.offsetWidth / firstCarWith);
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin",card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn =>{
    btn.addEventListener("click", () =>{
        carousel.scrollLeft += btn.id === "left" ? -firstCarWith : firstCarWith;
    });
});
const dragStart = (e) =>{
    isDragging=true;
    carousel.classList.add("dragging");
    // Ghi lại con trỏ ban đầu và vị trí cuộn của băng chuyền
    startX=e.pageX;
    startScrollLeft=carousel.scrollLeft;
}

const dragging =(e) =>{
    if( !isDragging) return;
    // Cập nhật vị trí cuộn của băng chuyền dựa trên chuyển động của con trỏ
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () =>{
    isDragging=false;
    carousel.classList.remove("dragging");
}



const infiniteScroll = () => {
    if(carousel.scrollLeft == 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.add("no-transition");
    }
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();

}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);