import * as React from 'react';

interface Props {
    Name: string,
    RemoveItem: (key: string) => void,
    Key: string
}

interface State {
    Complete: boolean,
}

export default class TodoItem extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);

        this.state = {
            Complete: false,
        };
    }

    public render() {
        var css = {
            width: "100%",
            textAlign: "left",
            paddingLeft: 5,
        }

        return (
            <div className="todoItemContainer">
                <table>
                    <tr>
                        <th>
                            <input className="checkbox" type="checkbox" checked={this.state.Complete} onChange={(e) => this.onChange(e)} />
                        </th>
                        <th style={css}>
                            <span className={"todoName" + (this.state.Complete ? " complete" : "")} > {this.props.Name} </span>
                        </th>
                        <th>
                            <button className="removeTodo todoButton" onClick={(event) => this.props.RemoveItem(this.props.Key)} >Remove</button>
                        </th>
                    </tr>
                </table>
            </div>
        );
    }

    private onChange(checkbox: any) {
        this.setState({
            Complete: checkbox.target.checked,
        });
    }
}
