import React, { useState } from 'react';
import './App.css';
import styled from '@emotion/styled';



const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Ul = styled.ul`
    list-style: none;
    padding: 0;
    line-height: 20px;
    width: 500px;
`

const Input = styled.input`
    border: none;
    background: yellowgreen;
    color: #333;
    font-size: 14px;
    outline: none;
    width: 100%;
    
`

const Todo = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0;

    
`
const Checkbox = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid green;
    &:hover {
      background-color: lightgray;
      border: 1px solid rgba(255, 255, 255, 0);
    }
`

function App() {
  const [todos, setTodos] = useState([
    {
      content: '第一件事情',
      isCompleted: true,
    },
    {
      content: '第二件事情',
      isCompleted: false,
    },
    {
      content: '第三件事情',
      isCompleted: false,
    }
  ]);


  function handleKeyDown(e: any, i: any) {
    // console.log(e.key,i)
    if (e.key === 'Enter') {
      // console.log(e.key,i)
      addTodoAtIndex(e, i);
    }
    if (e.key === 'Backspace' && todos[i].content === '') {
      e.preventDefault();
      return removeTodoAtIndex(i);
    }
  }

  //添加事件
  function addTodoAtIndex(e: any, i: any) {
    const newTodos = [...todos];
    // console.log(newTodos)
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
    // console.log(newTodos)

  }

  // 更新事件
  function updateTodoAtIndex(e: any, i: any) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }

  // 删除事件
  function removeTodoAtIndex(i: any) {
    if (i === 0 && todos.length === 1) return;
    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
  }

  // 选中事件
  function toggleTodoCompleteAtIndex(index: any) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  return (
    <div>
      <Form >
        
        <Ul>
          {todos.map((todo, i) => (
            <Todo className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
              <Checkbox onClick={() => toggleTodoCompleteAtIndex(i)}>
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
              </Checkbox>
              <Input
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </Todo>
          ))}
        </Ul>
      </Form>
    </div>
  );
}

export default App;


