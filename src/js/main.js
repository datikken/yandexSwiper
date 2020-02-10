/**
 * hasClass util
 * target, class
 * @returns {boolean}
 * _classesHandler
 * el, class, action
 */
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
  let itemsLength = videos.length - 1;

  function controller() {
    _classesHandler(back, 'block-btn', 'add');
    recountStyles(videos);
    setEventListeners(back, forward);
  }

  function recountStyles(items) {    
    let scaleStep = 1;
    let leftStep = 0;
    let zIndexStep = 0;

    items.forEach((el) => {
        let id = parseInt(el.getAttribute('data-id'));
        _classesHandler(el, 'push-forward', 'remove');

        let val = scaleStep - `.${id}`;
        let leftVal = leftStep + id * 75;
        let zVal = zIndexStep - id;

        if(id === 0) {
          _classesHandler(el, 'active_slide', 'add');
        } else {
          _classesHandler(el, 'active_slide', 'remove');
        }

        if(id === itemsLength) {
          _classesHandler(el, 'push-forward', 'add');
        }

        el.style.zIndex = zVal;
       
        TweenLite.to(el, .1, {ease: "sine.out", left: leftVal, transform: `scale(${val})`});
      });
  }

  function setEventListeners(back, forward) {
    back.addEventListener("click", function() {
      changeIndexes('back');
      recountStyles(videos);
    });

    forward.addEventListener("click", function() {
      _classesHandler(back, 'block-btn', 'remove');

      changeIndexes('forward');
      recountStyles(videos);
    });
  }

  function changeIndexes(type) {
      videos.forEach(el => {
        let id = parseInt(el.getAttribute('data-id'));

        if(type === 'back') {
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