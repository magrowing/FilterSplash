import { useEffect, useState } from 'react';

import Button from '../ui/Button';

export default function TopButton() {
  const [scrollY, setScrollY] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const followHandler = () => {
    setScrollY(window.scrollY);
    if (scrollY > 500) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const TopButtonHandler = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setShowButton(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', followHandler);
    return () => {
      window.removeEventListener('scroll', followHandler);
    };
  });

  return (
    showButton && (
      <Button btnStyle="line" type="button" onClick={TopButtonHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
        TOP
      </Button>
    )
  );
}
