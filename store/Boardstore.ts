import { create } from 'zustand'
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumn';
import { databases, storage } from '@/appwrite';

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    newTaskInput: string;
    searchString: string;
    newTaskType: TypedColumn;
    image: File | null;

    setNewTaskInput: (input: string) => void;
    setSearchString: (searchString: string) => void;
    setTaskType: (columnId: TypedColumn) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
    setImage: (image: File | null) => void;

}

export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    searchString: "",
    newTaskInput: "",
    newTaskType: "todo",
    image: null,

    setSearchString: (searchString) => set({ searchString }),
    getBoard: async () => {
        const board = await getTodosGroupByColumn();

        set({ board });

    },
    setBoardState: (board) => set({ board }),

    updateTodoInDB: async (todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status: columnId,
            }

        );
    },
    setTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),


    deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
        const newColoumns = new Map(get().board.columns);

        newColoumns.get(id)?.todos.splice(taskIndex, 1);

        set({ board: { columns: newColoumns } });

        if (todo.image) {
            await storage.deleteFile(todo.image, todo.image);

        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id
        );

    },

    setNewTaskInput: (input: string) => set({ newTaskInput: input }),
    setImage: (image: File | null) => set({ image }),

}));

