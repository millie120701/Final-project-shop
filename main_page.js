const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown-menu");

toggleBtn.addEventListener("click", function () {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");

  toggleBtnIcon.classList = isOpen
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
});

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form input');
const searchBtn = document.querySelector('.search-btn');

function showSearchInpt() {
  if (searchInput.style.display === "none") {
    searchInput.style.display = "block";
  }
};
