"use server";

import DispatchEntryEmail from "@/components/emails/dispatch";
import { Incident } from "@/typings";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.PRIMARY_EMAIL_ADDRESS || "";

export const sendEmail = async (
  validatedEmails: string[],
  incident?: Incident,
) => {
  if (!incident) return { success: false, error: "No incident provided" };

  const { description, investigation, category, referenceNumber, compiler } =
    incident;

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: validatedEmails,
      subject: `${incident.compiler.UserProfile[0].entity.code} - ${referenceNumber} - ${category?.name}`,
      // text: "Hello from SendGrid",
      // cc:[],
      react: DispatchEntryEmail({
        description,
        category: category?.name,
        entity: incident.compiler.UserProfile[0].entity.name,
        referenceNumber,
        investigation,
        compiler: compiler?.name,
      }),
    });
    return { success: true, data };
  } catch (error) {
    console.log(error);

    return { success: false, error };
  }
};
