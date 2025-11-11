// components/SignUpModal.tsx
'use client';

import { useState } from 'react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  onSignUpSuccess: () => void; // <-- ADD THIS NEW PROP
}

export default function SignUpModal({
  isOpen,
  onClose,
  eventName,
  onSignUpSuccess, // <-- GET THE NEW PROP
}: SignUpModalProps) {
  const [modalStep, setModalStep] = useState<'form' | 'success'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUpSuccess(); // <-- CALL THE PROP FUNCTION ON SUCCESS
    setModalStep('success');
  };

  const handleClose = () => {
    setModalStep('form');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    // Modal backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal panel */}
      <div className="w-11/12 max-w-sm rounded-lg bg-white p-6 shadow-lg">
        {modalStep === 'form' ? (
          // --- FORM STEP ---
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold">Sign Up for</h2>
            <p className="mb-4 text-blue-600">{eventName}</p>

            {/* Form fields (no change) */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700">
                First Name
                <input
                  type="text"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Last Name
                <input
                  type="text"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                E-mail
                <input
                  type="email"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Student Number
                <input
                  type="text"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </label>
            </div>

            {/* Action buttons (no change) */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Confirm Your Sign Up
              </button>
            </div>
          </form>
        ) : (
          // --- SUCCESS STEP (no change) ---
          <div>
            <h2 className="text-lg font-semibold text-green-600">
              Success!
            </h2>
            <p className="mt-2 text-gray-700">
              You have successfully signed up for{' '}
              <span className="font-medium">{eventName}</span>.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}