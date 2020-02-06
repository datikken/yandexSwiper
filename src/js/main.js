$(document).ready(function() {
  let wrap = document.querySelector(".wrap");
  let back = wrap.querySelector(".wrap_controls-left");
  let forward = wrap.querySelector(".wrap_controls-right");
  let videos = wrap.querySelectorAll(".video");
  let playBtn = wrap.querySelector(".video-icon");

  let activeId = 0;
  let curVideo = videos[activeId];
  let videosLength = videos.length;

  videos[videos.length - 1].classList.add("active_slide");
  back.classList.add("block-btn");

  back.addEventListener('click', function() {
    push(-100);
  });
  forward.addEventListener('click', function() {
    push(0);
  });
  wrap.addEventListener("click", function() {
    playPause();
  });

  function activeIndex() {
    let lastVideoId = videos[videos.length - 1].getAttribute("data-id");
    let activeId = document
      .querySelector(".active_slide")
      .getAttribute("data-id");

    if (parseInt(activeId) === 0) {
      back.classList.add("block-btn");
    }
    if (parseInt(lastVideoId) === parseInt(activeId)) {
      forward.classList.add("block-btn");
    } else {
      forward.classList.remove("block-btn");
    }

    return activeId;
  }
  //возвращаем элемент по верху всех остальных элементов
  function _raiseZindex() {
    let pushedItems = wrap.querySelectorAll(".push-forward");

    if (pushedItems.length) {
      pushedItems.forEach(el => {
        el.classList.add("raiseZindex");
      });
    }
  }
  function _dropZindex() {
    let pushedItems = wrap.querySelectorAll(".push-forward");

    if (pushedItems.length) {
      pushedItems.forEach(el => {
        el.classList.add("dropZindex");
      });
    }
  }
  //строит элементы один за другим туда сюда
  function clearActiveSlide() {
    videos.forEach(el => {
      if ($(el).hasClass("active_slide")) {
        el.classList.remove("active_slide");
      }
    });
  }
  function clear() {
    videos.forEach(el => {
      if ($(el).hasClass("push-back")) {
        el.classList.remove("push-back");
      }
    });
  }
  function stopAndPlay(item, type) {
    if (item.nodeName === "VIDEO") {
      videos.forEach(el => {
        try {
          el.controls = false;
          el.pause();
        } catch (e) {
          console.log(e);
        }
      });
    }
    if (type === "back") {
      item.controls = true;
      item.play();
    } else {
      item.controls = true;
      item.play();
    }
  }
  //выравнивает элементы
  function align(arr) {
    let iteration = 0;
    let step = 0;
    let scaleStep = 1;
    let zIndexStep = 1;

    arr.forEach(el => {
      let activeSlideIter = 0;
      if (iteration > videosLength) {
        return;
      }
      if (iteration === 0) {
        _classesHandler(el, "active_slide", 'add');
      }
      if (el.classList.value.indexOf("raiseZindex") > 0) {
        _classesHandler(el, "raiseZindex", 'remove');
      }
      if (el.classList.value.indexOf("dropZindex") > 0) {
        _classesHandler(el, "dropZindex", 'remove');
      }

      activeSlideIter = activeSlideIter + 1;
      el.style.zIndex = 0 - zIndexStep;
      el.style.transform = `scale(${scaleStep})`;

      if (iteration > 3) {
        return;
      }

      el.style.left = 0 + step;
      zIndexStep = zIndexStep + 1;
      step = step + 75;
      scaleStep = scaleStep - 0.1;
      iteration = iteration + 1;
    });
  }

  function _classesHandler(el, elClass, type) {
      if(type == 'add') {
          el.classList.add(elClass);
      } else {
          el.classList.remove(elClass);
      }
  }
  //выбираем элементы для построения
  function normalizeBackwards() {
    let alined = [];

    videos.forEach(el => {
      if (!$(el).hasClass("push-forward")) {
        alined.push(el);
      }
    });

    align(alined);
    clear();
  }

  function normalizeForward() {
    let leftEl = [];
    videos.forEach(el => {
      if (el.classList.value.indexOf("push") < 0) {
        leftEl.push(el);
      }
    });

    align(leftEl);
  }

  function recount(type) {
    switch (type) {
      case "forward":
        activeId = activeId + 1;
        curVideo = videos[activeId];
        break;
      case "back":
        activeId = activeId - 1;
        curVideo = videos[activeId];
        break;
    }
  }

  function push(direction) {
      clearActiveSlide();

    if (direction >= 0) {
      _dropZindex();
      _classesHandler(curVideo, "push-back", 'remove');
      _classesHandler(curVideo, "push-forward", 'add');
      _classesHandler(back, "block-btn", 'remove');

      curVideo.style.zIndex = 99;

      recount("forward");
      normalizeForward();
      stopAndPlay(curVideo, "forward");

    } else {
      _raiseZindex();
      recount("back");

      _classesHandler(curVideo, "push-forward", 'remove');
      _classesHandler(curVideo, "push-back", 'add');

      normalizeBackwards();
      stopAndPlay(curVideo, "back");
    }

    activeIndex();
  }
  function playPause() {
    let video = wrap.querySelector(".active_slide");
    if (!video.paused) {
      video.pause();
      playBtn.style.opacity = 1;
    } else {
      video.play();
      playBtn.style.opacity = 0;
    }
  }
});