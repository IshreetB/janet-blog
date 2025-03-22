/**
 * Format a date string into a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "May 15, 2023")
 */
export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Format a date with time
 * @param dateString - ISO date string
 * @returns Formatted date and time string (e.g., "May 15, 2023 at 2:30 PM")
 */
export function formatDateWithTime(dateString: string | Date): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

/**
 * Get relative time (e.g., "2 days ago", "just now")
 * @param dateString - ISO date string
 * @returns Relative time string
 */
export function getRelativeTimeFromNow(dateString: string | Date): string {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);
  const years = Math.round(months / 12);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (days < 30) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (months < 12) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}
