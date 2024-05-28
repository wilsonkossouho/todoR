import React, { Component } from "react";

const Header = ({ add, input, change }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        add();
      }}
    >
      <input
        placeholder="enter task"
        className="rounded"
        value={input}
        onChange={(e) => change(e)}
      />
      <button type="submit" className="rounded">
        add
      </button>
    </form>
  );
};

const List = ({items, delet}) => {
  return (
    <ul className="theList">
      {items.map((item) => {
        return (
          <li key={item.key} onClick={() => delet(item.key)}>
            {item.text}
          </li>
        );
      })}
    </ul>
  );
};

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ text: "Learn React", key: Date.now() }],
      input: "",
    };
  }

  componentDidMount() {
    let items = JSON.parse(localStorage.getItem("items"));
    this.setState({ items: items });
  }
  handlerChange = (e) => {
    //console.log(e.target.value);
    this.setState({ input: e.target.value });
  };

  add = () => {
    //console.log(this.state.input)
    // this.setState({
    //   items: this.state.items.concat({text: this.state.input, key: Date.now()})
    // })

    if (!this.state.input.length) {
      return;
    }

    let newItem = { text: this.state.input, key: Date.now() };
    this.setState((state) => ({
      items: [newItem].concat(state.items),
      input: "",
    }));
    localStorage.setItem(
      "items",
      JSON.stringify([newItem].concat(this.state.items))
    );
  };

  delete = (key) => {
    let filtered = this.state.items.filter((item) => {
      if (key != item.key) {
        return item;
      }
    });

    this.setState({
      items: filtered,
    });

    //Database
    localStorage.setItem("items", JSON.stringify(filtered));
  };

  render() {
    return (
      <div id="container">
        <div className="todoListMain">
          <div className="header">
            <Header
              add={this.add}
              input={this.state.input}
              change={this.handlerChange}
            />
            <List items={this.state.items} delet={this.delete} />
          </div>
        </div>
      </div>
    );
  }
}
