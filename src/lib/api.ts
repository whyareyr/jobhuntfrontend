import type { Job } from "../types";
import { apiClient } from "./apiClient";

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await apiClient.get("/api/jobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return mockJobs;
  }
};

export const fetchJobById = async (id: number): Promise<Job> => {
  try {
    const response = await apiClient.get(`/api/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job with ID ${id}:`, error);
    const job = mockJobs.find((job) => job.id === id);
    if (job) {
      return job;
    }
    throw new Error("Job not found");
  }
};

// api.ts - Update fetchSavedJobs
export const fetchSavedJobs = async (token: string): Promise<Job[]> => {
  try {
    const response = await apiClient.get("/api/users/saved-jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return [];
  }
};

export const fetchAppliedJobs = async (token: string): Promise<Job[]> => {
  try {
    const response = await apiClient.get("/api/users/applied-jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return mockJobs.slice(3, 5);
  }
};

export const toggleSaveJob = async (
  jobId: number,
  shouldSave: boolean,
  token: string
): Promise<void> => {
  try {
    console.log("Start toggleSaveJob");
    console.log(`Job ID: ${jobId}, Should Save: ${shouldSave}`);

    const endpoint = shouldSave
      ? "/api/users/save-job"
      : "/api/users/unsave-job";

    await apiClient.post(
      endpoint,
      { jobId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(`Job ${shouldSave ? "saved" : "unsaved"} successfully.`);
  } catch (error) {
    console.error("Error toggling save job status:", error);
  }
};

export const toggleApplyJob = async (
  jobId: number,
  token: string
): Promise<void> => {
  try {
    await apiClient.post(
      "/api/users/apply-job",
      { jobId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error applying to job:", error);
  }
};

const mockJobs: Job[] = [
  {
    id: 1,
    job_title: "Senior React Developer",
    company: "TechCorp",
    company_logo: "https://placehold.co/100x100?text=TC",
    full_description:
      "We are looking for an experienced React developer to build modern web applications. The ideal candidate has 3+ years of experience with React and its ecosystem.",
    job_location: "San Francisco, CA",
    salary: "160000",
    job_type: "Full-Time",
    experience_level: "Associate",
    work_setting: "Hybrid",
    h1type: "H-1B",
    job_category: "Engineering",
    posted_date: "2023-06-01",
    application_url: "https://example.com/apply",
  },
  {
    id: 2,
    job_title: "Product Manager",
    company: "Innovate Inc",
    company_logo: "https://placehold.co/100x100?text=II",
    full_description:
      "Seeking a skilled product manager to lead our product development initiatives. You will work closely with engineers, designers, and stakeholders.",
    job_location: "New York, NY",
    salary: "140000",
    job_type: "Full-Time",
    experience_level: "Associate",
    work_setting: "Onsite",
    h1type: null,
    job_category: "Product",
    posted_date: "2023-06-05",
    application_url: "https://example.com/apply",
  },
  {
    id: 3,
    job_title: "UI/UX Designer",
    company: "Creative Solutions",
    company_logo: "https://placehold.co/100x100?text=CS",
    full_description:
      "Join our design team to create beautiful, intuitive interfaces for our products. Experience with Figma and user research required.",
    job_location: "Remote",
    salary: "120000",
    job_type: "Contract",
    experience_level: "Mid senior",
    work_setting: "Remote",
    h1type: "Cap-Exempt",
    job_category: "Design",
    posted_date: "2023-06-10",
    application_url: "https://example.com/apply",
  },
  {
    id: 4,
    job_title: "DevOps Engineer",
    company: "CloudScale",
    company_logo: "https://placehold.co/100x100?text=CS",
    full_description:
      "We need a DevOps engineer to help us automate our infrastructure. Experience with AWS, Kubernetes, and CI/CD pipelines is required.",
    job_location: "Seattle, WA",
    salary: "145000",
    job_type: "Full-Time",
    experience_level: "Mid senior",
    work_setting: "Hybrid",
    h1type: "H-1B",
    job_category: "Engineering",
    posted_date: "2023-06-15",
    application_url: "https://example.com/apply",
  },
  {
    id: 5,
    job_title: "Marketing Specialist",
    company: "GrowthHackers",
    company_logo: "https://placehold.co/100x100?text=GH",
    full_description:
      "Looking for a marketing specialist to help us grow our customer base. Experience with digital marketing, SEO, and content creation is a plus.",
    job_location: "Chicago, IL",
    salary: "90000",
    job_type: "Part-Time",
    experience_level: "Associate",
    work_setting: "Onsite",
    h1type: null,
    job_category: "Marketing",
    posted_date: "2023-06-20",
    application_url: "https://example.com/apply",
  },
  {
    id: 6,
    job_title: "Data Scientist",
    company: "AnalyticsAI",
    company_logo: "https://placehold.co/100x100?text=AI",
    full_description:
      "Join our data science team to build machine learning models and extract insights from large datasets. Experience with Python and ML frameworks required.",
    job_location: "Boston, MA",
    salary: "170000",
    job_type: "Full-Time",
    experience_level: "Mid senior",
    work_setting: "Hybrid",
    h1type: "H-1B",
    job_category: "Data Science",
    posted_date: "2023-06-25",
    application_url: "https://example.com/apply",
  },
  {
    id: 7,
    job_title: "Customer Success Manager",
    company: "ServiceFirst",
    company_logo: "https://placehold.co/100x100?text=SF",
    full_description:
      "We are looking for a customer success manager to ensure our clients get the most value from our product. Strong communication skills required.",
    job_location: "Denver, CO",
    salary: "110000",
    job_type: "Full-Time",
    experience_level: "Mid senior",
    work_setting: "Remote",
    h1type: null,
    job_category: "Customer Service",
    posted_date: "2023-07-01",
    application_url: "https://example.com/apply",
  },
  {
    id: 8,
    job_title: "Frontend Developer",
    company: "WebWizards",
    company_logo: "https://placehold.co/100x100?text=WW",
    full_description:
      "Join our team to build beautiful, responsive web applications. Experience with React, TypeScript, and CSS required.",
    job_location: "Austin, TX",
    salary: "120000",
    job_type: "Full-Time",
    experience_level: "Mid senior",
    work_setting: "Hybrid",
    h1type: "Cap-Exempt",
    job_category: "Engineering",
    posted_date: "2023-07-05",
    application_url: "https://example.com/apply",
  },
];
