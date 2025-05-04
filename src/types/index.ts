export interface Job {
  id: number;
  job_title: string;
  company: string;
  company_logo?: string;
  full_description: string;
  job_location: string;
  salary: string;
  job_type: "Full-Time" | "Part-Time" | "Contract";
  experience_level: "Mid senior" | "Associate";
  work_setting: "Remote" | "Onsite" | "Hybrid";
  h1type: "H-1B" | "Cap-Exempt" | null;
  job_category: string;
  posted_date?: string;
  date_posted?: string;
  application_url?: string;
}

export interface JobFilters {
  search: string;
  location: string;
  salary_min: number;
  salary_max: number;
  job_type: string[];
  experience_level: string[];
  work_setting: string[];
  h1Type: string[];
  job_category: string[];
}

export type JobListingView = "grid" | "list";

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface StoreState {
  jobs: Job[];
  filteredJobs: Job[];
  savedJobs: Job[];
  appliedJobs: Job[];
  currentJob: Job | null;
  filters: JobFilters;
  view: JobListingView;
  pagination: PaginationState;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: number) => Promise<void>;
  fetchSavedJobs: (token: string) => Promise<void>;
  fetchAppliedJobs: (token: string) => Promise<void>;

  saveJob: (jobId: number, token: string) => Promise<void>;
  unsaveJob: (jobId: number, token: string) => Promise<void>;
  applyToJob: (jobId: number, token: string) => Promise<void>;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
  setView: (view: JobListingView) => void;
  setPage: (page: number) => void;
  applyFilters: () => void;
}
