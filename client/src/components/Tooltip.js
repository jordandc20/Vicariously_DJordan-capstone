import { SquaresPlusIcon, LifebuoyIcon, ChevronUpIcon, InformationCircleIcon, DocumentPlusIcon } from '@heroicons/react/24/solid'


export default function Tooltip({ message, children }) {
    return (
    <div class="group relative ">
        {children}
        <span class="absolute bottom-5 right-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs w-fit text-white group-hover:scale-100"><InformationCircleIcon className='h-4'/>{message}</span>
    </div>
    )
}