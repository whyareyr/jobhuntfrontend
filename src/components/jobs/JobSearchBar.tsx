import { motion } from "framer-motion";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function JobSearchBar() {
  return (
    <div className="flex items-center justify-center z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-4"
      >
        <SignInButton mode="modal">
          <button className="bg-white text-blue-600 font-bold text-lg px-8 py-3 rounded-full shadow-md hover:bg-blue-50 hover:text-blue-800 transition-all duration-200">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-yellow-400 text-slate-900 font-bold text-lg px-8 py-3 rounded-full shadow-md hover:bg-yellow-300 hover:text-blue-800 transition-all duration-200">
            Sign Up
          </button>
        </SignUpButton>
      </motion.div>
    </div>
  );
}
