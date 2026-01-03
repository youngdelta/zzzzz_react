import React, { Component } from "react";

class TodoCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItemText: "",
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  createNewTodo = () => {
    if (this.state.newItemText && this.state.newItemText.trim().length > 0) {
      this.props.callback(this.state.newItemText.trim());
      this.setState({ newItemText: "" });
    }
  };

  render() {
    return (
      <div className="my-1">
        <input
          className="form-control"
          value={this.state.newItemText}
          onChange={this.updateNewTextValue}
        />
        <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>
          ADD
        </button>
      </div>
    );
  }
}

export default TodoCreator;
