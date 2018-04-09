import * as React from 'react';
import { TodoCollection } from './TodoCollection';
import { TodoProps } from './TodoProps';

interface Props extends TodoCollection {
    onChange: (settings: Partial<TodoCollection>) => void;
}

class TodoSettings extends React.PureComponent<Props> {
    static defaultProps = {
        todos: new Map<string, TodoProps>(),
        visible: false,
    };

    constructor(props: Props) {
        super(props);

        TodoCollection.onChange = this.props.onChange;
    }

    render() {
        return <i>No settings for this plug-in.</i>;
    }
}

export default TodoSettings;
