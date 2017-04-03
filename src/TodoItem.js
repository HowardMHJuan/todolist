import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  handleClick = () => {
    this.props.completeTodo(this.props.id);
  }
  render = () => {
    return (
      <div className="Item">
        <input 
          type="checkbox"
          id={this.props.id}
          onClick={this.handleClick}
          checked={this.props.completed} 
        />
        <label htmlFor={this.props.id}>{this.props.todoContent}</label>
      </div>
    );
  }
}

export default TodoItem;