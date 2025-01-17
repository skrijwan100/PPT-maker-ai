import React from 'react';

const Loader = ({ isLoading, progress }) => {
  const loaderStyle = {
    backgroundColor: 'red', // Change as desired
    width: `${progress}%`,
    height: '2px',
    transition: 'width 0.05s ease-in-out',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    display: isLoading ? 'block' : 'none',
  };

  return <div style={loaderStyle}></div>;
};

export default Loader;