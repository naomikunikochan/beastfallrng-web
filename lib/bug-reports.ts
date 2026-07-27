export type BugReport = {
  id: string;
  reporter_name: string;
  contact: string;
  title: string;
  description: string;
  image_url: string;
  status: string;
  created_at: string;
};

export function formatBugReportDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export async function getBugReports() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return [];
  }

  const response = await fetch(
    `${url}/rest/v1/bug_reports?select=*&order=created_at.desc`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      next: { revalidate: 0 },
    },
  );

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as BugReport[];
}
