import React, { Component } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: 0,
      todolistTitle: props.todolistTitle,
      todoContent: '',
    };
  }
  handleTitleClick = () => {
    this.setState({editTitle: 1});
  }
  handleTitleChange = (e) => {
    this.setState({todolistTitle: e.target.value});
  }
  handleTitleKeyPress = (e) => {
    let title = e.target.value;
    if(e.key === 'Enter') {
      if(title.trim().length === 0) {
        alert('Title cannot be blank!');
      } else {
        this.props.editTitle(this.props.id, title);
        this.setState({editTitle: 0});
      }
    }
  }
  handleChange = (e) => {
    this.setState({todoContent: e.target.value});
  }
  handleKeyPress = (e) => {
    const content = e.target.value;
    if(e.key === 'Enter') {
      if(content.trim().length === 0) {
        alert('Todo cannot be blank!');
      } else {
        const newtodo = {
          todoContent: content,
          completed: 0,
        };
        this.props.addTodo(this.props.id, newtodo);
        this.setState({todoContent: ''});
      }
    }
  }
  completeTodo = (id) => {
    this.props.completeTodo(this.props.id, id);
  }
  render = () => {
    let title;
    if(this.state.editTitle) {
      title = (
        <input 
          type="text"
          value={this.state.todolistTitle} 
          onChange={this.handleTitleChange} 
          onKeyPress={this.handleTitleKeyPress}
          autoFocus
        />
      );
    } else {
      title = (
      <p
        className="List-title"
        onMouseOver={this.handleTitleMouseOver}
        onClick={this.handleTitleClick}
      >{this.state.todolistTitle}</p>
      );
    }
    return (
      <div className="card teal lighten-5 List">
        <div id="H" className="card-content purple darken-4 List-header">
          {title}
          <ul className="List-counts">
            <li>todo: {this.props.todoNum}</li>
            <li>completed: {this.props.completedNum}</li>
          </ul>
          <input 
            type="text"
            placeholder="Add a new todo"
            value={this.state.todoContent} 
            onChange={this.handleChange} 
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className="List-content">
          {this.props.todos.map((todo, i) => <TodoItem
            id={i}
            completeTodo={this.completeTodo}
            todoContent={todo.todoContent}
            completed={todo.completed}
          />)}
        </div>
      </div>
    );
  }
}

export default TodoList;
