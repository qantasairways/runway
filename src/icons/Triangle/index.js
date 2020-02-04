import React from 'react';

function Triangle(props) {
  return (
    <svg width={16} height={8} viewBox="0 0 16 8" focusable="false" {...props}>
      <path d="M0 8l8-8 8 8z" fillRule="evenodd" />
    </svg>
  );
}

export default Triangle;
