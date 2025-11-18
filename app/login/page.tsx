// app/login/page.tsx
'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'student' | 'staff' | 'visitor';

interface NovaWayUser {
  name: string;
  email: string;
  role: Role;
}

const STORAGE_KEY = 'novawayUser';
const SEEN_LOGIN_KEY = 'novawaySeenLogin_v1';

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [error, setError] = useState('');

  // If there is already a saved user, pre-fill the form
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const user: NovaWayUser = JSON.parse(saved);
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    } catch (err) {
      console.error('Error reading saved user', err);
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
        setError('Please fill in your name and email.');
        return;
    }

    const user: NovaWayUser = {
        name: name.trim(),
        email: email.trim(),
        role,
    };

    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        // Mark that this device has gone through the login screen at least once
        window.localStorage.setItem(SEEN_LOGIN_KEY, 'true');
    } catch (err) {
        console.error('Failed to persist user', err);
    }

    // Go to home after login
    router.push('/');
    }

    function handleSkip() {
    try {
        // User chooses not to sign in, but we've "seen" the login once
        window.localStorage.setItem(SEEN_LOGIN_KEY, 'true');
    } catch (err) {
        console.error('Failed to set seen-login flag', err);
    }

    router.push('/'); // go to home as well
    }

  return (
    <div className="flex h-full items-center justify-center px-4 py-6">
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white/90 px-6 py-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Sign in</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to NovaWay. Enter your details to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Ana Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. up2020xxxx@fct.unl.pt"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Role */}
          <div>
            <span className="block text-sm font-medium text-gray-800">
              I am a…
            </span>
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              {(['student', 'staff', 'visitor'] as Role[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  className={[
                    'rounded-xl border px-2.5 py-2 capitalize transition',
                    role === option
                      ? 'border-blue-600 bg-blue-50 text-blue-800'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400',
                  ].join(' ')}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="mt-1 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Continue
          </button>
        </form>

        {/* Skip login – just a convenience for evaluators */}
        <button
          type="button"
          onClick={handleSkip}
          className="mt-6 w-full text-center text-xs font-medium text-gray-500 underline"
        >
          Continue without signing in
        </button>
      </div>
    </div>
  );
}