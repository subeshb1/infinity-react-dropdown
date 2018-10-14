import React, { Component } from "react";

import PropTypes from "proptypes";

import "./dropdown.css";

import { fromNullable } from "fp-small/dist/Either";

const boldMatch = (arr, test) => {
  const re = new RegExp(`(${test})`, "ig");
  return arr.map((x, i) => (
    <div className="item" key={i} value={x}>
      {x
        .split(re)
        .map((x, j) => (re.test(x) ? <b key={`${i}${j}`}>{x}</b> : x))}
    </div>
  ));
};
const arrayToItems = arr => {
  return arr.map((x, i) => (
    <div className="item" key={i} value={x}>
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
        .fold(x => undefined, x => x)
    )
    .fold(() => arrayToItems(items), x => x);
};

const toSubDropDownItems = (items, input) => {
  return Object.entries(items)
    .map(
      x =>
        toDropItems(x[1], input) && [
          <div className="sub" key={x[0]}>
            {x[0]}
          </div>,
          ...toDropItems(x[1], input)
        ]
    )
    .filter(x => x !== undefined)
    .reduce((acc, cur) => [...acc, ...cur], []);
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
    active: false,
    value: ""
  };
  static propTypes = {
    /** Trigger DropDown*/
    show: PropTypes.bool,
    /** DropDown Items */
    items: PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.array),
      PropTypes.array
    ]),
    placeholder: PropTypes.string
  };

  static defaultProps = {
    show: false,
    items: []
  };
  ref = React.createRef();
  componentDidMount() {}

  onChange = e => {
    this.setState({ input: e.target.value });
  };
  render() {
    const { input, active, value } = this.state;
    const { items = [], placeholder } = this.props;
    let itemsRender = toDropDownContent(items, input);
    const isEmpty = !itemsRender || itemsRender[0] == undefined;
    console.log(itemsRender);
    if (!isEmpty)
      itemsRender = itemsRender.map(
        x =>
          x.props.className === "item" ? (
            <x.type
              {...x.props}
              onClick={() => {
                this.setState({ value: x.props.value, active: false });
              }}
            />
          ) : (
            x
          )
      );

    return (
      <div
        className={`infinity drop-down ${active ? "active" : ""}`}
        style={{ width: 200 }}
        tabIndex="0"
        onFocus={e => {
          this.setState({ active: true }, () => {
            this.ref.current.focus();
          });
        }}
      >
        <div className={value !== "" ? "value" : "placeholder"}>
          {value !== "" ? value : placeholder}
        </div>

        <div className={`menu `}>
          <input
            onChange={this.onChange}
            ref={this.ref}
            onBlur={() => this.setState({ active: false })}
          />
          <div className="content">{itemsRender}</div>
          {isEmpty && <button>Add</button>}
        </div>
      </div>
    );
  }
}

export default DropDown;
