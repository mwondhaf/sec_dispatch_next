export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  role: string;
  employeeType: string;
  idNumber: string;
  UserProfile: UserProfile[];
  companyId?: string;
  company?: Company;
  password?: string;
};

export type UserProfile = {
  readonly id: string;
  entityId: string;
  readonly userEmail: string;
  entity: Entity;
  user: User;
};

export type Entity = {
  readonly id: string;
  name: string;
  code: string;
  makani: string;
};

export type Company = {
  readonly id: string;
  name: string;
  workScope?: string;
  trade_license_number: string;
};

export type IncidentType = {
  readonly id: string;
  name: string;
};

export type IncidentCategory = {
  readonly id: string;
  name: string;
  incidentType?: IncidentType;
  incidentTypeId: string;
};

export type Department = {
  readonly id: string;
  name: string;
};

enum Severity {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export type Incident = {
  readonly id: string;
  severity: Severity;
  description: string;
  location: string;
  investigation: string;
  incidentCategoryId: string;
  occurrenceTime: Date;
  incidentClosedTime: Date;
  deleted: boolean;
  entityId: string;
  compilerEmail: string;
  editorEmail: string;
  reporterName: string;
  departmentId: string;
  referenceNumber: string;
  category: IncidentCategory;
  incidentTime: Date;
  reporterDepartment: Department;
  PeopleInvolved: PersonInvolved[];
  compiler: User;
  editor: User;
  entity: Entity;
};

export type PersonInvolved = {
  readonly id: string;
  name: string;
  identity_number?: string;
  nationality?: string;
  incidentReferenceNumber: string;
  departmentId: string;
  remarks?: string;
};

export type Country = {
  name: string;
  code: string;
};
