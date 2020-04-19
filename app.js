const cursor  = document.querySelector('#cursor');
const navItems = document.querySelectorAll('.navItem');
const img = document.querySelector('img');
const footerApplications = document.querySelectorAll('.application');

// the mouseover event listener is for whenever the mouse enters the page but without moving
// like when the page load
document.addEventListener('mouseover', e => {
    // when the cursor enters the web page it will be displayed
    if (cursor.hasAttribute('hidden')){
        cursor.removeAttribute('hidden')
    };

    // positioning the cursor depending on the original cursor posititon.
    // the height and the width of the cursor circle is 20px so there is 10px taken
    // from the x, and y to center the cursor in the original cursor position
    cursor.style.left = e.pageX -10 + 'px';
    cursor.style.top = e.pageY -10 + 'px';
});

// applying the same as above but here when ever the mouse move it will update
document.addEventListener('mousemove', e => {
    if (cursor.hasAttribute('hidden')){
        cursor.removeAttribute('hidden')
    };

    cursor.style.left = e.pageX -10 + 'px';
    cursor.style.top = e.pageY -10 + 'px';
});

// hide the cursor when the it goes outside the page
document.addEventListener('mouseout',() => {
    cursor.setAttribute('hidden','');
})

// the function for adding the cursor cover effect
const addMovingEffect = (element,maxMove,cb,outCB) => {
    element.addEventListener('mousemove',(e) => {
        let changeX,changeY;
        // here it checks for the position type of the parent because the (element.offsetLeft) is relative
        // to the parent position style (wheather it was 'absolute' or something else)
        const parentPositionType = getComputedStyle(element.parentNode).position;
        if (parentPositionType === 'absolute') {
            // here the changeX that will apply equals the cursor coordinate x minus the pixels
            // that are in the left of the element minus the pixels that are in the left of the
            // parent of the elment, and apply the same to y
            changeX = e.pageX - (element.clientWidth/2).toFixed() - element.offsetLeft - element.parentNode.offsetLeft;
            changeY = e.pageY - (element.clientHeight/2).toFixed() - element.offsetTop - element.parentNode.offsetTop;
        } else {
            // but here when the position isn't absolute the offset will be according to the
            // whole window or document
            changeX = e.pageX - (element.clientWidth/2).toFixed() - element.offsetLeft;
            changeY = e.pageY - (element.clientHeight/2).toFixed() - element.offsetTop;
        }

        // applying the cursor effect to the element so when ever the cursor move the element
        // moves, but with a max move given in the arguments of the function
        element.style.left = changeX > maxMove || changeX < -maxMove ? '0px' : changeX + 'px';
        element.style.top = changeY > maxMove || changeY < -maxMove ? '0px' : changeY + 'px';

        // calling a callback function if there was a one
        if(cb) {
            cb()
        }
    });
    element.addEventListener('mouseover',(e) => {
        // hiding the cursor
        cursor.style.opacity = 0;

        let changeX = e.pageX - (element.clientWidth/2).toFixed() - element.offsetLeft;
        let changeY = e.pageY - (element.clientHeight/2).toFixed() - element.offsetTop;

        element.style.left = changeX > maxMove || changeX < -maxMove ? '0px' : changeX + 'px';
        element.style.top = changeY > maxMove || changeY < -maxMove ? '0px' : changeY + 'px';
    });
    element.addEventListener('mouseleave',() => {
        // displaying the cursor when it leaves the element
        cursor.style.opacity = 1;

        // make the element return to its original position when the cursor isn't above it
        element.style.left = 0;
        element.style.top = 0;

        // calling the leave callback function if there was a one
        if(outCB){
            outCB()
        }
    });
}

// applying the effect to the nav items
navItems.forEach(item => {
    addMovingEffect(item,20);
});

// applying the effect to the footer applications icons
footerApplications.forEach(application => {
    addMovingEffect(application,60);
})