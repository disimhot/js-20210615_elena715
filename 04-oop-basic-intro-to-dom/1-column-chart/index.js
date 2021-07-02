function getColumnProps(data) {
  const maxValue = Math.max(...data);
  const scale = 50 / maxValue;

  return data.map((item) => {
    return {
      percent: ((item / maxValue) * 100).toFixed(0) + "%",
      value: String(Math.floor(item * scale)),
    };
  });
}


export default class ColumnChart {
  constructor(props = {}) {
    this.label = props.label;
    this.data = props.data ? getColumnProps(props.data) : [];
    this.value = props.formatHeading ? props.formatHeading(props.value) : props.value;
    this.link = props.link;
    this.chartHeight = 50;

    this.render();
    this.update();
  }

  update(newData = []) {
    this.data = getColumnProps(newData);
    this.renderColumns();
  }

  render() {
    const divElement = document.createElement("div");

    divElement.innerHTML = `<div class='column-chart' style="--chart-height: 50">
      <div class="column-chart__title">
        ${this.label}
        ${this.link ? `<a class="column-chart__link" href=${this.link}>View all</a>` : " <span />"}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
          ${this.value}
        </div>
        <div data-element="body" class="column-chart__chart">
          ${this.data?.length > 0
            ? this.renderColumns()
            : this.renderDefaultImage()
          }
        </div>
    </div>
    `;

    this.element = divElement.firstElementChild;

    if (this.data?.length === 0) { this.element.classList.add('column-chart_loading'); }
  }

  renderColumns() {
    return this.data.reduce(
      (template, { percent, value }) =>
      (template = `${template}
      <div style="--value: ${value}" data-tooltip=${percent}></div>
      `),
      ""
    );
  }

  renderDefaultImage() {
    return `<img src="charts-skeleton.svg" />`;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
