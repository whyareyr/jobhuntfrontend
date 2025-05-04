import type { JobFilters } from "../types";

// Default pagination values
export const DEFAULT_PAGE_SIZE = 20;

// Default filter values
export const defaultFilters: JobFilters = {
  search: "",
  location: "",
  salary_min: 0,
  salary_max: 500000,
  job_type: [],
  experience_level: [],
  work_setting: [],
  h1Type: [],
  job_category: [],
};

// Job Type options
export const jobTypeOptions = [
  { value: "Full-Time", label: "Full-time" },
  { value: "Part-Time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
];

// Experience Level options
export const experienceLevelOptions = [
  { value: "Mid senior", label: "Mid Level" },
  { value: "Associate", label: "Associate" },
];

// Work Setting options
export const workSettingOptions = [
  { value: "Remote", label: "Remote" },
  { value: "Onsite", label: "On-site" },
  { value: "Hybrid", label: "Hybrid" },
];

// H1 Type options
export const h1TypeOptions = [
  { value: "H-1B", label: "H-1B" },
  { value: "Cap-Exempt", label: "Cap-Exempt" },
];

// Job Category options
export const jobCategoryOptions = [
  { value: "Engineering (Software)", label: "Engineering" },
  { value: "UI/UX & Design", label: "Design" },
  { value: "Product Management", label: "Product" },
  { value: "Data Science & Analytics", label: "Data Science" },
];

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateString?: string | null): string => {
  if (!dateString || isNaN(Date.parse(dateString))) {
    return "N/A";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const timeAgo = (dateString?: string | null): string => {
  if (!dateString || isNaN(Date.parse(dateString))) {
    return "recently";
  }

  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};
