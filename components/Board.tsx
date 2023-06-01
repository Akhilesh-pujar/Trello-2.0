'use client';

import { useBoardStore } from '@/store/Boardstore';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import Column from './Column';

function Board() {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState,
        state.updateTodoInDB,
    ]);


    useEffect(() => {
        getBoard();

    }, [getBoard])
    const handledragEnd = (results: DropResult) => {
        const { destination, source, type } = results;
        // if user drags outside the box board
        if (!destination) return;

        //handle colomn drag

        if (type === 'column') {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangeColumns = new Map(entries);
            setBoardState({
                ...board,
                columns: rearrangeColumns,
            });

        }

        //this step needed as the index stored as number 0,1,2 insted of ids with dnd lib

        const columns = Array.from(board.columns);
        const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)];

        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos,
        };

        const finishCol: Column = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos,
        };

        if (!startCol || !finishCol) return;

        if (source.index === destination.index && startCol === finishCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);
        if (startCol.id === finishCol.id) {
            //same col task drag
            newTodos.splice(destination.index, 0, todoMoved);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCol);

            setBoardState({ ...board, columns: newColumns });
        }
        else {
            //dragging to another col

            const finishedTodos = Array.from(finishCol.todos);
            finishedTodos.splice(destination.index, 0, todoMoved);

            const newColumns = new Map(board.columns);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };

            newColumns.set(startCol.id, newCol);
            newColumns.set(finishCol.id, {
                id: finishCol.id,
                todos: finishedTodos,
            });


            //update in DB
            updateTodoInDB(todoMoved, finishCol.id);


            setBoardState({ ...board, columns: newColumns })
        }



    };
    return (
        <DragDropContext onDragEnd={handledragEnd}>
            <Droppable droppableId='board' direction='horizontal' type='column'>
                {(provided) =>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >

                        {
                            Array.from(board.columns.entries()).map(([id, coloumn], index) =>
                            (
                                <Column
                                    key={id}
                                    id={id}
                                    todos={coloumn.todos}
                                    index={index}
                                />
                            )

                            )

                        }
                    </div>
                }


            </Droppable>

        </DragDropContext>
    )
}

export default Board
