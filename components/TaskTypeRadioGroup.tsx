"use client"

type Props = {}

import { useBoardStore } from '@/store/Boardstore';
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const types = [
    {
        id: "todo",
        name: 'todo',
        description: "A new task to be completed",
        color: "bg-red-500",
    },
    {
        id: "inprogress",
        name: 'inprogress',
        description: "A new task that is currently being worked on",
        color: "bg-yellow-500",
    },
    {
        id: "done",
        name: 'done',
        description: "A new task that has been done",
        color: "bg-green-500",
    },
];

export default function TaskTypeRadioGroup({ }: Props) {

    const [setTaskType, newTaskType] = useBoardStore((state) => [
        state.newTaskType,
        state.setTaskType,
    ])
    return (
        <div className='w-full py-5'>
            <div className='mx-auto w-full max-w-md'>
                <RadioGroup
                    value={newTaskType}
                // onChange={(e) => {
                //     setTaskType(e.target.value);
                // }}
                >
                    <div className='space-y-2'>
                        {types.map((index) => (
                            <RadioGroup.Option
                                key={index.id}
                                value={index.id}
                                className={({ active, checked }) => `${active ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-500" : ""
                                    }
                        
                        ${checked ? `${index.color} bg-opacity-75 text-white` : "bh-white"
                                    }
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                        `


                                }
                            >

                                {({ active, checked }) => (
                                    <>
                                        <div className='flex w-fullv items-center justify-between'>
                                            <div className='fles items-center'>
                                                <div className='text-sm'>
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium ${checked ? "text-white" : "text-gray-500"}
                                            
                                            `}
                                                    >
                                                        {index.name}

                                                    </RadioGroup.Label>

                                                    <RadioGroup.Description
                                                        as="span"
                                                        className={`inline ${checked ? "text-white" : "text-gray-500"}`}

                                                    >
                                                        <span>{index.description}</span>



                                                    </RadioGroup.Description>
                                                </div>

                                            </div>
                                            {checked && (
                                                <div className=' text-white bg-red-500'>
                                                    <CheckCircleIcon className='h-10 w-10' />

                                                </div>
                                            )}
                                        </div>

                                    </>
                                )}

                            </RadioGroup.Option>

                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}