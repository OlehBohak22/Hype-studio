import React, { useState, useEffect } from "https://cdn.skypack.dev/react";
import { render } from "https://cdn.skypack.dev/react-dom";

const GLYPHS =
  "ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ0123456789±!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const App = ({ srOnlyTextProp }) => {
  const [text, setText] = useState(srOnlyTextProp);
  const [speed, setSpeed] = useState(0.15);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    document.body.dataset.explode = explode;
  }, [explode]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "button",
      { className: "join-link", style: { "--speed": speed } },
      text.split("").map((char, index) =>
        React.createElement(
          "span",
          {
            key: index,
            "data-char": char,
            style: {
              "--index": index,
              "--char-1": `"${
                GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              }"`,
              "--char-2": `"${
                GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              }"`,
              "--char-3": `"${
                GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              }"`,
            },
          },
          char
        )
      ),
      React.createElement("span", { className: "sr-only" }, srOnlyTextProp)
    ),
    React.createElement("button", { className: "dummy" }, text),
    React.createElement("span", { className: "corner-top-right" }),
    React.createElement("span", { className: "corner-bottom-left" })
  );
};

// Масив ID DOM-вузлів
const rootNodes = document.querySelectorAll("[data-sr-text]");

// Цикл для рендерингу компонентів у всі зазначені вузли з текстом із HTML
rootNodes.forEach((rootNode) => {
  const srOnlyText = rootNode.getAttribute("data-sr-text"); // Отримуємо текст із атрибута
  render(React.createElement(App, { srOnlyTextProp: srOnlyText }), rootNode);
});
