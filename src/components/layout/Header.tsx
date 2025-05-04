import {
  SignInButton,
  SignUpButton,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Briefcase } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const navItems = [{ name: "Home", path: "/" }];

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">JobHunt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "text-base font-medium transition-colors",
                    isActive
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    cn(
                      "btn-secondary text-sm py-1.5",
                      isActive && "bg-primary-50"
                    )
                  }
                >
                  Dashboard
                </NavLink>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-primary-600 font-medium hover:text-primary-700">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn-primary text-sm py-1.5">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "text-base font-medium py-2 transition-colors",
                      isActive
                        ? "text-primary-600"
                        : "text-gray-700 hover:text-primary-600"
                    )
                  }
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Authentication */}
            <div className="pt-2 border-t border-gray-200">
              {isSignedIn ? (
                <div className="flex flex-col space-y-3">
                  <NavLink
                    to="/dashboard"
                    className="btn-secondary py-2 text-center"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    className="text-gray-600 font-medium py-2"
                    onClick={() => {
                      signOut();
                      closeMobileMenu();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <SignInButton mode="modal">
                    <button className="btn-secondary py-2">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn-primary py-2">Sign Up</button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
