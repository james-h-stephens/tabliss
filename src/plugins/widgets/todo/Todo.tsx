import * as React from 'react';
import "./Todo.sass"

import TodoItem from './TodoItem';

interface State {
    TodoItems: Map<string, JSX.Element>,
    TodoName: string,
}

class Todo extends React.Component<any, State>
{
    constructor() {
        super(null);

        this.state = {
            TodoItems: new Map<string, JSX.Element>(),
            TodoName: "",
        }

        this.addTodo = this.addTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    public render() {
        return (
            <div className="TodoContainer">
                <div>
                <input className="addNewTodo" type="text" onChange={(ev) => this.handleChange(ev)} value={this.state.TodoName} />
                    <button className="todoButton" onClick={() => this.addTodo()}>Add Task</button>
                    </div>
                {Array.from(this.state.TodoItems).map((value) => {
                    return value[1];
                })}
            </div>
        );
    }

    private handleChange(event: any) {
        this.setState({ TodoName: event.target.value });
    }

    private addTodo() {
        this.setState((previousState) => {
            var todoItems = previousState.TodoItems;
            var id = this.generateId();
            todoItems.set(id, <TodoItem Name={previousState.TodoName} RemoveItem={this.removeTodo} Key={id} />);

            return {
                TodoItems: todoItems,
                TodoName: "",
            };
        });
    }

    private removeTodo(key: string) {
        this.setState((previousState) => {
            var todoItems = previousState.TodoItems;

            todoItems.delete(key);

            return {
                TodoItems: todoItems,
                TodoName: previousState.TodoName,
            };
        });
    }

    private generateId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
    };
}

export default Todo;
