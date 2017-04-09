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
  editTitle = (listId, title) => {
    const todolists = this.state.todolists;
    todolists[listId-'0'].todolistTitle = title;
    this.setState({todolists});
  }
  addTodo = (listId, todo) => {
    let todolists = this.state.todolists;
    todolists[listId].todos.push(todo);
    todolists[listId].todoNum += 1;
    let totalTodoNum = this.state.totalTodoNum + 1;
    this.setState({
      todolists,
      totalTodoNum,
    });
  }
  deleteTodolist = (listId) => {
    let todolists = this.state.todolists;
    let totalCompletedNum = this.state.totalCompletedNum;
    let totalTodoNum = this.state.totalTodoNum;
    totalCompletedNum -= todolists[listId].completedNum;
    totalTodoNum -= todolists[listId].todoNum;
    delete todolists[listId];
    this.setState({
      todolists,
      totalTodoNum,
      totalCompletedNum,
    });
  }
  completeTodo = (listId, itemId) => {
    let todolists = this.state.todolists;
    let totalCompletedNum = this.state.totalCompletedNum;
    let totalTodoNum = this.state.totalTodoNum;
    if(todolists[listId].todos[itemId].completed) {
      todolists[listId].todos[itemId].completed = false;
      todolists[listId].todoNum += 1;
      todolists[listId].completedNum -= 1;
      totalTodoNum += 1;
      totalCompletedNum -= 1;
    } else {
      todolists[listId].todos[itemId].completed = true;
      todolists[listId].todoNum -= 1;
      todolists[listId].completedNum += 1;
      totalTodoNum -= 1;
      totalCompletedNum += 1;
    }
    this.setState({
      todolists,
      totalTodoNum,
      totalCompletedNum,
    });
  }
  deleteTodo = (listId, itemId) => {
    let todolists = this.state.todolists;
    let totalCompletedNum = this.state.totalCompletedNum;
    let totalTodoNum = this.state.totalTodoNum;
    if(todolists[listId].todos[itemId].completed) {
      todolists[listId].completedNum -= 1;
      totalCompletedNum -= 1;
    } else {
      todolists[listId].todoNum -= 1;
      totalTodoNum -= 1;
    }
    delete todolists[listId].todos[itemId];
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
            maxLength="20"
            placeholder="Add a new todolist"
            value={this.state.todolistTitle} 
            onChange={this.handleChange} 
            onKeyPress={this.handleKeyPress}
            autoFocus 
          />
        </div>
        <div className="App-content">
          {this.state.todolists.map((todolist, i) => <TodoList
            listId={i}
            todolistTitle={todolist.todolistTitle}
            editTitle={this.editTitle}
            deleteTodolist={this.deleteTodolist}
            addTodo={this.addTodo}
            completeTodo={this.completeTodo}
            deleteTodo={this.deleteTodo}
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
