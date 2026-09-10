import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => {
  return twMerge(inputs)
};

export { cn };