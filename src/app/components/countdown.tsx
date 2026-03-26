'use client';

import { useEffect, useMemo, useState } from 'react';
import { LAUNCH_DATE_ISO } from '../lib/constants';
import { pad } from '../lib/utils';

type CountdownUnit = {
  label: string;
  value: string;
};

function getTimeLeft(targetDate: Date) {
  const now = new Date();
  const distance = targetDate.getTime() - now.getTime();

  if (distance <= 0) {
    return {
      done: true,
      values: [],
    };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return {
    done: false,
    values: [
      { label: 'Days', value: pad(days) },
      { label: 'Hours', value: pad(hours) },
      { label: 'Minutes', value: pad(minutes) },
      { label: 'Seconds', value: pad(seconds) },
    ],
  };
}

export function Countdown() {
  const targetDate = useMemo(() => new Date(LAUNCH_DATE_ISO), []);

  const [state, setState] = useState(() =>
    getTimeLeft(targetDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setState(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // 🎯 When countdown is finished
  if (state.done) {
    return (
      <div className="mt-10 text-center">
        <p className="font-serif text-3xl md:text-4xl font-medium">
          Ready to launch ✨🚀!
        </p>
      </div>
    );
  }

  // ⏳ Otherwise show countdown
  return (
    <div
      aria-label="Countdown to launch"
      className="mx-auto mt-10 grid w-full max-w-[620px] grid-cols-2 gap-4 md:grid-cols-4"
    >
      {state.values.map((item) => (
        <div
          key={item.label}
          className="rounded-[28px] border border-[#D2BD7F66] bg-white/80 px-4 py-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur"
        >
          <div className="text-[clamp(2rem,4vw,2.7rem)] font-semibold leading-none font-sans">
            {item.value}
          </div>
          <div className="mt-2.5 text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
