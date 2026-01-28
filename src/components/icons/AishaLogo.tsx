import Image from 'next/image';
import * as React from 'react';

interface AishaLogoProps {
  className?: string;
  width: number;
  height: number;
}

// डेवलपर नोट: अपना कस्टम लोगो इस्तेमाल करने के लिए, कृपया यह करें:
// 1. अपनी लोगो फ़ाइल (जैसे, 'aisha-logo.svg') को प्रोजेक्ट के रूट में 'public' डायरेक्टरी के अंदर रखें।
// 2. यदि आपने अपनी फ़ाइल का नाम बदला है, तो नीचे 'src' विशेषता को '/aisha-logo.svg' से बदलकर '/your-file-name.svg' कर दें।

export const AishaLogo = (props: AishaLogoProps) => {
  return (
    <Image
      src="/aisha-logo.svg" 
      alt="Aisha Logo"
      width={props.width}
      height={props.height}
      className={props.className}
      unoptimized={true}
    />
  );
};
