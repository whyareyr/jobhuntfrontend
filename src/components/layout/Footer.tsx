import { Briefcase, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">JobHunt</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Find your dream job with JobHunt. We connect talented professionals with top companies around the world.
            </p>
          </div>
          
          {/* For job seekers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              For Job Seekers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Career Resources
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For employers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              For Employers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/post-a-job" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/employer-resources" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} JobHunt. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}