import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  handleCheck = () => {
    this.props.completeTodo(this.props.itemId);
  }
  handleDelete = () => {
    this.props.deleteTodo(this.props.itemId);
  }
  ifLineThrough = () => {
    if(this.props.completed) return 'line-through';
    else return undefined;
  }
  render = () => {
    const itemId = this.props.listId + '_' + this.props.itemId;
    const style = {
      textDecoration: this.ifLineThrough(),
    }
    return (
      <div className="Item">
        <input 
          type="checkbox"
          id={itemId}
          onClick={this.handleCheck}
          checked={this.props.completed} 
        />
        <label htmlFor={itemId} style={style}>{this.props.todoContent}</label>
        <i className="blue-text text-darken-2 material-icons" onClick={this.handleDelete}>close</i>
      </div>
    );
  }
}

export default TodoItem;