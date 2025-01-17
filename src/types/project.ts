export interface ActiveProjectsType {
  totalCount: number;
  data: ProjectType[];
  totalProjects: TotalProjects;
}

export interface ArchivedProjectsType {
  totalCount: number;
  data: ProjectType[];
  totalProjects: TotalProjects;
}

export interface SampleProjectsType {
  totalCount: number;
  data: ProjectType[];
  totalProjects: TotalProjects;
}
export interface ProjectType {
  _id: string;
  name: string;
  currency: string;
  projectType: string;
  type: string;
  imgUrl: string;
  updatedOn: string;
  users: string[];
  accessControl: AccessControl;
}

export interface AccessControl {
  userId: User;
  roles: Role[];
  showRatesInProject: boolean;
  isSharedAccess: boolean;
}

export interface User {
  _id: string;
  name: string;
}

export interface Role {
  _id: string;
  name: string;
  entitlements: Entitlements;
}

export interface Entitlements {
  quotes: Permission;
  invoices: Permission;
  payments: Permission;
  itemLibrary: Permission;
  reports: Permission;
}

export interface Permission {
  addEdit: boolean;
  viewOnly: boolean;
  download: boolean;
}

export interface TotalProjects {
  project: number;
  sample: number;
  template: number;
  shared: number;
  archive: number;
}

export interface PaymentTotalType {
  paymentTotal: {
    Balance: number;
    EXPENSE: number;
    RECEIPT: number;
  };
  _id: string;
}
export interface TotalPaymentsType {
  paymentTotals: PaymentTotalType[];
}
