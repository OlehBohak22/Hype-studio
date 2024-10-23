import Swiper from "swiper";
import "swiper/css";
import {
  Navigation,
  Pagination,
  EffectCards,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiper = new Swiper(".about-swiper-container", {
  modules: [Navigation, Pagination],

  slidesPerView: 1,
  spaceBetween: 25,
  loop: true,

  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },

  pagination: {
    el: ".pagination",
    clickable: true,
  },
});

// Функція для оновлення кастомної пагінації
function updateCustomPagination() {
  const bullets = document.querySelectorAll(
    ".custom-pagination .pagination-bullet"
  );

  // Отримуємо реальний індекс слайду, враховуючи режим loop
  const realIndex = swiper.realIndex;

  bullets.forEach((bullet, index) => {
    bullet.classList.toggle("active", index === realIndex);

    // Додаємо обробник подій для кліку по кастомній пагінації
    bullet.onclick = function () {
      swiper.slideToLoop(index); // Використовуємо slideToLoop для коректної роботи з loop
    };
  });
}

// Викликаємо функцію при зміні слайду
swiper.on("slideChange", updateCustomPagination);

// Оновлюємо кастомну пагінацію після ініціалізації
updateCustomPagination();

const swiperEx = new Swiper(".ex-student-swiper-container", {
  modules: [EffectCards, Navigation],
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },
  slidesPerView: "auto",
  centeredSlides: true,
  loop: true,
  effect: "cards",
  cardsEffect: {
    // perSlideOffset: 20, // Space between cards in px
    // perSlideRotate: 1, // Rotation of cards in degrees
    // slideShadows: true,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const journeyItems = document.querySelectorAll(".journey-item");
  const infoContainers = document.querySelectorAll(".journey-info-container");

  journeyItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Видаляємо клас active у всіх journey-item та journey-info-container
      journeyItems.forEach((i) => i.classList.remove("active"));
      infoContainers.forEach((container) =>
        container.classList.remove("active")
      );

      // Додаємо клас active до вибраного journey-item
      this.classList.add("active");

      // Знаходимо відповідний journey-info-container і показуємо його
      const target = this.getAttribute("data-target");
      const activeContainer = document.querySelector(
        `.journey-info-container[data-info="${target}"]`
      );
      if (activeContainer) {
        activeContainer.classList.add("active");
      }
    });
  });
});

const menuBtn = document.querySelector(".header-menu-btn");
const closeMenuBtn = document.querySelector(".close-overlay");
const menuOverlay = document.querySelector(".menu-overlay");
// Функція для закриття меню
const closeMenu = () => {
  menuOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll"); // Відновити скрол
};

// Відкриття меню
menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  menuOverlay.classList.add("active");
  document.body.classList.add("no-scroll"); // Заблокувати скрол
});

// Закриття меню по кліку на кнопку закриття або посилання всередині оверлею
closeMenuBtn.addEventListener("click", closeMenu);

// Закриття меню по кліку на будь-яке посилання всередині меню
menuOverlay.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    closeMenu();
  }
});

// Отримуємо всі елементи аккордеону
const faqItems = document.querySelectorAll(".faq-item");

// Додаємо обробник події для кожного елемента
faqItems.forEach((item) => {
  const faqTitle = item.querySelector(".faq-title-container");

  faqTitle.addEventListener("click", () => {
    // Перевіряємо чи вже є активний елемент, якщо так - закриваємо його
    const activeItem = document.querySelector(".faq-item.active");
    if (activeItem && activeItem !== item) {
      activeItem.classList.remove("active");
      activeItem.querySelector(".faq-acardeon-js").style.maxHeight = null; // Закриваємо контент
      activeItem.querySelector(".faq-img img").src = "./plus.svg"; // Змінюємо іконку на плюс
    }

    // Тепер відкриваємо або закриваємо поточний елемент
    item.classList.toggle("active");
    const content = item.querySelector(".faq-acardeon-js");
    if (item.classList.contains("active")) {
      content.style.maxHeight = content.scrollHeight + "px"; // Відкриваємо контент
      item.querySelector(".faq-img img").src = "./minus.svg"; // Змінюємо іконку на мінус
    } else {
      content.style.maxHeight = null; // Закриваємо контент
      item.querySelector(".faq-img img").src = "./plus.svg"; // Змінюємо іконку на плюс
    }
  });
});

