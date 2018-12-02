import AbstractView from './abstract-view';

class ModalErrorView extends AbstractView {
  get template() {
    return `
    <section class="modal">
    <h2 class="modal__title">Произошла ошибка!</h2>
    <p class="modal__text">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
    </section>`;
  }
}

export default ModalErrorView;
