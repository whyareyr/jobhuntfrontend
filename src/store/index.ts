import { create } from "zustand";
import { defaultFilters } from "../lib/constants";
import {
  fetchAppliedJobs,
  fetchJobById,
  fetchJobs,
  fetchSavedJobs,
  toggleApplyJob,
  toggleSaveJob,
} from "../lib/api";

import type { JobFilters, JobListingView, StoreState } from "../types";

export const useStore = create<StoreState>((set, get) => ({
  jobs: [],
  filteredJobs: [],
  savedJobs: [],
  appliedJobs: [],
  currentJob: null,
  filters: defaultFilters,
  view: "grid",
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 12,
  },
  isLoading: false,
  error: null,

  // Fetch all jobs
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const jobs = await fetchJobs();
      set({ jobs, filteredJobs: jobs, isLoading: false });
      get().applyFilters();
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch jobs",
      });
    }
  },

  // Fetch a single job by ID
  fetchJobById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const job = await fetchJobById(id);
      set({ currentJob: job, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch job details",
      });
    }
  },

  // Fetch saved jobs
  fetchSavedJobs: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const savedJobs = await fetchSavedJobs(token);
      set({ savedJobs, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch saved jobs",
      });
    }
  },

  // Fetch applied jobs
  fetchAppliedJobs: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const appliedJobs = await fetchAppliedJobs(token);
      set({ appliedJobs, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch applied jobs",
      });
    }
  },

  // Save a job
  saveJob: async (jobId: number, token: string) => {
    try {
      await toggleSaveJob(jobId, true, token);
      const { jobs } = get();
      const jobToAdd = jobs.find((job) => job.id === jobId);

      if (jobToAdd) {
        set((state) => ({
          savedJobs: [...state.savedJobs, jobToAdd],
        }));
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to save job",
      });
    }
  },

  // Unsave a job
  unsaveJob: async (jobId: number, token: string) => {
    try {
      await toggleSaveJob(jobId, false, token);
      set((state) => ({
        savedJobs: state.savedJobs.filter((job) => job.id !== jobId),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to unsave job",
      });
    }
  },

  // Apply to a job
  applyToJob: async (jobId: number, token: string) => {
    try {
      await toggleApplyJob(jobId, token);
      const { jobs } = get();
      const jobToAdd = jobs.find((job) => job.id === jobId);

      if (jobToAdd) {
        set((state) => ({
          appliedJobs: [...state.appliedJobs, jobToAdd],
        }));
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to apply to job",
      });
    }
  },

  // Update filters
  setFilters: (filters: Partial<JobFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, currentPage: 1 },
    }));
    get().applyFilters();
  },

  // Reset filters
  resetFilters: () => {
    set({
      filters: defaultFilters,
      pagination: { ...get().pagination, currentPage: 1 },
    });
    get().applyFilters();
  },

  // Apply current filters
  applyFilters: () => {
    const { jobs, filters } = get();

    let result = [...jobs];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.job_title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower)
      );
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      result = result.filter((job) =>
        job.job_location.toLowerCase().includes(locationLower)
      );
    }

    // Apply salary filter
    if (filters.salary_min > 0 || filters.salary_max < 500000) {
      result = result.filter(
        (job) =>
          Number(job.salary) >= filters.salary_min &&
          Number(job.salary) <= filters.salary_max
      );
    }

    // Apply job type filter
    if (filters.job_type.length > 0) {
      result = result.filter((job) => filters.job_type.includes(job.job_type));
    }

    // Apply experience level filter
    if (filters.experience_level.length > 0) {
      result = result.filter((job) =>
        filters.experience_level.includes(job.experience_level)
      );
    }

    // Apply work setting filter
    if (filters.work_setting.length > 0) {
      result = result.filter((job) =>
        filters.work_setting.includes(job.work_setting)
      );
    }

    // Apply H1 type filter
    if (filters.h1Type.length > 0) {
      result = result.filter(
        (job) => job.h1type && filters.h1Type.includes(job.h1type)
      );
    }

    // Apply job category filter
    if (filters.job_category.length > 0) {
      result = result.filter((job) =>
        filters.job_category.includes(job.job_category)
      );
    }

    // Update pagination
    const totalPages = Math.ceil(result.length / get().pagination.pageSize);

    set({
      filteredJobs: result,
      pagination: {
        ...get().pagination,
        totalPages: Math.max(1, totalPages),
      },
    });
  },

  // Set view mode (grid or list)
  setView: (view: JobListingView) => {
    set({ view });
  },

  // Set current page
  setPage: (page: number) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        currentPage: page,
      },
    }));
  },
}));