// Отримуємо всі інпути в формі
const inputs = document.querySelectorAll(".form-input-container input");

// Перевіряємо кожен інпут на наявність введеного тексту
inputs.forEach((input) => {
  // Перевірка при завантаженні сторінки (якщо вже введене значення)
  if (input.value) {
    input.classList.add("filled");
  }

  // Перевірка при втраті фокусу
  input.addEventListener("blur", () => {
    if (input.value) {
      input.classList.add("filled"); // Додаємо клас, якщо є текст
    } else {
      input.classList.remove("filled"); // Видаляємо клас, якщо поле порожнє
    }
  });
});

// Отримуємо всі кнопки, які відкривають попапи
const openPopupButtons = document.querySelectorAll(".open-popup");

// Додаємо обробники подій на всі кнопки
openPopupButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Запобігаємо стандартній поведінці посилання

    // Отримуємо ID попапу з атрибута data-popup-id
    const popupId = button.getAttribute("data-popup-id");
    const popup = document.getElementById(popupId); // Отримуємо попап по ID

    // Якщо це попап з ID tariffPopup, оновлюємо його заголовок та іконку
    if (popupId === "tariffPopup") {
      // Знаходимо батьківський елемент тарифу
      const tariffItem = button.closest(".tariff-item");

      // Отримуємо дані з атрибутів тарифу
      const title = tariffItem.getAttribute("data-title");
      const icon = tariffItem.getAttribute("data-icon");

      // Оновлюємо заголовок і іконку в попапі
      const popupTitle = popup.querySelector(".popup-title-container p");
      const popupIcon = popup.querySelector(".popup-title-container svg use");
      popupTitle.textContent = `You plan ${title}`;
      popupIcon.setAttribute("href", `/Hype-Tattoo${icon}`);
    }

    // Відкриваємо попап, додаючи клас active
    popup.classList.add("active");
  });
});

// Отримуємо всі елементи для закриття попапу
const closePopupButtons = document.querySelectorAll(".popup-close");

// Додаємо обробники для закриття попапу
closePopupButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup-overlay");
    popup.classList.remove("active");
  });
});

// Закриття попапу при кліку на фон
const popups = document.querySelectorAll(".popup-overlay");
popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
    }
  });
});

// LEarn слайдер мобільний

