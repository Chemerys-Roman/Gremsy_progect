// const goalsPointer = document.querySelector('.goals__item-title-pointer')
import galarySliderFunction from "./swipers";

const goalsDescription = document.querySelector(".goals__item-description");
const headerBurger = document.querySelector(".header__burger");
const headerMenu = document.querySelector(".header__menu");
const helpButton = document.querySelector(".header__button a");
// const helpusButton = document.querySelector('.helpus__button a')

const langUkr = document.querySelector('.header__language_ukr')
const langEng = document.querySelector('.header__language_eng')
const popupDonate = document.querySelector('.popup-donate');
const closeDonate = document.querySelector('.popup-donate__close');
const globalNewsButtons = document.getElementsByClassName('global-news__filter-button')
const form = document.forms.footerform;
galarySliderFunction();

function showDonate() {
  if (!document.body.classList.contains("locked")) {
    document.body.classList.add("locked");
  }
  popupDonate.classList.add("popup-donate_active");
  headerBurger.classList.remove("header__burger_active");
  headerMenu.classList.remove("header__menu_active");
}



function clickHandler(event){
  console.log(event.target)
  if(event.target.classList.contains('global-news__filter')){
    console.log('button worked')
    for(let i = 0; i < globalNewsButtons.length; i += 1){
      if(globalNewsButtons.item(i).classList.contains('animate-button-black')){
        globalNewsButtons.item(i).classList.remove('animate-button-black')
        globalNewsButtons.item(i).classList.add('animate-button-white')
      }
    }
    event.target.parentNode.classList.add('animate-button-black')
    event.target.parentNode.classList.remove('animate-button-white')
  }
  if(event.target.classList.contains('header__nav-link')){
    const navElements = document.getElementsByClassName('header__nav-link')
    for(let i = 0; i < navElements.length; i+=1){
      navElements.item(i).classList.remove('active-nav-item')
      if(navElements.item(i) === event.target){
        navElements.item(i).classList.add('active-nav-item')
      }
    }
  }

  if(event.target.classList.contains('goals__item-title-pointer')){
    event.preventDefault()
      event.target.classList.toggle('active');
    console.log('DESCRIPTION ELEMENT IS:',event.target.parentElement.parentElement.getElementsByClassName('goals__item-description')[0])
      event.target.parentElement.parentElement.getElementsByClassName('goals__item-description')[0].classList.toggle('active-desc');

  }
  switch (event.target) {
    case helpButton:
      event.preventDefault();
      showDonate();
      console.log("IT is HELP BUTTON");
      break;
    case closeDonate:
      document.body.classList.remove("locked");
      popupDonate.classList.remove("popup-donate_active");
      break;
    case langUkr:
      console.log("UKRAINIAN");
      if (langUkr.classList.contains("active-lang")) {
        if (window.getComputedStyle(headerBurger, null).display === "none") {
          langEng.classList.add("active-lang");
          langUkr.classList.remove("active-lang");
        }
        break;
      }
      langUkr.classList.add("active-lang");
      langEng.classList.remove("active-lang");
      break;
    case langEng:
      if (langEng.classList.contains("active-lang")) {
        if (window.getComputedStyle(headerBurger, null).display === "none") {
          langUkr.classList.add("active-lang");
          langEng.classList.remove("active-lang");
        }
        break;
      }
      langEng.classList.add("active-lang");
      langUkr.classList.remove("active-lang");
      break;
    case headerBurger:
      if (headerBurger.classList.contains("header__burger_active")) {
        headerBurger.classList.remove("header__burger_active");
        headerMenu.classList.remove("header__menu_active");
        document.body.classList.remove("locked");
        break;
      }
      headerBurger.classList.add("header__burger_active");
      headerMenu.classList.add("header__menu_active");
      document.body.classList.add("locked");
      break;

    default:
      break;
  }
}
function submitHandler(event) {
  event.preventDefault();
  if (form !== event.target) {
    return;
  }
  const inputs = event.target.getElementsByTagName("input");
  console.log(inputs);
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs.item(i);
    if (!input.textContent || input.textContent.split(" ").length === 0) {
      input.parentElement.classList.add("false_input");
    }
  }
}
function focusHandler(event) {
  if (!event.target.classList.contains("form-input")) {
    return;
  }
  event.target.parentElement.classList.remove("false_input");
}
document.addEventListener("click", clickHandler);
document.addEventListener("submit", submitHandler);
document.addEventListener("input", focusHandler);

// const articleButtons = document.querySelectorAll(".article__button");
// const articleTexts = document.querySelectorAll(".article__description");
// const articles = document.querySelectorAll(".article");
// if (articleTexts && articleButtons) {
//   articleButtons.forEach((button, i) => {
//     button.addEventListener("click", () => {
//       if (articleTexts[i].style.height === "0px") {
//         articleTexts[i].style.height = `${articleTexts[i].scrollHeight}px`;
//       } else {
//         articleTexts[i].style.height = `${articleTexts[i].scrollHeight}px`;
//         // eslint-disable-next-line no-unused-expressions
//         `${articleTexts[i].clientHeight}px`;
//         articleTexts[i].style.height = "0";
//       }
//       articles[i].classList.toggle("open");
//     });
//     articleTexts[i].addEventListener("transitionend", () => {
//       if (articleTexts[i].style.height !== "0px") {
//         articleTexts[i].style.height = "auto";
//       }
//     });
//   });
// }
