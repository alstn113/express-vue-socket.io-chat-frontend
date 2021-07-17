module.exports = (app) => {
  app.directive("auto-bottom", {
    updated: (el) => {
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 0);
    },
  });
  app.directive("focus", {
    mounted(el) {
      el.focus();
    },
  });
};
