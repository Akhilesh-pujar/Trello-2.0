"use client"

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalstore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/Boardstore'
import TaskTypeRadioGroup from './TaskTypeRadioGroup'
import Image from 'next/image'

type Props = {}

const Model = (props: Props) => {

    const imagePickerRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useBoardStore((state) => [
        state.image,
        state.setImage,
    ])

    const [newTaskInput, setNewTaskInput] = useBoardStore((state) => [
        state.newTaskInput,
        state.setNewTaskInput
    ])
    const [isOpen, closeModal] = useModalstore((state) => [
        state.isOpen,
        state.closeModal,
    ])
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="form"
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


                                {/* <div>
                                    {image && {
                                       <Image
                                       alt="Upload image"
                                       width={200}
                                       height={200}
                                       className="w-full h-44 object-cover mt-2"
                                       />
                                    }}
                                    <input 
                                    
                                    type='file'
                                        ref={imagePickerRef}
                                        hidden
                                        onChange={(e) => {
                                            if (!e.target.files![0].type.startsWith("image/")) return;

                                            setImage(e.target.files![0]);
                                        }}
                                    />
                                </div> */}

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