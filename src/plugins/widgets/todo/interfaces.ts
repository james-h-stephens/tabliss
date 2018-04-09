import { TodoProps } from "./TodoProps";

export interface Settings {
    todos: Map<string, TodoProps>;
    visible: boolean;
}
