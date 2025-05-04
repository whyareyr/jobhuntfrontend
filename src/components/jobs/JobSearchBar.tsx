import { Search, X } from "lucide-react";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../store";

export default function JobSearchBar() {
  const { filters, setFilters } = useStore();
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [locationQuery, setLocationQuery] = useState(filters.location || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setFilters({
      search: searchQuery,
      location: locationQuery,
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (filters.search) {
      setFilters({ search: "" });
    }
  };

  const clearLocation = () => {
    setLocationQuery("");
    if (filters.location) {
      setFilters({ location: "" });
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4 md:p-6 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-7 gap-4"
      >
        {/* Job Search Input */}
        <div className="relative md:col-span-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="text"
            placeholder="Job title or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10 pr-10 py-3 w-full"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Location Input */}
        <div className="relative md:col-span-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Location"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="input pl-10 pr-10 py-3 w-full"
          />

          {locationQuery && (
            <button
              type="button"
              onClick={clearLocation}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Search Button */}
        <button type="submit" className="btn-primary md:col-span-1 py-3">
          Search
        </button>
      </form>
    </motion.div>
  );
}
