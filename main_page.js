const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown-menu");

toggleBtn.addEventListener("click", function () {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");

  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

const $ = (str) => document.querySelector(str);
const $$ = (str) => document.querySelectorAll(str);

(function () {
  if (!window.app) {
    window.app = {};
  }
  app.carousel = {
    removeClass: function (el, classname = "") {
      if (el) {
        if (classname === "") {
          el.className = "";
        } else {
          el.classList.remove(classname);
        }
        return el;
      }
      return;
    },
    reorder: function () {
      let childcnt = $("#carousel").children.length;
      let childs = $("#carousel").children;

      for (let j = 0; j < childcnt; j++) {
        childs[j].dataset.pos = j;
      }
    },
    move: function (el) {
      let selected = el;

      if (typeof el === "string") {
        console.log(`got string: ${el}`);
        selected =
          el == "next"
            ? $(".selected").nextElementSibling
            : $(".selected").previousElementSibling;
        console.dir(selected);
      }

      let curpos = parseInt(app.selected.dataset.pos);
      let tgtpos = parseInt(selected.dataset.pos);

      let cnt = curpos - tgtpos;
      let dir = cnt < 0 ? -1 : 1;
      let shift = Math.abs(cnt);

      for (let i = 0; i < shift; i++) {
        let el =
          dir == -1
            ? $("#carousel").firstElementChild
            : $("#carousel").lastElementChild;

        if (dir == -1) {
          el.dataset.pos = $("#carousel").children.length;
          $("#carousel").append(el);
        } else {
          el.dataset.pos = 0;
          $("#carousel").prepend(el);
        }

        app.carousel.reorder();
      }

      app.selected = selected;
      let next = selected.nextElementSibling; // ? selected.nextElementSibling : selected.parentElement.firstElementChild;
      var prev = selected.previousElementSibling; // ? selected.previousElementSibling : selected.parentElement.lastElementChild;
      var prevSecond = prev
        ? prev.previousElementSibling
        : selected.parentElement.lastElementChild;
      var nextSecond = next
        ? next.nextElementSibling
        : selected.parentElement.firstElementChild;

      selected.className = "";
      selected.classList.add("selected");

      app.carousel.removeClass(prev).classList.add("prev");
      app.carousel.removeClass(next).classList.add("next");

      app.carousel.removeClass(nextSecond).classList.add("nextRightSecond");
      app.carousel.removeClass(prevSecond).classList.add("prevLeftSecond");

      app.carousel.nextAll(nextSecond).forEach((item) => {
        item.className = "";
        item.classList.add("hideRight");
      });
      app.carousel.prevAll(prevSecond).forEach((item) => {
        item.className = "";
        item.classList.add("hideLeft");
      });
    },
    nextAll: function (el) {
      let els = [];

      if (el) {
        while ((el = el.nextElementSibling)) {
          els.push(el);
        }
      }

      return els;
    },
    prevAll: function (el) {
      let els = [];

      if (el) {
        while ((el = el.previousElementSibling)) {
          els.push(el);
        }
      }

      return els;
    },
    keypress: function (e) {
      switch (e.which) {
        case 37: // left
          app.carousel.move("prev");
          break;

        case 39: // right
          app.carousel.move("next");
          break;

        default:
          return;
      }
      e.preventDefault();
      return false;
    },
    select: function (e) {
      console.log(`select: ${e}`);
      let tgt = e.target;
      while (!tgt.parentElement.classList.contains("carousel")) {
        tgt = tgt.parentElement;
      }

      app.carousel.move(tgt);
    },
    previous: function (e) {
      app.carousel.move("prev");
    },
    next: function (e) {
      app.carousel.move("next");
    },
    doDown: function (e) {
      console.log(`down: ${e.x}`);
      app.carousel.state.downX = e.x;
    },
    doUp: function (e) {
      console.log(`up: ${e.x}`);
      let direction = 0,
        velocity = 0;

      if (app.carousel.state.downX) {
        direction = app.carousel.state.downX > e.x ? -1 : 1;
        velocity = app.carousel.state.downX - e.x;

        if (Math.abs(app.carousel.state.downX - e.x) < 10) {
          app.carousel.select(e);
          return false;
        }
        if (direction === -1) {
          app.carousel.move("next");
        } else {
          app.carousel.move("prev");
        }
        app.carousel.state.downX = 0;
      }
    },
    init: function () {
      document.addEventListener("keydown", app.carousel.keypress);
      // $('#carousel').addEventListener("click", app.carousel.select, true);
      $("#carousel").addEventListener("mousedown", app.carousel.doDown);
      $("#carousel").addEventListener("touchstart", app.carousel.doDown);
      $("#carousel").addEventListener("mouseup", app.carousel.doUp);
      $("#carousel").addEventListener("touchend", app.carousel.doup);

      app.carousel.reorder();
      $("#prev").addEventListener("click", app.carousel.previous);
      $("#next").addEventListener("click", app.carousel.next);
      app.selected = $(".selected");
    },
    state: {},
  };
  app.carousel.init();
})();

function myFunction() {
  event.preventDefault();
  document.getElementById("panel").style.display = "block";
  document.getElementById("link-bar").style.display = "none";
  document.getElementById("basket-c").style.display = "none";
  document.getElementById("search-wrap").style.cssFloat = "left";
  document.getElementById("basket-c").style.display = "none";
  document.getElementById("search-b").style.display = "none";
  document.getElementById("logo-name").style.display = "none";
}
