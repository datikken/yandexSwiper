/**
 * hasClass util
 * target, class
 * @returns {boolean}
 * _classesHandler
 * el, class, action
 */
import { hasClass } from "./functions/_hasClass";
import { _classesHandler } from "./functions/_classesHandler";

const videoSlider = function() {
  let wrap = document.querySelector(".wrap");
  let videos = wrap.querySelectorAll(".video");
  //controls
  let back = wrap.querySelector(".wrap_controls-left");
  let forward = wrap.querySelector(".wrap_controls-right");
  //autoplay
  let playBtn = wrap.querySelector(".topVideo-icon");
  //all vids length from 0
  let itemsLength = videos.length -1;

  function controller() {
    setStyles(videos);
    setEventListeners(back, forward);
  }

  function setStyles(videos) {
    let leftStep = 0;
    let scaleStep = 1;

    videos.forEach((el) => {
      let id = el.getAttribute('data-id');
      
        if(id === '0') {
          _classesHandler(el, 'active_slide', 'add');
        } else {
          _classesHandler(el, 'active_slide', 'remove');
        }

        el.style.zIndex = `-${id}` + '!important;';
        // el.style.left = 0 + leftStep;
        // el.style.transform = `scale(${scaleStep})`

        // leftStep = leftStep + 75;
        // scaleStep = scaleStep - .1;
    });
  } 


  function recountStyles() {
    let scaleStep = 1;
    videos.forEach((el) => {
        let id = parseInt(el.getAttribute('data-id'));


        if(id === 0) {
          _classesHandler(el, 'active_slide', 'add');
        } else {
          _classesHandler(el, 'active_slide', 'remove');
        }

        el.style.zIndex = `-${id}` + '!important;';

        let val = scaleStep - `.${id}`
          el.style.transform = `scale(${val})`
   
      })
  }

  function setEventListeners(back, forward) {
    back.addEventListener("click", function() {
      changeIndexes('back');
      recountStyles(videos);
    });

    forward.addEventListener("click", function() {
      changeIndexes('forward');
      recountStyles(videos);
    });
  }

  function changeIndexes(type) {
      let lastIndex = videos[videos.length-1].getAttribute('data-id');

      videos.forEach(el => {
        let id = parseInt(el.getAttribute('data-id'));

        if(type === 'forward') {
          el.setAttribute('data-id', id + 1);
          if(id >= itemsLength) {
            el.setAttribute('data-id', 0)
          }
        } else {
          el.setAttribute('data-id', id - 1);
          if(id <= 0) {
            el.setAttribute('data-id', itemsLength)
          }
        }
      });
  }

  controller();
};


$(document).ready(function() {
  videoSlider();
})

export { videoSlider };