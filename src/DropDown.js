import React, { Component } from "react";

import PropTypes from "proptypes";

import "./dropdown.css";

import { fromNullable } from "fp-small/dist/Either";

const boldMatch = (arr, test) => {
  const re = new RegExp(`(${test})`, "ig");
  return arr.map((x, i) => (
    <div className="item" key={i}>
      {x
        .split(re)
        .map((x, j) => (re.test(x) ? <b key={`${i}${j}`}>{x}</b> : x))}
    </div>
  ));
};
const arrayToItems = arr => {
  return arr.map((x, i) => (
    <div className="item" key={i}>
      {x}
    </div>
  ));
};

const toDropItems = (items, input) => {
  return fromNullable(input ? items : undefined)
    .map(x => x.filter(x => new RegExp(input, "i").test(x)))
    .map(x =>
      fromNullable(x.length ? x : undefined)
        .map(x => boldMatch(x, input))
        .fold(x => <div className="item"> No Content</div>, x => x)
    )
    .fold(() => arrayToItems(items), x => x);
};

const toSubDropDownItems = (items, input) => {
  return Object.entries(items).map(x => (
    <div className="sub">
      {x[0]}
      {toDropItems(x[1], input)}
    </div>
  ));
};

const toDropDownContent = (items, input = "") => {
  input = input.replace(/\\/g, "");
  return items instanceof Array
    ? toDropItems(items, input)
    : toSubDropDownItems(items, input);
};

class DropDown extends Component {
  state = {
    input: "",
    active: false
  };
  static propTypes = {
    /** Trigger DropDown*/
    show: PropTypes.bool,
    /** DropDown Items */
    items: PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.array),
      PropTypes.array
    ])
  };

  static defaultProps = {
    show: false,
    items: []
  };

  onChange = e => {
    this.setState({ input: e.target.value });
  };
  render() {
    const { input, active } = this.state;
    const { items = [] } = this.props;
    const itemsRender = toDropDownContent(items, input);

    return (
      <div className={`infinity drop-down`}>
        <div
          className="trigger"
          onClick={() => this.setState({ active: true })}
        >
          <select />
        </div>

        <div className={`menu ${active ? "active" : ""}`}>
          <input onChange={this.onChange} />
          <div className="content">{itemsRender}</div>
        </div>
      </div>
    );
  }
}

export default DropDown;
