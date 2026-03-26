'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setStatus('success');
      setMessage(data.message || 'Thanks for joining the launch list.');
      setEmail('');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';

      setStatus('error');
      setMessage(errorMessage);
    }
  }

  return (
    <form className="mx-auto mt-8 max-w-[720px]" onSubmit={handleSubmit}>
      <div className="grid gap-3.5 md:grid-cols-[1fr_auto]">
        <input
          className="h-14 w-full rounded-[22px] border border-[#D2BD7F80] bg-stone-50 px-5 text-base text-black outline-none transition focus:border-[#D2BD7F] focus:ring-4 focus:ring-[#D2BD7F29]"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          aria-label="Email address"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting'}
        />

        <button
          className="group relative h-14 overflow-hidden rounded-[22px] bg-black px-7 font-sans text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#EAE3D6] transition disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={status === 'submitting'}
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-[#D2BD7F] transition-transform duration-300 group-hover:scale-x-100" />
          <span className="relative z-10 group-hover:text-black">
            {status === 'submitting' ? 'Submitting...' : 'Sign Up'}
          </span>
        </button>
      </div>

      {message ? (
        <p
          className={`mt-3.5 font-sans text-[0.92rem] ${
            status === 'success' ? 'text-green-700' : 'text-red-600'
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}