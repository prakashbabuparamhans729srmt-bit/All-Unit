import * as React from 'react';
import Image from 'next/image';

interface AishaLogoProps {
  className?: string;
  width: number;
  height: number;
}

// This component loads the logo from /public/aisha-logo.svg
export const AishaLogo = (props: AishaLogoProps) => {
  return (
    <Image
      src="/aisha-logo.svg"
      alt="Aisha Logo"
      width={props.width}
      height={props.height}
      className={props.className}
    />
  );
};
