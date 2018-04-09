import { TodoProps } from "./TodoProps";

export class TodoCollection {
    private static instance: TodoCollection;

    public static GetCollection(): TodoCollection {
        if (TodoCollection.instance === undefined) {
            TodoCollection.instance = new TodoCollection();
        }

        return TodoCollection.instance;
    }

    public static onChange: (settings: Partial<TodoCollection>) => void;
    public static CollectionChanged() {
        var todos = TodoCollection.GetCollection().todos;
        TodoCollection.onChange({ todos: todos, visible: false });
    }

    public todos: Map<string, TodoProps>;
    public visible: boolean;

    private constructor() {
        this.todos = new Map<string, TodoProps>();
        this.visible = true;
    }
}
