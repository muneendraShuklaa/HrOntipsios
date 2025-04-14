export default {
  // ---------------------------- Production Url -----------------------

  // baseUrl: 'https://prodapi.hrontips.com/',
  // baseUrlTask: 'https://prodapi.hrontips.com/',

  //  ----------------------------------------------------------------------------

  // -------------------------Stage Url ------------------------------------------

  baseUrl: 'https://stageapi.hrontips.com/',

  baseUrlTask: 'https://stageapi.hrontips.com/',

  // -------------------------------------------------------------------

  Login: 'API/Account/AuthenticateUser',
  PersonalDetail: 'API/Home/GetDataPesionaldetails',
  ClockInOut: 'API/Home/InsertUpdateClockInAndOut ',
  track: 'API/Home/InsertEmpGeoTrack',
  leaveStatus: 'API/Home/GetEmployeePendingLeaveApproval',
  UserPersonalDetail: 'API/Home/GetDatajobdetails',
  //  LeaveApproval: 'API/Home/GetPendingLeaveApproval_newapi',
  LeaveApproval: 'API/Home/GetPendingLeaveApproval_V2',

  statusLeave: 'API/Home/ApproveRejectLeave',
  GetLeaveBalance: 'API/Home/GetLeaveBalance',
  GetLeaveType: 'API/Home/GetLeaveType',
  GetImageProfile: 'API/UploadPicture/GetUploadPicture',
  ApplyLeave: 'API/Home/SaveRequestedLeave',
  TimeTracker: 'API/Home/GetInitialDataForTimeTracker',
  LeaveBalance: 'API/Home/GetLeavesBalanceAndDescByType',
  DSRList: 'API/DSR/DSRListing',
  DailyLog: 'API/Home/GetTotalDataforPresentorabsent',
  MyTeam: 'API/Home/GetEmpLocationCoordinates',
  // PendingLeave:"API/Home/GetLeaveBalance"
  // GetTimeTracker: 'API/Home/GetInitialDataForTimeTracker',
  ////ejoinnn
  EjoinData: 'API/Ejoin/GeteJoinEmployeeDocumentView',
  UploadDoc: 'API/Ejoin/eJoinEmployeeDocumentUpload',
  DocList: 'API/Ejoin/GeteJoinUploadEmployeeDocumentView',
  DSRDetail: 'API/DSR/DSRDetails',
  DSRSubmit: 'API/DSR/DSRSubmit',
  Dropdowntaskcate: 'api/tASKmANAGER/TaskCategoryDetail',
  TaskList: 'api/TaskManager/GetTaskDetails',
  AddDsr: 'API/DSR/DSRSaveReport',
  searchDsrPrject: 'API/DSR/DSRSearchProject',
  AssignUser: 'api/TaskManager/GetDataForAllAssignByUser',
  Category: 'api/TaskManager/TaskCategoryDetail',
  SaveTask: 'api/TaskManager/SaveTask',
  getComment: 'api/TaskManager/GetTaskCommentDetails',
  addcomment: 'api/TaskManager/SaveTaskCommentDetails',
  reminderList: 'api/TaskManager/GetReminderDetails',
  DeleteReminder: 'api/TaskManager/DeleteTaskReminder',
  SaveReminder: 'api/TaskManager/SaveReminder',
  DeleteTask: 'api/TaskManager/Delete_TaskbyId',
  DeleteComment: 'api/TaskManager/DeleteTaskcomment',
  UpdateTask: 'api/TaskManager/UpdateTask',
  UpdatePriority: 'api/TaskManager/SaveTaskPriorityDetails',
  UpdateTasksStatus: 'api/TaskManager/Update_TasksStatus',
  GetTaskImages: 'api/TaskManager/GetfileData',
  Notification: 'API/Notification/GetAllNotification',
  AddimageInTAsk: 'api/TaskManager/FileSave',
  SaveImageOnTask: 'api/TaskManager/SaveTaskWithImage',
  imageView: '/API/home/GetBase64Document?filePath=',
  CancelLeave: 'API/home/AprrovalCancel',
  Announcement: 'API/home/AnnouncementMasterDataGet',
  AddAnnoucement: 'API/home/SaveAnnouncement',
  AnnoucementType: 'API/Home/GetTemplateDropDown',
  LogDetails: 'API/home/GetDataforpresentorabsent',
  RegisterDevice: 'API/UploadPicture/SaveDeviceToken',
  RegisterAddress: 'API/TaskManager/InsertGeoAdress',


  // regularisation
  BindRegularisationData: `api/Regularisation/BindRegularisationDataByEmpid`,
  SaveRegularisationReq: `api/Regularisation/SaveRegualrisationRequest`,
  ApproveRejectAttendanceRequest: `api/Regularisation/ApproveRejectAttendanceRequest`,
  BindApprovalAttendanceGrid_API: `api/Regularisation/BindApprovalAttendanceGrid_API`,


  //manage attendance
  BindManageAttend: `API/Attendance/BindLeaveManagementGrid`,
  updateInOutAttend: `api/Attendance/InsertUpdateClockInoutFromLeaveManagement`,
  insertUpdateLeave: `api/Attendance/leaveInsertUpdate`,
  insertUpdateInAndOut: `api/Attendance/InsertUpdateClockInoutFromLeaveManagement`,

  // emp attendance
  EmpAttendance: `API/MYTeam/GetEmpAttendance`,


  // reimbursement
  EmpReimbursement:`api/Reimbursement/BindEmpReimbursement`,
  HrReimbursement:`API/Reimbursement/BindReimbursement_HR_Manager_V2`,
  ConfirmReimbursement:`API/Reimbursement/ApproveRejectEmployeeReimbursement`,
  // ApplyReimbursement:`api/Reimbursement/BindReimbursement`,
  DeleteReimbursement:`API/Reimbursement/DeleteEmpReimbursementData`,
  DownImgReimbursement:`API/Reimbursement/GetReimbursementImage`,
  ApplyWithoutImgReimbursement:`API/Reimbursement/SaveEmpReimbursementData`,
  ApplyWithImgReimbursement:`API/Reimbursement/SaveEmpReimbursementDataWithImage`


};
