$(document).ready(function() {
  let videos = document.querySelectorAll(".video");
  let activeId = 0;
  let curVideo = videos[activeId];
  let nextVideo = videos[activeId + 1];

  let leftEl = [];

  //make back btn initially unclickable
  let back = document.querySelector('.wrap_controls-left');
      back.classList.add('block-btn');

  function normalize() {
      let step = 0;
      let scaleStep = 1;

      videos.forEach((el) => {
          if(el.classList.value.indexOf('push') > 0) {
            //   console.log(el);
          } else {
            leftEl.push(el);
          }
      })

      leftEl.forEach((el) => {
          el.style.left = el.style.left + step;
          el.style.transform = `scale(${scaleStep})`
          step = step + 100;
          scaleStep = scaleStep - .1;
      });

    //   console.log(leftEl)

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
      back.classList.remove('block-btn');
      normalize();
    } else {
      recount("back");
      curVideo.classList.remove("push-forward");
      curVideo.classList.add("push-back");
      normalize();
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