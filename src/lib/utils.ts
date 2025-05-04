import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates a string to a given length and adds an ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Creates debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function (...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Extracts initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generates placeholder image URL
 */
export function getPlaceholderImage(text: string, size: number = 100): string {
  return `https://placehold.co/${size}x${size}?text=${encodeURIComponent(text)}`;
}

/**
 * Gets experience level label
 */
export function getExperienceLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    entry: 'Entry Level',
    mid: 'Mid Level',
    senior: 'Senior Level',
    executive: 'Executive'
  };
  
  return labels[level] || level;
}

/**
 * Gets job type label
 */
export function getJobTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contract'
  };
  
  return labels[type] || type;
}

/**
 * Gets work setting label
 */
export function getWorkSettingLabel(setting: string): string {
  const labels: Record<string, string> = {
    remote: 'Remote',
    onsite: 'On-site',
    hybrid: 'Hybrid'
  };
  
  return labels[setting] || setting;
}