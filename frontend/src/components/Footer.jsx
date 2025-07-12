import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import { PenTool} from "lucide-react";
import "./stylesheet/Footer.css";

const Footer = () => {
  return (
    <footer className="footer text-light pt-5 pb-5">
      <div className="container">
        <div className="row gy-4">
          {/* Logo & Description */}
          <div className="col-md-4">
           

            <h5 className="d-flex align-items-center fw-bold mb-4"> 
               <span><PenTool className="me-2 text-primary" size="30px"/></span>BlogHelper
            </h5>
            <p className="para ">
              Empowering bloggers to create content that solves real problems and
              makes a meaningful difference in people's lives.
            </p>
            <div className="d-flex gap-3 mt-3">
              <FaFacebookF className="footer-icon" />
              <FaTwitter className="footer-icon" />
              <FaInstagram className="footer-icon" />
              <FaLinkedinIn className="footer-icon" />
              <FaEnvelope className="footer-icon" />
            </div>
          </div>

          {/* PRODUCT */}
          <div className="col-6 col-md-2">
            <h6 className="head_nav fw-medium text-uppercase mb-3">Product</h6>
            <ul className="list-unstyled text-muted">
              <li>Features</li>
              <li>Templates</li>
              <li>Analytics</li>
              <li>Pricing</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="col-6 col-md-2">
            <h6 className="head_nav fw-medium text-uppercase mb-3">Resources</h6>
            <ul className="list-unstyled text-muted">
              <li>Blog</li>
              <li>Help Center</li>
              <li>Writing Guide</li>
              <li>Community</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="col-6 col-md-2">
            <h6 className="head_nav fw-medium text-uppercase mb-3">Company</h6>
            <ul className="list-unstyled text-muted">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Press</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="col-6 col-md-2">
            <h6 className="head_nav fw-medium text-uppercase mb-3">Legal</h6>
            <ul className="list-unstyled text-muted">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>GDPR</li>
            </ul>
          </div>
        </div>

        <hr className="mt-4 mb-3 border-secondary" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
          <p className="para mb-1 mb-md-0">© 2024 BlogHelper. All rights reserved.</p>
          <div className="foot_nav d-flex gap-3">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
