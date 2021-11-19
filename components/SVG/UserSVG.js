import React from "react";

export default function UserSVG(props) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3333 24.5V22.1667C23.3333 20.929 22.8417 19.742 21.9665 18.8668C21.0913 17.9917 19.9043 17.5 18.6667 17.5H9.33334C8.09566 17.5 6.90868 17.9917 6.03351 18.8668C5.15834 19.742 4.66667 20.929 4.66667 22.1667V24.5"
        stroke={props.color}
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 12.8333C16.5773 12.8333 18.6667 10.744 18.6667 8.16667C18.6667 5.58934 16.5773 3.5 14 3.5C11.4227 3.5 9.33333 5.58934 9.33333 8.16667C9.33333 10.744 11.4227 12.8333 14 12.8333Z"
        stroke={props.color}
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
