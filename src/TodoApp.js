import React, { Component } from 'react';
import TodoList from './TodoList';
import './TodoApp.css';

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todolists: [],
      totalTodoNum: 0,
      totalCompletedNum: 0,
      todolistTitle: '',
    };
  }
  handleChange = (e) => {
    this.setState({todolistTitle: e.target.value});
  }
  handleKeyPress = (e) => {
    const todolists = this.state.todolists;
    const title = e.target.value;
    if(e.key === 'Enter') {
      if(title.trim().length === 0) {
        alert('Title cannot be blank!');
      } else {
        const newlist = {
          todolistTitle: title,
          todoNum: 0,
          completedNum: 0,
          todos: [],
        };
        todolists.push(newlist);
        this.setState({
          todolists,
          todolistTitle: '',
        });
      }
    }
  }
  editTitle = (id, title) => {
    const todolists = this.state.todolists;
    todolists[id-'0'].todolistTitle = title;
    this.setState({todolists});
  }
  addTodo = (id, todo) => {
    let todolists = this.state.todolists;
    todolists[id].todos.push(todo);
    todolists[id].todoNum += 1;
    let totalTodoNum = this.state.totalTodoNum + 1;
    this.setState({
      todolists,
      totalTodoNum,
    });
  }
  completeTodo = (id, item_id) => {
    let todolists = this.state.todolists;
    let completed = () => {
      if(todolists[id].todos[item_id].completed) return todolists[id].todos[item_id].completed = 0;
      else return todolists[id].todos[item_id].completed = 1;
    }
    let totalCompletedNum = this.state.totalCompletedNum
    let totalTodoNum = this.state.totalTodoNum
    if(completed() === 0) {
      todolists[id].todoNum += 1;
      todolists[id].completedNum -= 1;
      totalTodoNum += 1;
      totalCompletedNum -= 1;
    } else {
      todolists[id].todoNum -= 1;
      todolists[id].completedNum += 1;
      totalTodoNum -= 1;
      totalCompletedNum += 1;
    }
    this.setState({
      todolists,
      totalTodoNum,
      totalCompletedNum,
    });
  }
  render = () => {
    return (
      <div className="App">
        <div className="App-header">
          <h1>TodoList</h1>
          <ul className="App-counts">
            <li>todo: {this.state.totalTodoNum}</li>
            <li>completed: {this.state.totalCompletedNum}</li>
          </ul>
          <input 
            className="App-title"
            type="text" 
            placeholder="Add a new todolist"
            value={this.state.todolistTitle} 
            onChange={this.handleChange} 
            onKeyPress={this.handleKeyPress}
            autoFocus 
          />
        </div>
        <div className="App-content">
          {this.state.todolists.map((todolist, i) => <TodoList
            id={i}
            todolistTitle={todolist.todolistTitle}
            editTitle={this.editTitle}
            addTodo={this.addTodo}
            completeTodo={this.completeTodo}
            todoNum={todolist.todoNum}
            completedNum={todolist.completedNum}
            todos={todolist.todos} 
          />)}
        </div>
        <p className="App-footer">
          &copy; <a href="https://github.com/HowardMHJuan">HOWARD M.H. JUAN</a> 2017
        </p>
      </div>
    );
  }
}

export default TodoApp;
