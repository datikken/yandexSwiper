$(document).ready(function() {
  let libIteration = 2;
  let videos = document.querySelectorAll(".video");
  let activeId = 0;
  let curVideo = videos[activeId];
  let videosLength = videos.length;
  //make back btn initially unclickable
  let back = document.querySelector(".wrap_controls-left");
  let forward = document.querySelector(".wrap_controls-right");

  back.classList.add("block-btn");

  function checkStop() {
    if (libIteration >= videosLength) {
      forward.classList.add("block-btn");
      return;
    } else {
      forward.classList.remove("block-btn");
    }
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
      if (iteration > 3) {
        return;
      }

      el.style.left = 0 + step;
      el.style.transform = `scale(${scaleStep})`;
      el.style.zIndex = 0 - zIndexStep;

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
    checkStop();
    if (direction >= 0) {
      curVideo.classList.remove("push-back");
      curVideo.classList.add("push-forward");
      curVideo.style.zIndex = 9999;
      libIteration = libIteration + 1;
      recount("forward");
      back.classList.remove("block-btn");
      normalizeForward();
    } else {
      suspendIndex();
      curVideo.style.zIndex = 999;
      libIteration = libIteration - 2;
      recount("back");
      curVideo.classList.remove("push-forward");
      curVideo.classList.add("push-back");
      normalizeBackwards();
    }
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