const cursor  = document.querySelector('#cursor');
const navItems = document.querySelectorAll('.navItem');
const img = document.querySelector('img');

document.addEventListener('mouseover', e => {
    if (cursor.hasAttribute('hidden')){
        cursor.removeAttribute('hidden')
    };

    cursor.style.left = e.pageX -10 + 'px';
    cursor.style.top = e.pageY -10 + 'px';
});

document.addEventListener('mousemove', e => {
    if (cursor.hasAttribute('hidden')){
        cursor.removeAttribute('hidden')
    };

    cursor.style.left = e.pageX -10 + 'px';
    cursor.style.top = e.pageY -10 + 'px';
});

document.addEventListener('mouseout',() => {
    cursor.setAttribute('hidden','');
})

const addMovingEffect = (element,maxMove,cb,outCB) => {
    element.addEventListener('mousemove',(e) => {
        let changeX = e.pageX - (element.clientWidth/2).toFixed() - element.offsetLeft;
        let changeY = e.pageY - (element.clientHeight/2).toFixed() - element.offsetTop;

        element.style.left = changeX > maxMove || changeX < -maxMove ? '0px' : changeX + 'px';
        element.style.top = changeY > maxMove || changeY < -maxMove ? '0px' : changeY + 'px';

        if(cb) {
            cb()
        }
    });
    element.addEventListener('mouseover',(e) => {
        cursor.style.opacity = 0;

        let changeX = e.pageX - (element.clientWidth/2).toFixed() - element.offsetLeft;
        let changeY = e.pageY - (element.clientHeight/2).toFixed() - element.offsetTop;

        element.style.left = changeX > maxMove || changeX < -maxMove ? '0px' : changeX + 'px';
        element.style.top = changeY > maxMove || changeY < -maxMove ? '0px' : changeY + 'px';
    });
    element.addEventListener('mouseleave',() => {
        cursor.style.opacity = 1;

        element.style.left = 0;
        element.style.top = 0;

        if(outCB){
            outCB()
        }
    });
}

navItems.forEach(item => {
    addMovingEffect(item,20);
});