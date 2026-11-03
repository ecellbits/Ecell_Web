import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string | null): string {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatStipend(min: number, max: number, currency = "INR"): string {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  if (min === 0 && max === 0) return "Unpaid";
  if (min === max) return `${formatter.format(min)}/month`;
  return `${formatter.format(min)} – ${formatter.format(max)}/month`;
}

export function formatDuration(min: number, max: number): string {
  if (min === max) return `${min} month${min !== 1 ? "s" : ""}`;
  return `${min}–${max} months`;
}

export function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function getCountdown(targetDate: string | null): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
} {
  if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    expired: false,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

// Common Indian colleges for the dropdown
export const INDIAN_COLLEGES = [
  "BITS Pilani, Hyderabad Campus",
  "BITS Pilani, Pilani Campus",
  "BITS Pilani, Goa Campus",
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "IIT Hyderabad",
  "IIT BHU",
  "IIT Guwahati",
  "NIT Trichy",
  "NIT Warangal",
  "NIT Surathkal",
  "IIIT Hyderabad",
  "IIIT Delhi",
  "DTU Delhi",
  "NSUT Delhi",
  "VIT Vellore",
  "SRM Chennai",
  "Manipal Institute of Technology",
  "PESIT Bangalore",
  "RV College of Engineering",
  "College of Engineering Pune",
  "VJTI Mumbai",
  "Other",
];

export const DEPARTMENT_TAGS = [
  "Software Engineering",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "AI / Deep Learning",
  "Product Management",
  "UI/UX Design",
  "Graphic Design",
  "Business Development",
  "Marketing",
  "Content Writing",
  "Finance",
  "Operations",
  "Human Resources",
  "Legal",
  "Research",
  "Hardware / IoT",
  "Blockchain",
  "Cybersecurity",
  "DevOps / Cloud",
  "Other",
];

export const DEGREE_OPTIONS = [
  "B.E.",
  "B.Tech",
  "M.E.",
  "M.Tech",
  "M.Sc.",
  "MBA",
  "BBA",
  "B.Sc.",
  "B.Com",
  "BA",
  "Dual Degree",
  "Integrated M.Sc.",
  "Other",
];
