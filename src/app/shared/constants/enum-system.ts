export enum itemViewMode {
  create = 0,
  update = 1,
  view = 2,
}
export enum InputType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  ENUM = 'ENUM',
  DECIMAL = 'DECIMAL',
  HIDDEN = 'HIDDEN'
}
export enum  UserType{
  ADMIN = 'Admin',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
  BUSINESS = 'Business',
  HUMAN = 'Human',
  ACCOUNT = 'Account',
}




export enum ColumnType {
  STRING = 'STRING',
  INT = 'INT',
  DECIMAL_2 = 'DECIMAL_2',
  DECIMAL_4 = 'DECIMAL_4',
  DATE = 'DATE',
  DATERANGE = 'DATERANGE',
  BOOLEAN = 'BOOLEAN',
  MASTER = 'MASTER',
  ENUM = 'ENUM',
  DECIMAL = 'DECIMAL',
  VARIABLE = 'VARIABLE',
  VARIABLES = 'VARIABLES',
  MASTERSINGLE = 'MASTERSINGLE',
  CONTROLLER = 'CONTROLLER',
  HIDDEN = 'HIDDEN',
  BMI = 'BMI',
  AGE = "AGE",
  DEPRESSION = "DEPRESSION",
  STRESS = "STRESS",
  EQ_GOOD = "EQ_GOOD",
  EQ_GREET = "EQ_GREET",
  EQ_HAPPY = "EQ_HAPPY",
  EQ_SUM = "EQ_SUM",
  DEPRESSION_FROM = "DEPRESSION_FROM",
  SUCIED = "SUCIED",
  TIME = "TIME",
  ACTION = "ACTION",
}
export enum SortType {
  ASC = 1,
  DESC = 0,
  NONE = null,
}
export enum BracketType {
  None = 0,
  SingleStart = 1,
  SingleEnd = 2,
  DoubleStart = 3,
  DoubleEnd = 4,
}
export enum AccessMode {
  noAccess,
  viewer,
  editor,
  creator,
  full,
}

export enum LogType {
  SYSTEM,
  NORMAL,
}
export enum AccessLevel {
  None,
  User,
  Department,
  Branch,
  Company,
}
export enum ElementType {
  P_DROPDOWN = 'P-DROPDOWN',
  P_CALENDAR = 'P-CALENDAR',
  INPUT = 'INPUT',
  TEXTAREA = 'TEXTAREA',
  BUTTON = 'BUTTON',
  P_RADIOBUTTON = 'P-RADIOBUTTON',
  P_CHECKBOX = 'P-CHECKBOX',
  IV_PERCENT_INPUT = 'IV-PERCENT-INPUT',
  P_INPUTSWITCH = 'P-INPUTSWITCH',
  P_MULTISELECT = 'P-MULTISELECT',
  P_SELECTBUTTON = 'P-SELECTBUTTON',
  COMMENT = '#comment',
  P_TIEREDMENU = 'P-TIEREDMENU',
  A = 'A',
  SPAN = 'SPAN',
  P_INPUTNUMBER = 'P-INPUTNUMBER',
  LABEL = 'LABEL',
}
export enum HTTPTYPE {
  REQUESTING,
  RESPONSED,
  CLIENTPROCESS,
}
export enum MaskType {
  NUMBER,
  CURRENCY,
  PERCENT,
}
export enum Ordinal {
  Clear,
  System,
  First,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Seventh,
  Eighth,
  Ninth,
  Tenth,
  E11,
  E12,
  E13,
  E14,
  E15,
  E16,
  E17,
  E18,
  E19,
  E20,
  Batch01,
  Batch02,
  Batch03,
  Batch04,
  Batch05,
  Batch06,
  Batch07,
  ViewOnly,
}
export enum PathType {
  LIST = 'list',
  ITEM = 'item',
}

export enum ValidateClass{
  REQUIRED = "required",
  IS_EMAIL = 'is-email',
  HAS_VALUE = 'has-value',
  READONLY = 'readonly',
  INPUT_INVALID = 'input-invalid',
  SMALL_INVALID = 'invalid',
  DISABLE ='p-disabled'
}
export enum LoginStat{
  LOGIN = 'Login',
  LOGUOT ='Logout'
}
export enum EditRequestStatus{
  REQUEST = 1,
  APPROVE =2,
  REJECT = 3
}