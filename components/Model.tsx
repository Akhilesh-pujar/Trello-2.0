"use client"

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalstore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/Boardstore'
import TaskTypeRadioGroup from './TaskTypeRadioGroup'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/solid'

type Props = {}

const Model = (props: Props) => {

    const imagePickerRef = useRef<HTMLInputElement>(null);
    const [addTask, image, setImage] = useBoardStore((state) => [
        state.addTask,
        state.image,
        state.setImage,
    ])

    const [newTaskType, setTaskType, newTaskInput, setNewTaskInput] = useBoardStore((state) => [
        state.newTaskType,
        state.newTaskType,
        state.newTaskInput,
        state.setNewTaskInput
    ])
    const [isOpen, closeModal] = useModalstore((state) => [
        state.isOpen,
        state.closeModal,
    ]);

    const handleSubmit = () => {

        if (!newTaskInput) return;
        addTask(newTaskInput, newTaskType, image);
        setImage(null);
        closeModal();

    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="form"
                onSubmit={handleSubmit}
                className="relative z-10"
                onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">

                    <div className="flex min-h-full items-center justify-center p-4">

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden
                             rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all
                            ">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium
                                   leading-6 text-gray-900 pb-2">
                                    Add Task

                                </Dialog.Title>
                                <div className='mt-2'>
                                    <input className='w-full border border-gray-500 rounded-md outline-none p-5'
                                        placeholder='Enter your task here'
                                        onChange={(e) => setNewTaskInput(e.target.value)}
                                        value={newTaskInput}
                                    >
                                    </input>

                                </div>
                                {/* radio group */}
                                <TaskTypeRadioGroup />


                                <div>
                                    <button
                                        type='button'
                                        onClick={() => { imagePickerRef.current?.click() }}
                                        className='w-full border border=gray-300 rounded-md outline-none p-5 
                                     focus:visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                                    '>

                                        <PhotoIcon className='h-6 w-6 mr-2 inline-block' /> Upload Image</button>
                                    {image && (
                                        <Image
                                            alt="Upload image"
                                            width={200}
                                            height={200}
                                            className="w-full h-44 object-cover mt-2"
                                            src={URL.createObjectURL(image)}
                                            onClick={() => {
                                                setImage(null);
                                            }}
                                        />
                                    )}
                                    <input
                                        type='file'
                                        ref={imagePickerRef}
                                        hidden
                                        onChange={(e) => {
                                            if (!e.target.files![0].type.startsWith("image/")) return;

                                            setImage(e.target.files![0]);
                                        }}
                                    />
                                </div>

                                <div className='mt-2'>
                                    <button
                                        type='submit'
                                        disabled={!newTaskInput}
                                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100
                                     px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-none
                                      disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed

                                    '
                                    >Add Task</button>
                                </div>

                            </Dialog.Panel>


                            {/* <div className="fixed inset-0 bg-black/30 bg-opacity-25" /> */}
                        </Transition.Child>
                    </div>
                </div>

            </Dialog>
        </Transition>
    )
}

export default Model;