exports.getIndex = (req, res, next) => {
    res.render("index", {
      pageTitle: "Main",
      path: "/"
    });
  };