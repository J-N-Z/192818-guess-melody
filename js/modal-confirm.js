import {getElementFromTemplate} from './utils.js';

const template = `
<section class="modal">
<button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
<h2 class="modal__title">Подтверждение</h2>
<p class="modal__text">Вы уверены что хотите начать игру заново?</p>
<div class="modal__buttons">
  <button class="modal__button button">Ок</button>
  <button class="modal__button button">Отмена</button>
</div>
</section>`;

export default getElementFromTemplate(template);
