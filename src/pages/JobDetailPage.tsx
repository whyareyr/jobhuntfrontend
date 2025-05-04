import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import JobDetails from "../components/jobs/JobDetails";

export default function JobDetailPage() {
  const { id } = useParams();
  const jobId = parseInt(id ?? "");
  console.log("jobId:", jobId);

  if (!id || isNaN(jobId)) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Job Not Found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            The job you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <JobDetails jobId={jobId} />
      </motion.div>
    </div>
  );
}
