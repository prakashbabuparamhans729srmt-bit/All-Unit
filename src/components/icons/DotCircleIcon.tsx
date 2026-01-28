import * as React from 'react';

export const DotCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    {...props}
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM256 320a64 64 0 1 1 0-128 64 64 0 1 1 0 128z" />
  </svg>
);
