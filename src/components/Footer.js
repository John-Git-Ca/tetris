import React from 'react';

const Footer = () => {
  const year = new Date();
  return (
    <footer className="bg-info position-absolute bottom-0 w-100  text-center fs-4">
      {year.getFullYear()}
    </footer>
  );
};

export default Footer;
