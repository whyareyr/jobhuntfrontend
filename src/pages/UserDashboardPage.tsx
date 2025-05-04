import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "../lib/utils";
import { useStore } from "../store";
import JobCard from "../components/jobs/JobCard";
import { motion } from "framer-motion";
import { Bookmark, Briefcase } from "lucide-react";

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const { savedJobs, appliedJobs, view } = useStore();
  const [activeTab, setActiveTab] = useState("saved");

  useEffect(() => {
    // Set the active tab based on the URL
    const path = window.location.pathname;
    if (path.includes("/applied")) {
      setActiveTab("applied");
    } else {
      setActiveTab("saved");
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard/${value === "saved" ? "" : value}`);
  };

  const tabContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const tabItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>

      <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
        <Tabs.List className="flex border-b border-gray-200 mb-8">
          <Tabs.Trigger
            value="saved"
            className={cn(
              "py-3 px-6 text-sm font-medium focus:outline-none",
              activeTab === "saved"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <div className="flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              Saved Jobs
              <span className="ml-2 bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                {savedJobs.length}
              </span>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="applied"
            className={cn(
              "py-3 px-6 text-sm font-medium focus:outline-none",
              activeTab === "applied"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Applied Jobs
              <span className="ml-2 bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                {appliedJobs.length}
              </span>
            </div>
          </Tabs.Trigger>
        </Tabs.List>

        <Routes>
          <Route
            path="/"
            element={
              <Tabs.Content value="saved">
                {savedJobs.length > 0 ? (
                  <motion.div
                    className={cn(
                      view === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                    )}
                    variants={tabContainerVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {savedJobs.map((job) => (
                      <motion.div key={job.id} variants={tabItemVariants}>
                        <JobCard job={job} view={view} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-16">
                    <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No saved jobs yet
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Save jobs you're interested in to come back to them later.
                    </p>
                  </div>
                )}
              </Tabs.Content>
            }
          />
          <Route
            path="/applied"
            element={
              <Tabs.Content value="applied">
                {appliedJobs.length > 0 ? (
                  <motion.div
                    className={cn(
                      view === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                    )}
                    variants={tabContainerVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {appliedJobs.map((job) => (
                      <motion.div key={job.id} variants={tabItemVariants}>
                        <JobCard job={job} view={view} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-16">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No applications yet
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      When you apply for jobs, they'll appear here so you can
                      track your applications.
                    </p>
                  </div>
                )}
              </Tabs.Content>
            }
          />
        </Routes>
      </Tabs.Root>
    </div>
  );
}
