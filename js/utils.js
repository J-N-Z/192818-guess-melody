export function getElementFromTemplate(str) {
  const element = document.createElement(`div`);
  element.innerHTML = str;

  return element;
}

export function renderView(view) {
  const sectionMain = document.querySelector(`.main`);

  sectionMain.innerHTML = ``;
  sectionMain.appendChild(view);
}
