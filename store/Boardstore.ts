import { create } from 'zustand'
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumn';
import { ID, databases, storage } from '@/appwrite';
import uploadImage from '@/lib/uploadImage';

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    newTaskInput: string;
    searchString: string;
    newTaskType: TypedColumn;
    image: File | null;

    addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;

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


    addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
        let file: Image | undefined;

        if (image) {
            const fileUploaded = await uploadImage(image);
            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id,
                };
            }

        }

        const { $id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,

                ...(file && { image: JSON.stringify(file) }),
            }
        );


        set({ newTaskInput: "" });

        set((state) => {
            const newColumns = new Map(state.board.columns);

            const newTodo: Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,

                ...(file && { image: JSON.stringify(file) }),
            };

            const column = newColumns.get(columnId);

            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo],

                });
            }
            else {
                newColumns.get(columnId)?.todos.push(newTodo);
            }
            return {
                board: {
                    columns: newColumns,
                }
            }
        })
    },

}));

