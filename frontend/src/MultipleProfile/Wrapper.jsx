import React from "react";

function Wrapper({ children }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        height: '140px',
        borderRadius: '6px',
        width: '245px',
        padding: '20px',
        maxWidth: '245px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#F3F3F3',
        overflow: 'hidden', // Ensures content that overflows the box is hidden
      }}
    >
      {children}
    </div>
  );
}

export default Wrapper;
