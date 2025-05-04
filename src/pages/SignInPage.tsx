import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function SignInPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary-600 hover:bg-primary-700",
              footerActionLink: "text-primary-600 hover:text-primary-700",
            },
          }}
        />
      </motion.div>
    </div>
  );
}
