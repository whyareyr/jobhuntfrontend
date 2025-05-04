import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FilterX,
  SlidersHorizontal,
} from "lucide-react";
import {
  experienceLevelOptions,
  formatCurrency,
  h1TypeOptions,
  jobCategoryOptions,
  jobTypeOptions,
  workSettingOptions,
} from "../../lib/constants";
import { useStore } from "../../store";
import { cn } from "../../lib/utils";
import { JobFilters as JobFiltersType } from "../../types";

export default function JobFilters() {
  const { filters, setFilters, resetFilters } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  // Local state for salary range
  const [salaryRange, setSalaryRange] = useState([
    filters.salary_min,
    filters.salary_max,
  ]);

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  // Apply salary range filter
  const applySalaryRange = () => {
    setFilters({
      salary_min: salaryRange[0],
      salary_max: salaryRange[1],
    });
  };

  // Update multi-select filter
  const updateFilter = (
    key: keyof JobFiltersType,
    value: string,
    checked: boolean
  ) => {
    let newValues: string[];

    if (checked) {
      // Add the value
      newValues = [...(filters[key] as string[]), value];
    } else {
      // Remove the value
      newValues = (filters[key] as string[]).filter((v) => v !== value);
    }

    setFilters({ [key]: newValues } as Partial<JobFiltersType>);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Mobile toggle */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center md:hidden">
        <button
          onClick={toggleFilters}
          className="text-gray-700 font-medium flex items-center"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters{" "}
          {Object.values(filters).flat().filter(Boolean).length > 0 &&
            "(Active)"}
        </button>
        {Object.values(filters).flat().filter(Boolean).length > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Reset
          </button>
        )}
      </div>

      {/* Desktop heading */}
      <div className="hidden md:flex p-4 border-b border-gray-200 justify-between items-center">
        <h3 className="font-medium">Filters</h3>
        {Object.values(filters).flat().filter(Boolean).length > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
          >
            <FilterX className="h-4 w-4 mr-1" />
            Reset all
          </button>
        )}
      </div>

      {/* Filter sections */}
      <div
        className={cn("divide-y divide-gray-200", !isOpen && "hidden md:block")}
      >
        {/* Salary Range */}
        <div className="p-4">
          <h4 className="text-sm font-medium mb-3">Salary Range</h4>
          <div className="px-1 mb-4">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={salaryRange}
              min={0}
              max={500000}
              step={5000}
              onValueChange={setSalaryRange}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-primary-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white border border-gray-300 shadow-sm rounded-full hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Minimum salary"
              />
              <Slider.Thumb
                className="block w-5 h-5 bg-white border border-gray-300 shadow-sm rounded-full hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Maximum salary"
              />
            </Slider.Root>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs text-gray-500">Min</span>
              <p className="font-medium">{formatCurrency(salaryRange[0])}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">Max</span>
              <p className="font-medium">{formatCurrency(salaryRange[1])}</p>
            </div>
          </div>

          <button
            onClick={applySalaryRange}
            className="w-full py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
          >
            Apply
          </button>
        </div>

        {/* Job Type */}
        <div className="p-4">
          <h4 className="text-sm font-medium mb-3">Job Type</h4>
          <div className="space-y-2">
            {jobTypeOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={filters.job_type.includes(option.value)}
                  onChange={(e) =>
                    updateFilter("job_type", option.value, e.target.checked)
                  }
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="p-4">
          <h4 className="text-sm font-medium mb-3">Experience Level</h4>
          <div className="space-y-2">
            {experienceLevelOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={filters.experience_level.includes(option.value)}
                  onChange={(e) =>
                    updateFilter(
                      "experience_level",
                      option.value,
                      e.target.checked
                    )
                  }
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Work Setting */}
        <div className="p-4">
          <h4 className="text-sm font-medium mb-3">Work Setting</h4>
          <div className="space-y-2">
            {workSettingOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={filters.work_setting.includes(option.value)}
                  onChange={(e) =>
                    updateFilter("work_setting", option.value, e.target.checked)
                  }
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* H1 Type */}
        <div className="p-4">
          <h4 className="text-sm font-medium mb-3">H1 Type</h4>
          <div className="space-y-2">
            {h1TypeOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={filters.h1Type.includes(option.value)}
                  onChange={(e) =>
                    updateFilter("h1Type", option.value, e.target.checked)
                  }
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Category */}
        <div className="p-4">
          <h4 className="text-sm font-medium mb-3">Job Category</h4>
          <Select.Root
            value={
              filters.job_category.length > 0
                ? filters.job_category[0]
                : undefined
            }
            onValueChange={(value) => setFilters({ job_category: [value] })}
          >
            <Select.Trigger
              className="inline-flex items-center justify-between w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white text-gray-700 shadow-sm hover:bg-gray-50"
              aria-label="Job category"
            >
              <Select.Value placeholder="Select a category" />
              <Select.Icon>
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50"
                position="popper"
              >
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                  <ChevronUpIcon className="h-4 w-4" />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1">
                  <Select.Group>
                    {jobCategoryOptions.map((option) => (
                      <Select.Item
                        key={option.value}
                        value={option.value}
                        className="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100"
                      >
                        <Select.ItemText>{option.label}</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                  <ChevronDownIcon className="h-4 w-4" />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
    </div>
  );
}
