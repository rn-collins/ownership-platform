import { getUser } from "@/lib/supabase/server";

function authorizedEmails() {
  return new Set((process.env.RESEARCHER_EMAILS ?? "collins.ra@northeastern.edu,rayven.nikkita.collins@gmail.com")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean));
}

export async function requireResearcher() {
  const user = await getUser();
  const email = user?.email?.toLowerCase();
  if (!user || !email || !authorizedEmails().has(email)) return null;
  return { id: user.id, email };
}
