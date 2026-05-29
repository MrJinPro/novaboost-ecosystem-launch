export type SubmissionType = "streamer" | "team" | "participant";

export interface FormSubmission {
  id: string;
  type: SubmissionType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  tiktokUsername?: string;
  discordUsername?: string;
  telegramUsername?: string;
  pageUrl: string;
  referrer: string;
  userAgent: string;
  createdAt: string;
}

export interface VisitEvent {
  id: string;
  path: string;
  referrer: string;
  userAgent: string;
  language: string;
  createdAt: string;
}

const STORAGE_KEYS = {
  submissions: "novaboost_submissions",
  visits: "novaboost_visits",
};

const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

function safeRead<T>(key: string, defaultValue: T): T {
  if (!isBrowser) return defaultValue;

  try {
    const value = window.localStorage.getItem(key);
    if (!value) return defaultValue;
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}

function safeWrite<T>(key: string, value: T) {
  if (!isBrowser) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore failures in restricted browser modes
  }
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function loadSubmissions(): FormSubmission[] {
  return safeRead<FormSubmission[]>(STORAGE_KEYS.submissions, []);
}

export function saveSubmission(submission: Omit<FormSubmission, "id" | "createdAt">) {
  const stored = loadSubmissions();
  const next: FormSubmission = {
    ...submission,
    id: createId(),
    createdAt: new Date().toISOString(),
  };
  safeWrite(STORAGE_KEYS.submissions, [next, ...stored]);
  return next;
}

export function loadVisits(): VisitEvent[] {
  return safeRead<VisitEvent[]>(STORAGE_KEYS.visits, []);
}

export function saveVisit(visit: Omit<VisitEvent, "id" | "createdAt">) {
  const stored = loadVisits();
  const next: VisitEvent = {
    ...visit,
    id: createId(),
    createdAt: new Date().toISOString(),
  };
  safeWrite(STORAGE_KEYS.visits, [next, ...stored]);
  return next;
}

export function clearAllStoredData() {
  safeWrite<FormSubmission[]>(STORAGE_KEYS.submissions, []);
  safeWrite<VisitEvent[]>(STORAGE_KEYS.visits, []);
}
