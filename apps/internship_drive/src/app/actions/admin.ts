"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { sendCompanyStatusEmail, sendListingStatusEmail } from "@/lib/email";

export async function approveCompany(companyId: string, adminId: string) {
  const supabase = createAdminClient();
  
  // 1. Update status
  const { data, error } = await supabase
    .from("companies")
    .update({
      approval_status: "approved",
      approved_by: adminId,
      approved_at: new Date().toISOString(),
    })
    .eq("id", companyId)
    .select("name, hr_contact_email, user_id")
    .single();

  if (error) throw new Error("Failed to approve company");

  // 2. Notify User via In-App Notification
  await supabase.from("notifications").insert({
    user_id: data.user_id,
    type: "approval",
    title: "Registration Approved",
    body: "Your company registration has been approved. You can now post listings.",
  });

  // 3. Send Email
  if (data.hr_contact_email) {
    await sendCompanyStatusEmail(data.hr_contact_email, data.name, "approved");
  }

  revalidatePath("/admin/companies");
  return { success: true };
}

export async function rejectCompany(companyId: string, adminId: string, reason: string) {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from("companies")
    .update({
      approval_status: "rejected",
      rejection_reason: reason,
      approved_by: adminId,
      approved_at: new Date().toISOString(),
    })
    .eq("id", companyId)
    .select("name, hr_contact_email, user_id")
    .single();

  if (error) throw new Error("Failed to reject company");

  // 2. Notify User via In-App Notification
  await supabase.from("notifications").insert({
    user_id: data.user_id,
    type: "error",
    title: "Registration Rejected",
    body: `Your company registration was rejected. Reason: ${reason}`,
  });

  // 3. Send Email
  if (data.hr_contact_email) {
    await sendCompanyStatusEmail(data.hr_contact_email, data.name, "rejected", reason);
  }

  revalidatePath("/admin/companies");
  return { success: true };
}

export async function approveListing(listingId: string, adminId: string) {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from("listings")
    .update({
      status: "approved",
      approved_by: adminId,
      approved_at: new Date().toISOString(),
    })
    .eq("id", listingId)
    .select("title, company_id, companies(user_id, hr_contact_email)")
    .single();

  if (error) throw new Error("Failed to approve listing");

  const company = Array.isArray(data.companies) ? data.companies[0] : data.companies;
  if (!company) return { success: true };

  // 2. Notify User via In-App Notification
  await supabase.from("notifications").insert({
    user_id: company.user_id,
    type: "approval",
    title: "Listing Approved",
    body: `Your listing "${data.title}" has been approved and is now live.`,
  });

  // 3. Send Email
  if (company.hr_contact_email) {
    await sendListingStatusEmail(company.hr_contact_email, data.title, "approved");
  }

  revalidatePath("/admin/listings");
  return { success: true };
}

export async function rejectListing(listingId: string, adminId: string, reason: string) {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from("listings")
    .update({
      status: "rejected",
      rejection_reason: reason,
      approved_by: adminId,
      approved_at: new Date().toISOString(),
    })
    .eq("id", listingId)
    .select("title, company_id, companies(user_id, hr_contact_email)")
    .single();

  if (error) throw new Error("Failed to reject listing");

  const company = Array.isArray(data.companies) ? data.companies[0] : data.companies;
  if (!company) return { success: true };

  // 2. Notify User via In-App Notification
  await supabase.from("notifications").insert({
    user_id: company.user_id,
    type: "error",
    title: "Listing Rejected",
    body: `Your listing "${data.title}" was rejected. Reason: ${reason}`,
  });

  // 3. Send Email
  if (company.hr_contact_email) {
    await sendListingStatusEmail(company.hr_contact_email, data.title, "rejected", reason);
  }

  revalidatePath("/admin/listings");
  return { success: true };
}
