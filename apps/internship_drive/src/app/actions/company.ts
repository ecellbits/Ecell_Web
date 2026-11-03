"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { sendApplicationStatusEmail } from "@/lib/email";

export async function updateApplicationStatus(
  applicationId: string, 
  status: string,
  interviewDetails?: {
    date: string;
    mode: string;
    link?: string;
    notes?: string;
  }
) {
  const supabase = createAdminClient();
  
  const updateData: Record<string, any> = { status };
  if (status === "interview_scheduled" && interviewDetails) {
    updateData.interview_datetime = interviewDetails.date;
    updateData.interview_mode = interviewDetails.mode;
    updateData.interview_link = interviewDetails.link || null;
    updateData.interview_notes = interviewDetails.notes || null;
  }

  const { data, error } = await supabase
    .from("applications")
    .update(updateData)
    .eq("id", applicationId)
    .select(`
      status, 
      listing_id, 
      student_id,
      listings(title, companies(name)),
      student_profiles(full_name),
      users(email)
    `)
    .single();

  if (error) throw new Error("Failed to update application status");

  const listing = Array.isArray(data.listings) ? data.listings[0] : data.listings;
  const company = listing?.companies ? (Array.isArray(listing.companies) ? listing.companies[0] : listing.companies) : null;
  const profile = Array.isArray(data.student_profiles) ? data.student_profiles[0] : data.student_profiles;
  const user = Array.isArray(data.users) ? data.users[0] : data.users;

  if (!listing || !company || !profile || !user) {
    return { success: true };
  }

  // 2. Notify User via In-App Notification
  let notifType = "info";
  let notifTitle = "Application Update";
  if (status === "shortlisted") { notifType = "success"; notifTitle = "Application Shortlisted!"; }
  if (status === "interview_scheduled") { notifType = "interview"; notifTitle = "Interview Scheduled"; }
  if (status === "selected") { notifType = "success"; notifTitle = "You were selected! 🎉"; }
  if (status === "rejected") { notifType = "error"; notifTitle = "Application Update"; }

  await supabase.from("notifications").insert({
    user_id: data.student_id,
    type: notifType,
    title: notifTitle,
    body: `Your application for ${listing.title} at ${company.name} has been updated to: ${status.replace("_", " ")}`,
  });

  // 3. Send Email
  if (user.email && (status === "shortlisted" || status === "interview_scheduled" || status === "selected" || status === "rejected")) {
    await sendApplicationStatusEmail(
      user.email,
      profile.full_name || "Student",
      company.name,
      listing.title,
      status,
      interviewDetails
    );
  }

  revalidatePath(`/company/listings/${data.listing_id}`);
  return { success: true };
}
