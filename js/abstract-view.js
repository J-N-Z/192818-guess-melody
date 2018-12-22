export default class AbstractView {
  constructor() {
    this._el = null;
  }

  get template() { }

  get element() {
    if (!this._el) {
      this.render();
      this.bind();
    }
    return this._el;
  }

  render() {
    this._el = document.createElement(`div`);
    this._el.innerHTML = this.template;
  }

  bind() { }
}
