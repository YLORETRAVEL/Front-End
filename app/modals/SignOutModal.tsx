import { SignOutModalProps } from "../types/modal";
import Modal from "./Modal";


export default function SignOutModal({
  isOpen,
  onClose,
  onSignOut,
}: SignOutModalProps) {
  const handleSignOut = () => {
    onSignOut?.();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-end gap-0 w-full p-6 rounded-2xl bg-white shadow-lg">
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.75 5.25L5.25 18.75"
              stroke="#1A1A1A"
              strokeWidth="1.55556"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.75 18.75L5.25 5.25"
              stroke="#1A1A1A"
              strokeWidth="1.55556"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-6 w-full max-w-[380px] mx-auto">
          <div className="flex items-center justify-center w-[125px] h-[125px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/2e6e9291d7516dd28310bc3accda2f2c42b4e9a2?width=250"
              alt="Sign out icon"
              className="w-[125px] h-[125px]"
            />
          </div>

          <div className="flex flex-col items-center gap-2.5 w-full">
            <h2 className="text-[#0A0A0A] text-[30px] font-semibold leading-[150%]">
              Sign Out
            </h2>
            <p className="w-full max-w-[308px] text-[#737373] text-center text-sm font-medium leading-[150%]">
              Do you want to sign out of your account?
            </p>
          </div>

          <div className="flex flex-col justify-center items-start gap-4 w-full">
            <button
              onClick={handleSignOut}
              className="flex h-12 px-4 py-3 justify-center items-center gap-3 w-full rounded-full bg-[#4DB9C8] shadow-[0_0_8px_0_#DDE6E8] hover:bg-[#45a5b3] transition-colors"
            >
              <span className="text-white text-lg font-semibold leading-[150%]">
                Sign Out
              </span>
            </button>

            <button
              onClick={onClose}
              className="flex h-12 px-4 py-3 justify-center items-center gap-3 w-full rounded-full bg-[#F6F5F5] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-[#e8e7e7] transition-colors"
            >
              <span className="text-[#1A1A1A] text-lg font-semibold leading-[150%]">
                Cancel
              </span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
