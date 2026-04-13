import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';


export const Modal = ({
  open,
  openModal,
  containerClass,
  children,
  overlayClassName,
  isFull,
  iconClassName,
  showCloseIcon
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={openModal}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={classNames(
                isFull
                  ? 'fixed inset-0 bg-gray-500 opacity-25'
                  : 'fixed inset-0 bg-gray-500 opacity-25',
                overlayClassName,
              )}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          {/* <span className="inline-block align-middle h-screen" aria-hidden="true">
            &#8203;
          </span> */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={classNames(
                'relative inline-block align-bottom bg-white rounded-lg pt-5 pb-4 text-left shadow-gray-500/60 shadow-md transform transition-all sm:my-8 sm:align-middle',
                containerClass,
              )}
            >
              {showCloseIcon && (
                <div
                  className="flex justify-end"
                  ref={cancelButtonRef}
                  onClick={() => openModal(false)}
                >
                  x
                </div>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
