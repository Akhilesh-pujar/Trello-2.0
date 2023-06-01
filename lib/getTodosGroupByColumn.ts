import { databases } from "@/appwrite"

export const getTodosGroupByColumn = async () => {
    const data = await databases.listDocuments(

        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!


    );

    const todos = data.documents;

    const coloumns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }
        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,

            //get image only if there is image
            ...(todo.image && { image: JSON.parse(todo.image) })
        });
        return acc;
    },
        new Map<TypedColumn, Column>
    )

    // if columns does not have inprogress, todo nd done , add them with empty todo
    const coloumnTypes: TypedColumn[] = ["todo", "inprogress", "done"];


    for (const coloumnType of coloumnTypes) {
        if (!coloumns.get(coloumnType)) {
            coloumns.set(coloumnType, {
                id: coloumnType,
                todos: [],
            });
        }
    }


    //sort the coloumns

    const sortedColoumn = new Map(
        Array.from(coloumns.entries()).sort((a, b) => (
            coloumnTypes.indexOf(a[0]) - coloumnTypes.indexOf(b[0])
        ))
    );


    const board: Board = {
        columns: sortedColoumn
    }


    return board;

};