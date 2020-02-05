$(document).ready(function() {
  let videos = document.querySelectorAll(".video");
  let activeId = 0;
  let curVideo = videos[activeId];

  //make back btn initially unclickable
  let back = document.querySelector(".wrap_controls-left");
  back.classList.add("block-btn");
  //строит элементы один за другим туда сюда
  function clear() {
    videos.forEach(el => {
      if ($(el).hasClass("push-back")) {
        el.classList.remove("push-back");
      }
    });
  }

  function align(arr) {
    let iteration = 0;
    let step = 0;
    let scaleStep = 1;
    let zIndexStep = 1;

    arr.forEach(el => {
      if(iteration > 3) {
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
    if (direction >= 0) {
      curVideo.classList.remove("push-back");
      curVideo.classList.add("push-forward");
      curVideo.style.zIndex = 99;
      recount("forward");
      back.classList.remove("block-btn");
      normalizeForward();
    } else {
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