document.addEventListener("DOMContentLoaded", function () {
  let swiper; // Зберігатимемо екземпляр Swiper для можливого знищення

  function initLearnListSwiper() {
    const learnList = document.querySelector(".learn-list");

    if (window.innerWidth < 1024 && learnList && !swiper) {
      // Додаємо клас learn-swiper-container до learn-list
      learnList.classList.add("learn-swiper-container");

      // Створюємо контейнер swiper-wrapper
      const swiperWrapper = document.createElement("div");
      swiperWrapper.classList.add("swiper-wrapper");

      // Отримуємо всі елементи .column
      const columns = document.querySelectorAll(".learn-list .column");

      columns.forEach(function (column) {
        // Отримуємо всі елементи learn-item всередині кожного column
        const learnItems = Array.from(column.children);

        // Для кожного learn-item додаємо клас swiper-slide і переміщуємо до swiper-wrapper
        learnItems.forEach(function (item) {
          item.classList.add("swiper-slide");
          swiperWrapper.appendChild(item);
        });

        // Видаляємо сам column
        column.remove();
      });

      // Додаємо swiper-wrapper всередину learn-list
      learnList.appendChild(swiperWrapper);

      // Ініціалізуємо Swiper тільки якщо ширина менше 1024px
      swiper = new Swiper(".learn-swiper-container", {
        modules: [Pagination],

        slidesPerView: 1,
        spaceBetween: 9,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  }

  function destroyLearnListSwiper() {
    if (window.innerWidth >= 1024 && swiper) {
      // Знищуємо Swiper і повертаємо початкову структуру
      swiper.destroy(true, true);
      swiper = null;

      const learnList = document.querySelector(".learn-list");
      const swiperWrapper = learnList.querySelector(".swiper-wrapper");
      const learnItems = Array.from(swiperWrapper.children);

      // Створюємо колонки знову
      const column1 = document.createElement("div");
      column1.classList.add("column");
      const column2 = document.createElement("div");
      column2.classList.add("column");

      // Відновлюємо початкові колонки та елементи
      learnItems.slice(0, 2).forEach((item) => {
        item.classList.remove("swiper-slide");
        column1.appendChild(item);
      });

      learnItems.slice(2).forEach((item) => {
        item.classList.remove("swiper-slide");
        column2.appendChild(item);
      });

      // Очищаємо learn-list і додаємо колонки назад
      swiperWrapper.remove();
      learnList.classList.remove("learn-swiper-container");
      learnList.appendChild(column1);
      learnList.appendChild(column2);
    }
  }

  // Запускаємо при завантаженні сторінки
  if (window.innerWidth < 1024) {
    initLearnListSwiper();
  }

  // Слухаємо зміну розміру вікна
  window.addEventListener("resize", function () {
    if (window.innerWidth < 1024) {
      initLearnListSwiper();
    } else {
      destroyLearnListSwiper();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function moveJourneyInfoContainers() {
    if (window.innerWidth < 1024) {
      const journeyItems = document.querySelectorAll(".journey-item");
      const journeyInfoContainers = document.querySelectorAll(
        ".journey-info-container"
      );

      journeyItems.forEach((item) => {
        const target = item.getAttribute("data-target");
        const correspondingInfo = document.querySelector(
          `.journey-info-container[data-info="${target}"]`
        );
        const destination = item.querySelector(".joiurney-nfo-containerJS");

        if (correspondingInfo && destination) {
          destination.appendChild(correspondingInfo); // Переносимо відповідний блок journey-info-container
        }

        // Додаємо обробник кліку для розгортання/згортання
        item.addEventListener("click", function () {
          // Закриваємо всі відкриті контейнери перед відкриттям нового
          journeyItems.forEach((i) => {
            const container = i.querySelector(".joiurney-nfo-containerJS");
            if (container) {
              container.classList.remove("active");
            }
          });

          // Додаємо/видаляємо клас для поточного елемента
          const currentContainer = item.querySelector(
            ".joiurney-nfo-containerJS"
          );
          if (currentContainer) {
            currentContainer.classList.toggle("active");
          }
        });
      });
    }
  }

  // Викликаємо функцію при завантаженні сторінки
  moveJourneyInfoContainers();

  // Додаємо слухач події resize для повторної перевірки при зміні розміру вікна
  window.addEventListener("resize", function () {
    moveJourneyInfoContainers();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function moveJoinLink() {
    const joinLink = document.querySelector(".join-link");
    const container = document.querySelector("#feedback .container");
    const titleContainer = document.querySelector(
      ".ex-student-title-container"
    );

    if (window.innerWidth < 1024) {
      if (container && !container.contains(joinLink)) {
        container.appendChild(joinLink);
      }
    } else {
      if (titleContainer && !titleContainer.contains(joinLink)) {
        titleContainer.appendChild(joinLink);
      }
    }
  }

  // Виклик функції при завантаженні сторінки
  moveJoinLink();

  // Додавання обробника для зміни розміру вікна
  window.addEventListener("resize", moveJoinLink);
});

// PORTFOLIO SWIPER SECTION ======================

new Swiper(".portfolio-swiper-container", {
  modules: [EffectCoverflow, Navigation],
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 120,
  loop: true,
  coverflowEffect: {
    rotate: 30, // Кут повороту слайдів
    stretch: 80, // Міжслайдова відстань
    depth: 10, // Глибина 3D ефекту
    modifier: 1,
    slideShadows: false, // Додає тінь на слайди
  },

  navigation: {
    prevEl: ".portfolio-swiper-container .swiper-prev",
    nextEl: ".portfolio-swiper-container .swiper-next",
  },
});
