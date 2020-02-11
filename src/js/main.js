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
  let btn = wrap.querySelector(".topVideo-icon");

  let playedState = null;

  //all vids length from 0
  let itemsLength = videos.length - 1;

  function controller() {
    _classesHandler(back, "block-btn", "add");
    recountStyles(videos);

    setEventListeners(btn, back, forward);

    _setHref();

  }

  function setEventListeners(btn, back, forward) {
    btn.addEventListener("click", function() {
      playPause();
    });

    back.addEventListener("click", function() {
      changeIndexes("back");
      recountStyles(videos);
      _headingChange(wrap);
      pauseAll();
    });

    forward.addEventListener("click", function() {
      _classesHandler(back, "block-btn", "remove");
      changeIndexes("forward");
      recountStyles(videos);
      pauseAll();
      _setHref();
    });
  }

  function _setHref() {
    let heeadingContainer = document.querySelector("[data-videos-heading]");

    if(heeadingContainer) {
      let url = wrap.querySelector(".active_slide").getAttribute("data-url");
      heeadingContainer.setAttribute("href", url);
  
      console.warn("_headingChange", url);
    }
  }

  function _headingChange(wrap) {
    let heeadingContainer = document.querySelector("[data-videos-heading]");
    let dateContainer = document.querySelector("[data-videos-date]");

    let param = JSON.parse(
      wrap.querySelector(".active_slide").getAttribute("data-vid-param")
    );

    let heading = param.heading;
    let date = param.date;

    heeadingContainer.innerText = heading;
    dateContainer.innerText = date;
  }

  function pauseAll() {
    btn.style.opacity = 1;

    videos.forEach(el => {
      el.pause();
      el.controls = false;
    });
  }

  function playPause() {
    let activeSlide = wrap.querySelector(".active_slide");
    
    if (!playedState) {
      activeSlide.play();
      activeSlide.controls = true;
      playedState = true;
      btn.style.opacity = 0;
    } else {
      activeSlide.pause();
      playedState = null;
      btn.style.opacity = 1;
    }
  }

  function recountStyles(items) {
    let scaleStep = 1;
    let leftStep = 0;
    let zIndexStep = 0;

    items.forEach(el => {
      let id = parseInt(el.getAttribute("data-id"));

      _classesHandler(el, "push-forward", "remove");

      let val = scaleStep - `.${id}`;
      let leftVal = leftStep + id * 75;
      let zVal = zIndexStep - id;

      if (id === 0) {
        _classesHandler(el, "active_slide", "add");
      } else {
        _classesHandler(el, "active_slide", "remove");
      }

      if (id === itemsLength) {
        _classesHandler(el, "push-forward", "add");
      }

      el.style.zIndex = zVal;

      TweenLite.to(el, 0.1, {
        ease: "sine.out",
        left: leftVal,
        transform: `scale(${val})`
      });
    });
  }

  function changeIndexes(type) {
    videos.forEach(el => {
      let id = parseInt(el.getAttribute("data-id"));

      if (type === "back") {
        el.setAttribute("data-id", id + 1);

        if (id >= itemsLength) {
          el.setAttribute("data-id", 0);
        }
      } else {
        el.setAttribute("data-id", id - 1);
        if (id <= 0) {
          el.setAttribute("data-id", itemsLength);
        }
      }
    });
  }

  controller();
};

$(document).ready(function() {
  videoSlider();
});

export { videoSlider };