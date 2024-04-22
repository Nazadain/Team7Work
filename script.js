var hamburger = document.querySelector("#hamburger");
var nav = document.querySelector(".navMenu");
var navLinks = document.querySelectorAll(".navMenu li");
hamburger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    hamburger.classList.toggle("toggle");
  });
Array.from(navLinks).forEach((li) =>
li.addEventListener("click", () => {
if (hamburger.classList.contains("toggle")) {
    hamburger.classList.remove("toggle");
}
if (nav.classList.contains("nav-active")) {
    nav.classList.remove("nav-active");
}
    })
);