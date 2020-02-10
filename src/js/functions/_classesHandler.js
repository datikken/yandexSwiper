function _classesHandler(el, elClass, type) {
  if (type == "add") {
    el.classList.add(elClass);
  } else {
    el.classList.remove(elClass);
  }
}

export { _classesHandler };