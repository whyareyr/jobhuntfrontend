import { useEffect } from "react";
import { Sparkle as SparkleFill } from "lucide-react";
import JobSearchBar from "../components/jobs/JobSearchBar";
import JobFilters from "../components/jobs/JobFilters";
import JobsList from "../components/jobs/JobsList";
import { useStore } from "../store";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";

export default function HomePage() {
  const { fetchJobs } = useStore();
  const isLoggedin = useAuth().isSignedIn;

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <>
      {/* Only show hero and categories if NOT logged in */}
      {!isLoggedin && (
        <>
          {/* Hero section */}
          <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Find Your Dream Job Today
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-primary-100 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Discover thousands of job opportunities with all the
                  information you need.
                </motion.p>
                <JobSearchBar />
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
              <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary-300"></div>
              <div className="absolute top-48 -right-32 w-80 h-80 rounded-full bg-primary-300"></div>
              <div className="absolute -bottom-32 left-1/3 w-72 h-72 rounded-full bg-primary-300"></div>
            </div>
          </section>

          {/* Featured categories section */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Popular Job Categories
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore jobs in popular categories and find the perfect role
                  for your skills and experience
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Engineering",
                  "Design",
                  "Marketing",
                  "Product",
                  "Sales",
                  "Customer Service",
                  "Data Science",
                  "Finance",
                ].map((category, index) => (
                  <motion.div
                    key={category}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 text-center hover:shadow-md transition-shadow cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <h3 className="font-medium text-gray-900">{category}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {/* {index * 17 + 1000} */}
                      Jobs Available
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Jobs section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Browse Jobs</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="lg:col-span-1">
              <JobFilters />
            </div>
            {/* Job listings */}
            <div className="lg:col-span-3">
              <JobsList />
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                <div className="inline-flex items-center bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <SparkleFill className="h-4 w-4 mr-1" />
                  <span>For Employers</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need to hire the right talent for your team?
                </h2>
                <p className="text-gray-600 mb-6">
                  Post a job on our platform and reach thousands of qualified
                  candidates. Our advanced matching algorithms help you find the
                  perfect fit.
                </p>
                <button className="btn-primary py-2.5 max-w-[200px]">
                  Contact
                </button>
              </div>
              <div className="md:w-1/2 bg-gradient-to-r from-primary-600 to-primary-700 p-6 md:p-10 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Why employers choose us
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-white text-primary-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Access to a large pool of qualified candidates</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-white text-primary-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Advanced filtering and matching technology</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-white text-primary-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Easy-to-use dashboard and applicant tracking</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-white text-primary-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Detailed analytics and performance reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
