const slider = document.querySelector(".slider");
const firstImg = slider.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");


let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
let firstImgWidth = firstImg.clientWidth + 14;
let scrollWidth = slider.scrollWidth - slider.clientWidth;

const showHideIcons = () => {

    //By using Ternary Operator
    // arrowIcons[0].style.display = slider.scrollLeft == 0 ? "none" : "block";
    // arrowIcons[1].style.display = slider.scrollLeft == scrollWidth ? "none" : "block";
    if(slider.scrollLeft == 0){
        arrowIcons[0].style.display = "none";
    }else{
        arrowIcons[0].style.display = "block";
    }
    if(slider.scrollLeft == scrollWidth){
        arrowIcons[1].style.display = "none";
    }else{
        arrowIcons[1].style.display = "block";
    }

}

arrowIcons.forEach(icon => {

    icon.addEventListener("click", () => {
        slider.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoSlide = () => {

    if(slider.scrollLeft == (slider.scrollWidth - slider.clientWidth)){
        return;
    }

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDiff = firstImgWidth - positionDiff;

    if(slider.scrollLeft > prevScrollLeft){
        // console.log("Swiping Right");
        return slider.scrollLeft += positionDiff > firstImgWidth / 3 ? valDiff : -positionDiff;
    }
    // console.log("Swiping Left");
    return slider.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDiff : -positionDiff;

} 

const dragStart = (e) => {
// Updating global variables value on mouse down Event 
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;

}

const dragging = (e) => {

    if(!isDragStart){
        return;
    }
    e.preventDefault();
    isDragging = true;
    slider.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = (e) => {

    isDragStart = false;
    slider.classList.remove("dragging");
    if(!isDragging){
        return;
    }
    isDragging = false;
    autoSlide();
}

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

slider.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

slider.addEventListener("mouseup", dragStop);
slider.addEventListener("mouseleave", dragStop);
slider.addEventListener("touchend", dragStop);

