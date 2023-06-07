'use client'

import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/Boardstore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

type Props = {
    todo: Todo; 1
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;

};

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {

    const [imageUrl, setImageUrl] = useState<string | null>(null);



    const deleteTask = useBoardStore((state) => state.deleteTask);

    useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
                const url = await getUrl(todo.image!);
                if (url) {
                    setImageUrl(url.toString());
                }
            }

            fetchImage();
        }
    }, [todo]);
    return (
        <div
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
            className="bg-white rounded-md space-y-2 drop-shadow-md "
        >
            <div className="flex justify-between items-center p-5 ">
                <p>{todo.title}</p>
                <button onClick={() => deleteTask(index, todo, id)} className="text-red-500 hover:text-red-700"><XCircleIcon className="h-8 w-8 ml-5 " /></button>
            </div>

            {/* {imagUrl  && (

            )} */}

            {imageUrl && (
                <div className="h-full w-full rounded-b-md">
                    <Image
                        src={imageUrl}
                        alt="Task image"
                        width={400}
                        height={200}
                        className="w-full object-contain rounded-b-md"
                    />
                </div>
            )}

        </div>
    )
}

export default TodoCard
