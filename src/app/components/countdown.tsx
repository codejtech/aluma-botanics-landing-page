'use client';

import { useEffect, useMemo, useState } from 'react';
import { LAUNCH_DATE_ISO } from '../lib/constants';
import { pad } from '../lib/utils';

type CountdownUnit = {
  label: string;
  value: string;
};

function getZeroState(): CountdownUnit[] {
  return [
    { label: 'Days', value: '00' },
    { label: 'Hours', value: '00' },
    { label: 'Minutes', value: '00' },
    { label: 'Seconds', value: '00' },
  ];
}

function getTimeLeft(targetDate: Date): CountdownUnit[] {
  const now = new Date();
  const distance = targetDate.getTime() - now.getTime();

  if (distance <= 0) {
    return getZeroState();
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return [
    { label: 'Days', value: pad(days) },
    { label: 'Hours', value: pad(hours) },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ];
}

export function Countdown() {
  const targetDate = useMemo(() => new Date(LAUNCH_DATE_ISO), []);
  const [timeLeft, setTimeLeft] = useState<CountdownUnit[]>(getZeroState);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      aria-label="Countdown to launch"
      className="mx-auto mt-10 grid w-full max-w-[620px] grid-cols-2 gap-4 md:grid-cols-4"
    >
      {timeLeft.map((item) => (
        <div
          key={item.label}
          className="rounded-[28px] border border-[#D2BD7F66] bg-white/80 px-4 py-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur"
        >
          <div className="font-sans text-[clamp(2rem,4vw,2.7rem)] font-semibold leading-none">
            {item.value}
          </div>
          <div className="mt-2.5 font-sans text-[11px] uppercase tracking-[0.25em] text-black/50">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
