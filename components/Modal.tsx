import * as Dialog from "@radix-ui/react-dialog";
import { HiX } from "react-icons/hi";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  type?: "auth" | "default"; // "auth" - баруун/зүүн хуваасан, "default" - зөвхөн form
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onChange,
  title,
  description,
  type = "default",
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0 z-50">
          <Dialog.Content className={`fixed flex flex-col text-white drop-shadow-md rounded-lg border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[900px] translate-x-[-50%] translate-y-[-50%] bg-neutral-800 p-0 focus:outline-none ${type === "auth" ? "md:flex-row" : ""}`}>
            {type === "auth" ? (
              <>
                {/* Left Section: Form */}
                <div className="w-full md:w-2/5 p-[25px]">
                  <Dialog.Title className="text-3xl text-start font-bold mb-4">{title}</Dialog.Title>
                  <Dialog.Description className="mb-5 text-sm leading-normal text-start">{description}</Dialog.Description>
                  <div>{children}</div>
                </div>

                {/* Right Section: Image */}
                <div
                  className="relative hidden md:block w-3/5 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url('/images/auth/auth.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
                </div>
              </>
            ) : (
              <div className="p-[25px]">
                <Dialog.Title className="text-3xl text-start font-bold mb-4">{title}</Dialog.Title>
                <Dialog.Description className="mb-5 text-sm leading-normal text-start">{description}</Dialog.Description>
                <div>{children}</div>
              </div>
            )}

            <Dialog.Close asChild>
              <button className="text-neutral-50 hover:text-white absolute top-3 right-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:outline-none">
                <HiX />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
