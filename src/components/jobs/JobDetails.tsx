import {
  Bookmark,
  BookmarkCheck,
  Building2,
  Calendar,
  MapPin,
  Send,
  Briefcase,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "../../lib/constants";
import {
  cn,
  getExperienceLevelLabel,
  getJobTypeLabel,
  getWorkSettingLabel,
} from "../../lib/utils";
import { useStore } from "../../store";
import LoadingSpinner from "../ui/LoadingSpinner";
import { motion } from "framer-motion";

interface JobDetailsProps {
  jobId: number;
}

export default function JobDetails({ jobId }: JobDetailsProps) {
  console.log("Rendering jobId on JobDetails", jobId);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const {
    currentJob,
    fetchJobById,
    isLoading,
    error,
    appliedJobs,
    saveJob,
    unsaveJob,
    applyToJob,
  } = useStore();

  const { savedJobs } = useStore((state) => ({ savedJobs: state.savedJobs }));

  console.log("Current job:", currentJob);
  const [showAppliedMessage, setShowAppliedMessage] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    console.log("Fetching job with ID:", jobId);
    fetchJobById(jobId)
      .then((response) => {
        console.log("Job data fetched:", response);
      })
      .catch((error) => {
        console.error("Error fetching job:", error);
      });
  }, [jobId, fetchJobById]);

  const isJobSaved =
    Array.isArray(savedJobs) && savedJobs.some((job) => job.id === jobId);
  const isJobApplied =
    Array.isArray(appliedJobs) && appliedJobs.some((job) => job.id === jobId);

  const handleSaveClick = () => {
    if (!isSignedIn) {
      return navigate("/sign-in");
    }

    if (isJobSaved) {
      getToken().then((resolvedToken) => {
        if (resolvedToken) {
          unsaveJob(jobId, resolvedToken);
        } else {
          console.error("Failed to retrieve token");
        }
      });
    } else {
      getToken().then((resolvedToken) => {
        if (resolvedToken) {
          saveJob(jobId, resolvedToken);
        } else {
          console.error("Failed to retrieve token");
        }
      });
    }
  };

  const handleApplyClick = () => {
    if (!isSignedIn) {
      return navigate("/sign-in");
    }

    if (!isJobApplied) {
      getToken().then((resolvedToken) => {
        if (resolvedToken) {
          applyToJob(jobId, resolvedToken);
        } else {
          console.error("Failed to retrieve token");
        }
      });
      setShowAppliedMessage(true);

      // Hide the message after 5 seconds
      setTimeout(() => {
        setShowAppliedMessage(false);
      }, 5000);
    }
  };

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Error Loading Job
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">{error}</p>
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Job Not Found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          The job you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const {
    job_title,
    company,
    company_logo,
    full_description,
    job_location,
    salary,
    job_type,
    experience_level,
    work_setting,
    h1type,
    job_category,
    date_posted,
    application_url,
  } = currentJob;

  console.log("job title", currentJob);
  console.log("posted date", date_posted);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Job header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center">
          {/* Company logo */}
          <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
            {company_logo ? (
              <img
                src={company_logo}
                alt={`${company} logo`}
                className="h-full w-full object-cover rounded-md"
              />
            ) : (
              <Building2 className="h-8 w-8 text-gray-400" />
            )}
          </div>

          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {job_title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-x-4 gap-y-2">
              <span className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                {company}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job_location}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />

                {currentJob.posted_date}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Job action buttons */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-3">
          {showAppliedMessage ? (
            <motion.div
              className="flex-grow px-4 py-2 text-center bg-green-50 text-green-700 rounded-md border border-green-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Application submitted successfully!
            </motion.div>
          ) : (
            <>
              <button
                onClick={handleApplyClick}
                disabled={isJobApplied}
                className={cn(
                  "btn flex-grow sm:flex-grow-0 min-w-[140px] py-2.5",
                  isJobApplied
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500"
                )}
              >
                <Send className="h-4 w-4 mr-2" />
                {isJobApplied ? "Applied" : "Apply Now"}
              </button>

              <button
                onClick={handleSaveClick}
                className={cn(
                  "btn flex-grow sm:flex-grow-0 min-w-[140px] py-2.5",
                  isJobSaved
                    ? "bg-primary-50 text-primary-600 border border-primary-200 hover:bg-primary-100"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                )}
              >
                {isJobSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save Job
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Job details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - job description */}
          <div className="md:col-span-2">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="prose prose-gray max-w-none">
                {full_description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </div>

          {/* Right column - job details */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4">Job Details</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Salary
                  </h4>
                  <p className="font-medium">
                    {formatCurrency(Number(salary))}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Job Type
                  </h4>
                  <p className="font-medium">{getJobTypeLabel(job_type)}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Experience Level
                  </h4>
                  <p className="font-medium">
                    {getExperienceLevelLabel(experience_level)}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Work Setting
                  </h4>
                  <p className="font-medium">
                    {getWorkSettingLabel(work_setting)}
                  </p>
                </div>

                {h1type && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      H1 Type
                    </h4>
                    <p className="font-medium">{h1type}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Category
                  </h4>
                  <p className="font-medium">{job_category}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Posted Date
                  </h4>
                  <p className="font-medium">
                    {date_posted ? formatDate(date_posted) : "N/A"}
                  </p>{" "}
                </div>
              </div>

              {application_url && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href={application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center py-2.5"
                  >
                    Apply on Company Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
