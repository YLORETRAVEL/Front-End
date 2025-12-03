import { useState } from "react";
import Modal from "./Modal";
import { DeleteAccountModalProps } from "../types/modal";

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteAccountModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [showDeleteStep, setShowDeleteStep] = useState(false); // NEW STATE

  const handleConfirm = () => {
    if (inputValue === "DELETE") {
      onConfirm?.();
      onClose();
      setInputValue("");
      setShowDeleteStep(false);
    }
  };

  const handleClose = () => {
    onClose();
    setInputValue("");
    setShowDeleteStep(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col items-end gap-0 w-full p-6 rounded-2xl bg-white shadow-lg">
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
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

          {/* ICON (always same) */}
          <div className="flex items-center justify-center w-[125px] h-[125px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/8922d1ff41efbd6c248561c3ffd809e64fa7da3d?width=250"
              alt="Delete account icon"
              className="w-[125px] h-[125px]"
            />
          </div>

          {/* TITLE & DESC */}
          <div className="flex flex-col items-center gap-2.5 w-full">
            <h2 className="text-[#0A0A0A] text-[30px] font-semibold leading-[150%]">
              Delete Account
            </h2>
            <p className="w-full max-w-[308px] text-[#737373] text-center text-sm font-medium leading-[150%]">
              Do you want to delete it permanently?
              <br />
              This action is irreversible!
            </p>
          </div>

          {/* ------------------------ */}
          {/* STEP 1 → YES / NO BUTTONS */}
          {/* ------------------------ */}
          {!showDeleteStep && (
            <div className="flex flex-col gap-4 w-full">

              {/* YES BUTTON (RED) */}
              <button
                onClick={() => setShowDeleteStep(true)}
                className="flex h-12 px-4 py-3 justify-center items-center gap-3 w-full rounded-full bg-[#DE5454] hover:bg-[#c94848] transition-colors"
              >
                <span className="text-white text-lg font-semibold leading-[150%]">
                  Yes
                </span>
              </button>

              {/* NO BUTTON (BLUE) */}
              <button
                onClick={handleClose}
                className="flex h-12 px-4 py-3 justify-center items-center gap-3 w-full rounded-full bg-[#F6F5F5] hover:bg-[#F6F5F5]/10 transition-colors"
              >
                <span className="text-black text-lg font-semibold leading-[150%]">
                  No
                </span>
              </button>
            </div>
          )}

          {/* ------------------------ */}
          {/* STEP 2 → DELETE INPUT BOX */}
          {/* ------------------------ */}
          {showDeleteStep && (
            <div className="flex flex-col justify-center items-start gap-4 w-full">

              {/* INPUT FIELD */}
              <div className="flex flex-col items-start gap-3 w-full">
                <label
                  htmlFor="delete-input"
                  className="text-[#1A1A1A] text-sm font-medium leading-[150%]"
                >
                  Type DELETE to confirm
                </label>

                <input
                  id="delete-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="DELETE"
                  className="flex h-14 px-4 py-3 justify-between items-center w-full rounded-full bg-[#F6F5F5] text-base font-medium leading-[150%] text-[#888] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#DE5454] focus:ring-opacity-50"
                />
              </div>

              {/* CONFIRM BUTTON */}
              <button
                onClick={handleConfirm}
                disabled={inputValue !== "DELETE"}
                className="flex h-12 px-4 py-3 justify-center items-center gap-3 w-full rounded-full bg-[#DE5454] hover:bg-[#c94848] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-white text-lg font-semibold leading-[150%]">
                  Confirm
                </span>
              </button>

            </div>
          )}

        </div>
      </div>
    </Modal>
  );
}
