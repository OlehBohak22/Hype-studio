import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { render } from 'https://cdn.skypack.dev/react-dom';

const GLYPHS =
  'ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ0123456789±!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const App = ({ srOnlyTextProp }) => {
  const [text, setText] = useState(srOnlyTextProp);
  const [speed, setSpeed] = useState(0.15);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    document.body.dataset.explode = explode;
  }, [explode]);

  return (
    <>
      <button className="join-link" style={{ '--speed': speed }}>
        {text.split('').map((char, index) => {
          return (
            <span
              key={index}
              data-char={char}
              style={{
                '--index': index,
                '--char-1': `"${
                  GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                }"`,
                '--char-2': `"${
                  GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                }"`,
                '--char-3': `"${
                  GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                }"`,
              }}
            >
              {char}
            </span>
          );
        })}
        <span className="sr-only">{srOnlyTextProp}</span>
      </button>
      <button className="dummy">{text}</button>

      <span className="corner-top-right"></span>
      <span className="corner-bottom-left"></span>
    </>
  );
};

// Масив ID DOM-вузлів
const rootNodes = document.querySelectorAll('[data-sr-text]');

// Цикл для рендерингу компонентів у всі зазначені вузли з текстом із HTML
rootNodes.forEach(rootNode => {
  const srOnlyText = rootNode.getAttribute('data-sr-text'); // Отримуємо текст із атрибута
  render(<App srOnlyTextProp={srOnlyText} />, rootNode);
});
