import { sendEmail } from "@/app/actions/email.actions";

export async function POST() {
  await sendEmail();
}
