import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

// Custom Social Icons since they are removed from recent lucide-react versions
const Instagram = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Twitter = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const Facebook = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Youtube = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 103.38 103.38 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 103.38 103.38 0 0 1-15 0 2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/></svg>
);

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tight mb-6 block">LUXE</Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Premium electronics for the modern era. We curate the best technology to enhance your digital lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="h-10 w-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="h-10 w-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/shop?category=phones" className="text-gray-500 hover:text-black text-sm transition-colors">Smartphones</Link></li>
              <li><Link to="/shop?category=laptops" className="text-gray-500 hover:text-black text-sm transition-colors">Laptops</Link></li>
              <li><Link to="/shop?category=audio" className="text-gray-500 hover:text-black text-sm transition-colors">Audio & Music</Link></li>
              <li><Link to="/shop?category=watches" className="text-gray-500 hover:text-black text-sm transition-colors">Wearables</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Support</h4>
             <ul className="space-y-4">
               <li><Link to="/contact" className="text-gray-500 hover:text-black text-sm transition-colors">Contact Us</Link></li>
               <li><Link to="/shipping" className="text-gray-500 hover:text-black text-sm transition-colors">Shipping Info</Link></li>
               <li><Link to="/returns" className="text-gray-500 hover:text-black text-sm transition-colors">Returns & Exchanges</Link></li>
               <li><Link to="/faq" className="text-gray-500 hover:text-black text-sm transition-colors">Help & FAQ</Link></li>
             </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Join the Club</h4>
            <p className="text-gray-500 text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-gray-50 border-none rounded-xl py-4 pl-4 pr-12 text-sm focus:ring-2 focus:ring-black"
              />
              <button className="absolute right-2 top-2 bg-black text-white p-2 rounded-lg hover:bg-opacity-80">
                <Mail className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs">© 2024 LUXE Electronics Inc. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-400 hover:text-black text-xs">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-black text-xs">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-black text-xs">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

