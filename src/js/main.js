$(document).ready(function() {
  let videos = document.querySelectorAll(".video");
  let activeId = 0;

  let curVideo = videos[activeId];
  let nextVideo = videos[activeId + 1];

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
    } else {
      recount("back");
      curVideo.classList.remove("push-forward");
      curVideo.classList.add("push-back");
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