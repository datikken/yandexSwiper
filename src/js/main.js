$(document).ready(function() {
  let videos = document.querySelectorAll(".video");
  let activeId = 0;
  let curVideo = videos[activeId];
  let nextVideo = videos[activeId + 1];
  //make back btn initially unclickable
  let back = document.querySelector(".wrap_controls-left");
  back.classList.add("block-btn");

  function normalizeBackwards() {

  }

  function normalizeForward() {
    let step = 0;
    let scaleStep = 1;
    let leftEl = [];

    videos.forEach(el => {
      if (el.classList.value.indexOf("push") < 0) {
        leftEl.push(el);
      }
    });

    leftEl.forEach(el => {
      el.style.left = 0 + step;
      el.style.transform = `scale(${scaleStep})`;
      step = step + 75;
      scaleStep = scaleStep - 0.1;
    });
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