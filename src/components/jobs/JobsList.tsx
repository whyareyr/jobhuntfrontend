import { Grid, ListFilter, List as ListIcon } from "lucide-react";
import JobCard from "./JobCard";
import { useStore } from "../../store";
import LoadingSpinner from "../ui/LoadingSpinner";
import { cn } from "../../lib/utils";
import { getVisiblePages } from "../../lib/pagination";
import { useEffect } from "react";
import { fetchJobs } from "../../lib/api";

export default function JobsList() {
  const filteredJobs = useStore((state) => state.filteredJobs);
  const view = useStore((state) => state.view);
  const setView = useStore((state) => state.setView);
  const isLoading = useStore((state) => state.isLoading);
  const pagination = useStore((state) => state.pagination);
  const setPage = useStore((state) => state.setPage);

  // useEffect(() => {
  //   if (filteredJobs.length === 0) {
  //     fetchJobs(); // fetch jobs as soon as component mounts
  //   }
  // }, [filteredJobs.length]);

  console.log("isLoading:", isLoading);

  const { currentPage, totalPages, pageSize } = pagination;

  console.log("JobsList rendered", filteredJobs);
  // Get current page of jobs
  const indexOfLastJob = currentPage * pageSize;
  const indexOfFirstJob = indexOfLastJob - pageSize;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toggle view mode
  const toggleView = (newView: "grid" | "list") => {
    setView(newView);
  };

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-16">
        <ListFilter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No matching jobs found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Try adjusting your search criteria or filters to find more
          opportunities.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {indexOfFirstJob + 1}-
          {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
          {filteredJobs.length} jobs
        </p>
        <div className="flex space-x-2">
          <button
            className={cn(
              "p-2 rounded border transition-colors",
              view === "grid"
                ? "bg-primary-50 border-primary-200 text-primary-600"
                : "bg-white border-gray-200 text-gray-500 hover:text-gray-700"
            )}
            onClick={() => toggleView("grid")}
            aria-label="Grid view"
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            className={cn(
              "p-2 rounded border transition-colors",
              view === "list"
                ? "bg-primary-50 border-primary-200 text-primary-600"
                : "bg-white border-gray-200 text-gray-500 hover:text-gray-700"
            )}
            onClick={() => toggleView("list")}
            aria-label="List view"
          >
            <ListIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Job cards */}
      <div
        className={cn(
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}
      >
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} view={view} />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {getVisiblePages(currentPage, totalPages).map((page, i) =>
                typeof page === "string" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-2.5 py-1 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "w-8 h-8 rounded-md text-sm font-medium flex items-center justify-center",
                      currentPage === page
                        ? "bg-primary-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Next
            </button>
          </nav>

          {/* Mobile dropdown */}
          <div className="ml-4 md:hidden">
            <select
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              className="p-2 border rounded-md"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
