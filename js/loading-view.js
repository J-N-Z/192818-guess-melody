import AbstractView from './abstract-view';

export default class LoadingView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div class="game__loading">
        <div class="game__loading-spinner"></div>
      </div>`;
  }

  bind() { }

  onReplay() { }
}
