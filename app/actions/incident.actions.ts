"use server";
import { Incident } from "@/typings";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { deleteData, fetchData, patchData, postData } from "./fetch-helper";
import { incidentSchema } from "@/lib/schemas/create-incident-schema";
import { redirect } from "next/navigation";
import { personInvolvedSchema } from "@/lib/schemas/create-person-involved-schema";

// export const getAllIncidents = async () => {
//   let response = await fetchData("incidents");
//   // if error throw error
//   if (response.error) {
//     throw new Error(response.error);
//   }

//   console.log("here", response);

//   return response;
// };

export const getIncident = async (referenceNumber: string) => {
  try {
    let response: Incident = await fetchData(`incidents/${referenceNumber}`);

    return response;
  } catch (error) {
    return null;
  }
};

/// Creating an incident
const InputWithoutDate = incidentSchema.omit({
  occurrenceDate: true,
  time: true,
});
type IncidentInput = z.infer<typeof InputWithoutDate>;

export const createIncident = async (data: IncidentInput) => {
  const result = InputWithoutDate.safeParse(data);

  if (result.success) {
    let response = await postData("incidents", result.data);
    return response;
  } else {
    return { success: false, error: result.error.format() };
  }
};

/// Updating an incident
export const updateIncident = async (data: IncidentInput) => {
  const result = InputWithoutDate.safeParse(data);

  if (result.success) {
    const { referenceNumber, ...rest } = result.data;

    let response = await patchData(`incidents/${referenceNumber}`, rest);
    return response;
  }

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }
};

/// Deleting an incident
export const deleteIncident = async (id: string) => {
  try {
    await deleteData(`incident-categories/${id}`);
    revalidatePath("/settings/incident-categories");
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

// PERSON INVOLVED ACTIONS

export const getPersonInvolved = async (id: string) => {
  try {
    let response = await fetchData(`person-involved/${id}`);

    return response;
  } catch (error) {
    return null;
  }
};

type PersonInvolvedInput = z.infer<typeof personInvolvedSchema>;

export const createPersonInvolved = async (data: PersonInvolvedInput) => {
  try {
    let response = await postData("people-involved", data);

    if (!response.error) {
      revalidatePath(`/incidents/${data.incidentReferenceNumber}`);
    }
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deletePersonInvolved = async (
  id: string,
  incidentReferenceNumber: string,
) => {
  try {
    await deleteData(`people-involved/${id}`);
    revalidatePath(`/incidents/${incidentReferenceNumber}`);
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong");
  }
};
