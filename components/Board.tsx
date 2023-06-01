'use client';

import { useBoardStore } from '@/store/Boardstore';
import { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

function Board() {
    const getBoard = useBoardStore((state) => state.getBoard);

    useEffect(() => {

    }, [])
    return (

        <div>
            <h1>hello</h1>
        </div>
        // <DragDropContext>
        //     <Droppable droppableId='board' direction='horizontal' type='column'>
        //         {(provided =>

        //             <div>

        //             </div>
        //         )}


        //     </Droppable>

        // </DragDropContext>
    )
}

export default Board
