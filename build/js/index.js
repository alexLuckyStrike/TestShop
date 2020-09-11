let slides = document.querySelectorAll('.slide');
let buttons = document.querySelectorAll('.goods-range__item-btn');

for(let i = 0; i < buttons.length;i++){
    buttons[i].addEventListener('click',function(){
        for(let e =0; e < slides.length; e++){
            if(slides[e].classList.contains(this.value)){
                slides[e].style.display = 'flex';
            }else{
                slides[e].style.display ='none';
            }
        }
    });
}

