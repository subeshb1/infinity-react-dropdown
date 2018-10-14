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
  static id = 0;
  state = {
    input: "",
    active: false,
    value: "",
    selectedItem: -1
  };
  visibleItem = -1;
  value = "";
  maxLength = Infinity;
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
  id = DropDown.id++;

  static defaultProps = {
    show: false,
    items: []
  };
  ref = React.createRef();
  componentDidMount() {}
  onChangeValue(value) {
    this.ref.current.blur();
    this.setState(
      ({ input }) => ({
        value: value || input,
        active: false,
        input: ""
      }),

      () => {
        this.props.onChange && this.props.onChange(this.state.value);
      }
    );
  }

  keyPress = e => {
    if (e.key === "Enter") {
      this.onChangeValue(this.value);
      return;
    }
    if (!/Arrow/gi.test(e.key)) return;
    if (e.key === "ArrowDown")
      this.visibleItem = Math.min(this.maxLength, this.visibleItem + 1);
    else if (e.key === "ArrowUp")
      this.visibleItem = Math.max(-1, this.visibleItem - 1);

    this.setState({}, () => {
      const activeItem = document.querySelector(
        `#inf-dropdown-${this.id} .item.active`
      );
      const content = document.querySelector(
        `#inf-dropdown-${this.id} .content`
      );
      if (!activeItem || !content) return;
      content.scrollTop += activeItem.getBoundingClientRect().top - 200;
    });
  };

  onChange = e => {
    this.setState({ input: e.target.value });
  };
  render() {
    const { input, active, value } = this.state;
    const { items = [], placeholder } = this.props;
    let itemsRender = toDropDownContent(items, input);
    const isEmpty = !itemsRender || itemsRender[0] == undefined;
    if (!isEmpty) {
      let count = -1;
      itemsRender = itemsRender.map(x => {
        const i = x.props.className === "item" ? ++count : count;
        if (this.visibleItem === i) {
          this.value = x.props.value;
        }
        return x.props.className === "item" ? (
          <x.type
            key={i}
            {...x.props}
            value={undefined}
            className={this.visibleItem === i ? "item active" : "item"}
            onMouseEnter={() => {
              this.visibleItem = i;
              this.value = x.props.value;
              this.setState({}, () => {});
            }}
            onClick={() => {
              this.onChangeValue(x.props.value);
            }}
          />
        ) : (
          x
        );
      });
      this.maxLength = count;
    } else {
      this.visibleItem = -1;
      this.value = "";
    }

    return (
      <div
        id={"inf-dropdown-" + this.id}
        className={`infinity drop-down ${active ? "active" : ""}`}
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
            value={input}
            onChange={this.onChange}
            ref={this.ref}
            onBlur={() => this.setState({ active: false })}
            onKeyDown={this.keyPress}
          />
          <div className="content">{itemsRender}</div>
        </div>
      </div>
    );
  }
}

export default DropDown;
