const carousel =document.querySelector(".carousel");

let isDragging=false , isAutoPlay = true, startX, startScrollLeft, timeoutId;

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

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);