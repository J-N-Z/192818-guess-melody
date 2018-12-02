import AbstractView from './abstract-view';

class ModalConfirmView extends AbstractView {
  get element() {
    return `
    <section class="modal">
    <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
    <h2 class="modal__title">Подтверждение</h2>
    <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
    <div class="modal__buttons">
      <button class="modal__button button">Ок</button>
      <button class="modal__button button">Отмена</button>
    </div>
    </section>`;
  }

  bind() {
    const [confirmBtn, cancelBtn] = this._el.querySelectorAll(`.modal__button`);
    confirmBtn.addEventListener(`click`, () => this.onConfirm());
    cancelBtn.addEventListener(`click`, () => this.onCancel());
  }

  onConfirm() { }

  onCancel() { }
}

export default ModalConfirmView;
