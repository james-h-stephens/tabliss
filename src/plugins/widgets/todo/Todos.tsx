import * as React from 'react';
import { TodoCollection } from './TodoCollection';
import { TodoProps } from './TodoProps';
import './Todo.sass'

import TodoDisplay from './TodoDisplay';

interface State {
    TodoName: string,
}

class Todos extends React.Component<TodoCollection, State>
{
    constructor(props: TodoCollection) {
        super(props);
        this.state = {
            TodoName: '',
        }

        this.addTodo = this.addTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    public render() {
        return (
            <div className='TodoContainer'>
                <div>
                    <input className='addNewTodo' type='text' onChange={(ev) => this.handleChange(ev)} value={this.state.TodoName} />
                    <button className='todoButton' onClick={() => this.addTodo()}>Add Task</button>
                </div>
                {Array.from(TodoCollection.GetCollection().todos).map((value) => {
                    return <TodoDisplay Key={value[0]} Name={value[1].name} RemoveItem={this.removeTodo} />;
                })}
            </div>
        );
    }

    private handleChange(event: any) {
        this.setState({ TodoName: event.target.value });
    }

    private addTodo() {
        var id = this.generateId();
        const todoProps = new TodoProps(this.state.TodoName, false);

        TodoCollection.GetCollection().todos.set(id, todoProps);
        TodoCollection.CollectionChanged();

        this.setState({
            TodoName: '',
        });
    }

    private removeTodo(key: string) {
        TodoCollection.GetCollection().todos.delete(key);
        TodoCollection.CollectionChanged();

        this.forceUpdate();
    }

    private generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
}

export default Todos;
