const showCoords = (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const text = `<span class="co-ordinates">${`coordinate x:${x} y:${y}`}</span>`;
  document.getElementsByName("mapname")[0].append(text);
};
