import React from "react";
import "./Footer.css";

const AppFooter = () => {
  return (
    <div>
      <footer>
        <div>
          <div>
            <img
              src="https://primefaces.org/cdn/primereact/images/logo.png"
              alt="Your Company Logo"
            />
          </div>
          <div>
            <p className="copyright">
              &copy; 2022 TOUR'rest. All rights reserved.
            </p>
          </div>
          <div className="footer-links">
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/contact">Contact Us</a>
            <a href="/about">About Us</a>
          </div>
        </div>
        <div className="footer-info">
          <p>Address: 123 Main Street, City, Country</p>
          <p>Email: info@yourcompany.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </footer>
    </div>
  );
};

export default AppFooter;
