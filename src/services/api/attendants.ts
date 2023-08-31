export interface GetAttendatsParams {
  organizationId: string;
}

export interface AddAttendantParams {
  organizationId: string;
  email: string;
}

export interface RemoveAttendantParams {
  attendantId: string;
  organizationId: string;
}
