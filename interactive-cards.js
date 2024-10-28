// Реєструємо плагіни
gsap.registerPlugin(Draggable, ScrollTrigger);

const images = gsap.utils.toArray(".item");

const imageSize = images.length;
const total = images.length;
const degree = 120 / total;

const init = () => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".why-card-list", // Точкою запуску буде ваш контейнер з картками
      start: "top 80%", // Коли верхня частина карток досягне 80% висоти вікна
      toggleActions: "play none none none", // Запускає анімацію тільки один раз при скролі
    },
  });

  images.forEach((image, index) => {
    const sign = Math.floor((index / 2) % 2) ? 1 : -1;
    const value = Math.floor((index + 4) / 4) * 4;
    const rotation = index > imageSize - 3 ? 0 : sign * value;

    gsap.set(image, {
      rotation: rotation,
      scale: 0.5,
    });

    timeline.from(
      image,
      {
        x: () =>
          index % 2
            ? window.innerWidth + image.clientWidth * 4
            : -window.innerWidth - image.clientWidth * 4,
        y: () => window.innerHeight - image.clientHeight,
        rotation: index % 2 ? 200 : -200,
        scale: 4,
        opacity: 1,
        ease: "power4.out",
        duration: 1,
        delay: 0.15 * Math.floor(index / 2),
      },
      0
    );

    let rotationAngle = index * degree;
    timeline.to(
      image,
      {
        scale: 1,
        duration: 0,
      },
      0.15 * (imageSize / 2 - 1) + 1
    );

    timeline.to(
      image,
      {
        transformOrigin: "center 200vh",
        rotation:
          index > imageSize / 2 ? -degree * (imageSize - index) : rotationAngle,
        duration: 1,
        ease: "power1.out",
      },
      0.15 * (imageSize / 2 - 1) + 1
    );
  });
};

const draggable = () => {
  let start = 0;
  Draggable.create(".items", {
    type: "rotation",
    snap: (value) => Math.round(value / degree) * degree,
    onDragStart: function () {
      start = this.rotation % 360; // Залишок від ділення
    },
    onDragEnd: function () {
      const rotation = this.rotation % 360;
      const offset = Math.abs(rotation - start);

      if (rotation > start) {
        if (offset < degree / 2) {
          gsap.to(".items", {
            rotation: `-=${offset}`,
            duration: 0.3,
          });
        } else {
          gsap.to(".items", {
            rotation: `+=${degree - offset}`,
            duration: 0.3,
          });
        }
      } else {
        if (offset < degree / 2) {
          gsap.to(".items", {
            rotation: `+=${offset}`,
            duration: 0.3,
          });
        } else {
          gsap.to(".items", {
            rotation: `-=${degree - offset}`,
            duration: 0.3,
          });
        }
      }
    },
    onDrag: function () {
      wrapRotation(this);
    },
    onThrowUpdate: function () {
      wrapRotation(this);
    },
  });
};

// Функція для безкінечного циклу
const wrapRotation = (draggable) => {
  const modRotation = gsap.utils.wrap(0, 360, draggable.rotation);
  gsap.set(".items", { rotation: modRotation });
};

init();
draggable();
