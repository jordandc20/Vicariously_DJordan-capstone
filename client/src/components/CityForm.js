import React, { Fragment } from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {LifebuoyIcon} from '@heroicons/react/24/solid'

import { Dialog, Transition } from '@headlessui/react'


import CityAutofill from './CityAutofill.js';

const CityForm = ({ locationData, type, onFormClose, onSubmit, show }) => {
  const { isLoading } = useAuth0();


  // render loading message
  if (isLoading)     { return (<><LifebuoyIcon className='h-5 animate-spin'/><div>Loading...</div></>) }

  return (

    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onFormClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"                        >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-4 px-6  text-left align-middle shadow-xl transition-all">
             
                <div className="mt-2">
                  <CityAutofill locationData={locationData} type={type} onFormClose={onFormClose} onSubmit={onSubmit} show={show} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default withAuthenticationRequired(CityForm)