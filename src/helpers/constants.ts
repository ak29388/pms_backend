export const ACTIVE = 'Active';
export const INACTIVE = 'Inactive';

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum Project_status {
  ACTIVE = 'Active',
  DISPUTED = 'Disputed',
  HIRED = 'Hired',
  CANCELED = 'Canceled',
  DELIVERED = 'Delivered',
  SUSPENDED = 'Suspended',
  DELETED = 'Deleted',
}

export enum Project_Condition_Enum {
  NEW = 'New',
  BUG_FIXES = 'Bug fixes',
}

export enum Project_Phase_ENUM {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
}

export enum Project_Type_Enum {
  HOURLY = 'Hourly',
  FIXED = 'Fixed',
}

export enum MilestoneLinksStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
  SUSPENDED = 'Suspended',
  SKIPPED = 'Skipped',
}

export enum AccountRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  SUB_ADMIN_HR = 'Sub-Admin-HR',
  SUB_ADMIN_BUISNESS = 'Sub-Admin-Business',
}

export enum Account_Status {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DELETE = 'Delete',
}

export enum Document_type {
  SRS = 'SRS',
  MILESTONE = 'Milestone',
  WEBSITE = 'Website',
  PRIVACY_POLICY = 'Privacy Policy',
  TERM_AND_CONDITION = 'Terms & Conditions',
  IOS_APP = 'iOS app',
  ADNROID_APP = 'Android app',
  DATABASE = 'Database',
  MOBILE_APP_DESIGNS = 'Mobile app designs',
  WEB_APP_DESIGNS = 'Web app designs',
  PROTOTYPE = 'Prototype',
}

export enum Project_Role {
  DEVELOPER = 'Developer',
  TEAM_LEAD = 'Team lead',
  PROJECT_INCHARGED = 'Project Incharge',
  QUALITY_ANALYST = 'Quality Analyst',
  DESIGNER = 'Designer',
  PROJECT_MANGER = 'Project Manager',
}

export enum Project_Team_Status {
  ASSIGNED = 'Assigned',
  REMOVED = 'Removed',
}

export enum Priority_Label {
  TODO = 'To DO',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export enum Department {
  MANAGEMENT = 'Management',
  BUISNESS = 'Business',
  HRM = 'HRM',
  PROJECT_MANAGEMENT = 'Project Management',
  MOBILITY = 'Mobility',
  WEB = 'Web',
  BACKEND = 'Backend',
  QUALITY = 'Quality',
  ADMIN = 'Admin',
  ACCOUNTING = 'Accounting',
  TRAINIG = 'Training',
  HOSPITALITY = 'Hospitality',
}

export const jwtConstants = {
  JWTSECRET: 'qGCsUvBOw9HWIZp2MRq9QF_0c2HPU0e0AmKz93zJFAHCp57SJJNxdpEZjp_cjIDe',
};

export const Roles_Check = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  SUB_ADMIN_HR: 'Sub-Admin-HR',
  SUB_ADMIN_BUISNESS: 'Sub-Admin-Business',
};

export enum Modules {
  PROJECT = 'Project',
  EMPLOYEE = 'Employee',
  REPORTING = 'Reporting',
  LEAVE = 'Leave',
}


export enum Platform_enum {
  IOS = 'iOS',
 ANDROID = 'Android' ,
WEB ='Web',
ALL = 'All'


}

export enum Sourced_From{
  UPWORK = 'upwork',
  LOCAL = 'local',
  GURU = 'guru'
}

export enum AddressType{
  PERMANENT = 'Permanent',
  LOCAL = 'Local',
}

export enum Service_Type{
  EMAIL ='Email',
  SKYPE = 'Skype',
  SLACK = 'Slack',
  GITLAB = 'Gitlab',
  GITHUB = 'Github',
  BITBUCKET = 'Bitbucket'
}

export enum Api_Log_Type {
  UPDATE = 'Update',
  CREATE = 'Create',
  DELETE = 'Delete',
}

export enum  Module_Type {
  CREATE_EMPLOYEE = 'Create Employee',
  UPDATE_EMPLOYEE = 'Update Employee',
  DELETE_EMPLOYEE = 'Delete Employee',
  CREATE_ADDRESS = 'Create Address',
  UPDATE_ADDRESS = 'Update Address',
  DELETE_ADDRESS = 'Delete Address',
  CREATE_JOB_DEATILS = 'Create Job Details',
  UPDATE_JOB_DEATILS = 'Update Job Details',
  DELETE_JOB_DEATILS = 'Delete Job Details',
  CREATE_CREDENTIALS = 'Create Credentials',
  UPDATE_CREDENTIALS = 'Update Credentials',
  DELETE_CREDENTIALS = 'Delete Credentials',
  CREATE_WORK_EXPERIENCE = 'Create Work Experience',
  UPDATE_WORK_EXPERIENCE = 'Update Work Experience',
  DELETE_WORK_EXPERIENCE = 'Delete Work Experience',
  CREATE_EDUCATION = 'Create Education',
  UPDATE_EDUCATION = 'Update Education',
  DELETE_EDUCATION = 'Delete Education',
  CREATE_EMPLOYEE_TEAM_MEMBER = 'Create Team Member',
  //Project
  CREATE_PROJECT = 'Create Project',
  UPDATE_PROJECT= 'Update Project',
  DELETE_PROJECT = 'Delete Project',
  EMPLOYEE = 'Employee',
  ADDRESS = 'Address',
  JOB_DETAILS = 'Job Details',
  CREDENTIALS = 'Credentials',
  WORK_EXPERIENCE = 'Work Experience',
  EDUCATION = 'Education',
  PROJECT = 'Project',
  TEAM_MEMBER = 'Project Team Member',
  MILESTONE = 'Milestons',
  MILESTONE_ASSIGNEE = 'Milestons assignee',
  PROJECT_DOCUMENT = 'Project Document',
  PROJECT_LINKS = 'Project Links',
  MILESTONE_LINKS = 'Milestone links',
  REQUEST_MODULE = 'Request module',
  REQUEST_MODULE_LINKS = 'Request module links',
  TASK = 'Task module',

}