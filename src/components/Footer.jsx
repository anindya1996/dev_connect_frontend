import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-gray-300 text-black justify-center  items-center p-4 fixed bottom-0">
      <aside className="grid-flow-col items-center">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
