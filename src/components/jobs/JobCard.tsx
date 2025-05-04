import {
  Bookmark,
  BookmarkCheck,
  Briefcase as BriefcaseBusiness,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency, timeAgo } from "../../lib/constants";
import { Job } from "../../types";
import { cn, truncateText } from "../../lib/utils";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useStore } from "../../store";
import { motion } from "framer-motion";

interface JobCardProps {
  job: Job;
  view: "grid" | "list";
}

export default function JobCard({ job, view }: JobCardProps) {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { savedJobs, saveJob, unsaveJob } = useStore();

  const { getToken } = useAuth();

  // JobCard.tsx
  const isJobSaved =
    Array.isArray(savedJobs) &&
    savedJobs.some((savedJob) => savedJob.id === job.id);

  const handleCardClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  console.log(
    "savedJobs type:",
    typeof savedJobs,
    Array.isArray(savedJobs),
    savedJobs
  );

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isSignedIn) {
      // Redirect to sign in if not authenticated
      return navigate("/sign-in");
    }

    console.log("Job Saved:", isJobSaved);

    if (isJobSaved) {
      getToken().then((resolvedToken) => {
        if (resolvedToken) {
          unsaveJob(job.id, resolvedToken);
        } else {
          console.error("Failed to retrieve token");
        }
      });
    } else {
      getToken().then((resolvedToken) => {
        if (resolvedToken) {
          saveJob(job.id, resolvedToken);
        } else {
          console.error("Failed to retrieve token");
        }
      });
    }
  };

  const salaryDisplay = `${formatCurrency(Number(job.salary))}`;

  const postedAgo = timeAgo(job.date_posted);

  if (view === "grid") {
    return (
      <motion.div
        className="card h-full flex flex-col cursor-pointer"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleCardClick}
      >
        <div className="p-5 flex-grow">
          {/* Company logo and save button */}
          <div className="flex items-start justify-between mb-3">
            <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
              {job.company_logo ? (
                <img
                  src={job.company_logo}
                  alt={`${job.company} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <BriefcaseBusiness className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <button
              className="text-gray-400 hover:text-primary-500 focus:outline-none transition-colors"
              onClick={handleSaveClick}
              aria-label={isJobSaved ? "Unsave job" : "Save job"}
            >
              {isJobSaved ? (
                <BookmarkCheck className="h-5 w-5 text-primary-500" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Job title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {job.job_title}
          </h3>

          {/* Company name */}
          <p className="text-gray-600 mb-3">{job.company}</p>

          {/* Job details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{job.job_location}</span>
            </div>
            <div className="flex items-center text-gray-500">
              {/* <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" /> */}
              <span className="text-sm">{salaryDisplay}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{postedAgo}</span>
            </div>
          </div>
        </div>

        {/* Footer with job type */}
        <div className="px-5 py-3 border-t border-gray-100">
          <div className="flex items-center">
            <span
              className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-full",
                job.job_type === "Full-Time"
                  ? "bg-green-100 text-green-800"
                  : job.job_type === "Part-Time"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-amber-100 text-amber-800"
              )}
            >
              {job.job_type === "Full-Time"
                ? "Full-time"
                : job.job_type === "Part-Time"
                ? "Part-time"
                : "Contract"}
            </span>
            {job.work_setting && (
              <span className="ml-2 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
                {job.work_setting === "Remote"
                  ? "Remote"
                  : job.work_setting === "Onsite"
                  ? "On-site"
                  : "Hybrid"}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card cursor-pointer"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      <div className="p-5">
        <div className="flex items-start">
          {/* Company logo */}
          <div className="h-14 w-14 rounded-md bg-gray-100 flex items-center justify-center mr-4 overflow-hidden flex-shrink-0">
            {job.company_logo ? (
              <img
                src={job.company_logo}
                alt={`${job.company} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <BriefcaseBusiness className="h-7 w-7 text-gray-400" />
            )}
          </div>

          {/* Job details */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {job.job_title}
                </h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
              </div>

              {/* Save button */}
              <button
                className="text-gray-400 hover:text-primary-500 focus:outline-none transition-colors ml-4 flex-shrink-0"
                onClick={handleSaveClick}
                aria-label={isJobSaved ? "Unsave job" : "Save job"}
              >
                {isJobSaved ? (
                  <BookmarkCheck className="h-5 w-5 text-primary-500" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Short description */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {truncateText(job.full_description, 120)}
            </p>

            {/* Footer with job details */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.job_location}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{salaryDisplay}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{postedAgo}</span>
              </div>

              <div className="flex items-center ml-auto mt-2 sm:mt-0 gap-2">
                <span
                  className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full",
                    job.job_type === "Full-Time"
                      ? "bg-green-100 text-green-800"
                      : job.job_type === "Part-Time"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  )}
                >
                  {job.job_type === "Full-Time"
                    ? "Full-time"
                    : job.job_type === "Part-Time"
                    ? "Part-time"
                    : "Contract"}
                </span>
                {job.work_setting && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
                    {job.work_setting === "Remote"
                      ? "Remote"
                      : job.work_setting === "Onsite"
                      ? "On-site"
                      : "Hybrid"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
