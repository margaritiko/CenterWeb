/*! Elastic Slider (c) 2014 // Taron Mehrabyan // Ruben Sargsyan
 */

window.addEventListener('load', onWndLoad);

function onWndLoad() {

    var slider = document.getElementsByClassName('slider');

    var sliders=[];
    var prevSlide = [];
    var curSlide = [];
    for(i=0;i<slider.length;i++)
    {
        sliders.push(slider[i].children);
        prevSlide.push(null);
        curSlide.push(null);
    }



    var initX = null;
    var transX = 0;
    var rotZ = 0;
    var transY = 0;
var num=null;

    var Z_DIS = 50;
    var Y_DIS = 10;
    var TRANS_DUR = 0.2;

    //var images=document.querySelectorAll('img');
    /*for(var i=0;i<images.length;i++)
    {
        images[i].onmousemove=function(e){
            e.preventDefault()

        }
        images[i].ondragstart=function(e){
            return false;

        }
    }*/

    function init() {
        for(i=0;i<slider.length;i++)
        {
            attachEvents(sliders[i][sliders[i].length - 1],i);
        }
    }
    function attachEvents(elem,i) {
        curSlide[i] = elem;
        num=i;
        curSlide[i].addEventListener('mousedown', function () {num=i;

        }, false);
        curSlide[i].addEventListener('touchstart', function () {
            num=i;
            }
            , false);
        curSlide[i].addEventListener('mousedown', slideMouseDown(), false);
        curSlide[i].addEventListener('touchstart', slideMouseDown(), false);
    }
    init();
    function slideMouseDown(e) {

        if (e.touches) {
            initX = e.touches[0].clientX;
        }
        else {
            initX = e.pageX;
        }


        document.addEventListener('mousemove', slideMouseMove, false);
        document.addEventListener('touchmove', slideMouseMove, false);

        document.addEventListener('mouseup', slideMouseUp, false);
        document.addEventListener('touchend', slideMouseUp, false);
    }

    function slideMouseMove(e) {
        var mouseX;

        if (e.touches) {
            mouseX = e.touches[0].clientX;
        }
        else {
            mouseX = e.pageX;
        }

        transX += mouseX - initX;
        rotZ = transX / 20;

        transY = -Math.abs(transX / 15);



        curSlide[num].style.transition = 'none';
        curSlide[num].style.webkitTransform = 'translateX(' + transX + 'px)' + ' rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        curSlide[num].style.transform = 'translateX(' + transX + 'px)' + ' rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        var j = 1;
        //remains elements
        for (var i = sliders[num].length -2; i >= 0; i--) {

            sliders[num][i].style.webkitTransform = 'translateX(' + transX/(2*j) + 'px)' + ' rotateZ(' + rotZ/(2*j) + 'deg)' + ' translateY(' + (Y_DIS*j) + 'px)'+ ' translateZ(' + (-Z_DIS*j) + 'px)';
            sliders[num][i].style.transform = 'translateX(' + transX/(2*j) + 'px)' + ' rotateZ(' + rotZ/(2*j) + 'deg)' + ' translateY(' + (Y_DIS*j) + 'px)'+ ' translateZ(' + (-Z_DIS*j) + 'px)';
            sliders[num][i].style.transition = 'none';
            j++;
        }



        initX =mouseX;
        e.preventDefault();
        if (Math.abs(transX) >= curSlide[num].offsetWidth-30) {

            document.removeEventListener('mousemove', slideMouseMove, false);
            document.removeEventListener('touchmove', slideMouseMove, false);
            curSlide[num].style.transition = 'ease 0.2s';
            curSlide[num].style.opacity = 0;
            prevSlide[num] = curSlide[num];
            attachEvents(sliders[num][sliders[num].length - 2]);
            slideMouseUp(num);
            setTimeout(function () {





                slider[num].insertBefore(prevSlide[num], slider[num].firstChild);

                prevSlide[num].style.transition = 'none';
                prevSlide[num].style.opacity = '1';
                slideMouseUp(num);

            },201);



            return;
        }
    }
    function slideMouseUp(num) {
        transX = 0;
        rotZ = 0;
        transY = 0;

        curSlide[num].style.transition = 'cubic-bezier(0,1.95,.49,.73) '+TRANS_DUR+'s';

        curSlide[num].style.webkitTransform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        curSlide[num].style.transform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        //remains elements
        var j = 1;
        for (var i = sliders[num].length -  2; i >= 0; i--) {
            sliders[num][i].style.transition = 'cubic-bezier(0,1.95,.49,.73) ' + TRANS_DUR / (j + 0.9) + 's';
            sliders[num][i].style.webkitTransform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + (Y_DIS*j) + 'px)' + ' translateZ(' + (-Z_DIS*j) + 'px)';
            sliders[num][i].style.transform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + (Y_DIS*j) + 'px)' + ' translateZ(' + (-Z_DIS*j) + 'px)';

            j++;
        }

        document.removeEventListener('mousemove', slideMouseMove, false);
        document.removeEventListener('touchmove', slideMouseMove, false);

    }


}