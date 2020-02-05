$(document).ready(function() {
  let back = document.querySelector(".wrap_controls-left");
  let forward = document.querySelector(".wrap_controls-right");
  let videos = document.querySelectorAll(".video");

  let activeId = 0;
  let curVideo = videos[activeId];
  let videosLength = videos.length;

  videos[0].classList.add("active_slide");
  back.classList.add("block-btn");

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
  function suspendIndex() {
    videos.forEach(el => {
      if ($(el).hasClass("push-forward")) {
        el.style.zIndex = -9999;
      }
    });
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
        el.classList.add("active_slide");
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
      curVideo.classList.remove("push-back");
      curVideo.classList.add("push-forward");
      curVideo.style.zIndex = 9999;
      recount("forward");
      back.classList.remove("block-btn");
      normalizeForward();
    } else {
      suspendIndex();
      curVideo.style.zIndex = 999;
      recount("back");
      curVideo.classList.remove("push-forward");
      curVideo.classList.add("push-back");
      normalizeBackwards();
    }

    activeIndex();
  }

  function prepare(el) {
    let eventType = el.target.dataset.dir;
    switch (eventType) {
      case "right":
        push(-100);
        break;
      case "left":
        push(0);
        break;
    }
  }
  //controller
  $(".wrap_controls-control").on("click", function(el) {
    prepare(el);
  });
});