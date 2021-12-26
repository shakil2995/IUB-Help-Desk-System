// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const api = 'http://localhost:8000/api/'; 
const api_v2 = 'http://localhost:8000/api_v2/'; 
export const environment = {
    production: false,
    hmr       : false,
    domain: api,
    login: api + 'login/',
    register: api + 'signup/',
    fileUploadApi: api_v2 + 'files_upload/',
    pictureUploadApi: api_v2 + 'picture_upload/',

    getallemployee : api + 'employee/',
    employee_create : api + 'employee/',
    employee_getById : api + 'employee',
    employee_update : api + 'employee',
    employee_delete: api + 'employee_delete',
    
    getAllClient : api + 'students/',
    client_create : api + 'students/',
    client_getById : api + 'students/',
    client_update : api + 'students/',
    client_delete: api + 'students/',

    getAllTicket : api + 'tickets/',
    ticket_create : api + 'ticket/create/',
    ticket_getById : api + 'tickets/',
    ticket_update : api + 'ticket/update/',

    permission_list : api + 'permission_list/',
    role_list : api + 'role_list/',
    role_create: api + 'role_create/',
    dashboard_data : api + 'dashboard_data/',
    // extra need to be fixed
    getAllContructor : api + 'getAllContructor',
    contructor_create : api_v2 + 'contructor_create',
    contructor_getById : api + 'contructor_getById',
    contructor_update : api_v2 + 'contructor_update',
    contructor_delete : api + 'contructor_delete',
    create_task: api + 'create_task',
    
    task_list : api + 'task_list',
    getAlltask : api + 'getAlltask',
    task_getById : api + 'task_getById',
    task_update : api + 'task_update',
    task_delete : api + 'task_delete',
    create_project : api + 'create_project',
    getAllproject : api + 'getAllproject',
    project_getById : api + 'project_getById',
    project_update : api + 'project_update',
    p_costDurationUpdate : api + 'p_costDurationUpdate',
    project_delete : api + 'project_delete',
    createNew_project_task : api + 'createNew_project_task',
    createNewSubtask : api + 'createNewSubtask',
    updateNewSubtask : api + 'updateNewSubtask',
    taskstatusChange : api + 'taskstatusChange',
    add_resource : api + 'add_resource',
    deleteResource : api + 'deleteResource',
    getresourceList : api + 'getresourceList',
    getProjectInvioced : api + 'getProjectInvioced',
    saveInvoiced : api + 'saveInvoiced',
    getAllInvoiced : api + 'getAllInvoiced',
    getOnlyprojects : api + 'getOnlyprojects',
    createPayment : api + 'createPayment',
    getAllTransaction : api + 'getAllTransaction',
    create_department : api + 'create_department',
    getDepartmentlist : api + 'getDepartmentlist',
    department_getById : api + 'department_getById',
    create_designation : api + 'create_designation',
    designation_getById : api + 'designation_getById',
    getdesignationlist : api + 'getdesignationlist',
    update_department : api + 'update_department',
    update_designation : api + 'update_designation',
    salary_insert : api + 'salary_insert',
    salary_update : api + 'salary_update',
    salary_data_list : api + 'salary_data_list',
    salaryData_getById : api + 'salaryData_getById',
    salary_payroll_list : api + 'salary_payroll',
    payroll_create : api + 'payroll_create',
    getAllPayrollData : api + 'getAllPayrollData',
    human_resource_insert : api + 'human_resource_insert',
    getAllhuman_resource : api + 'getAllhuman_resource',
    getAllhuman_resource_Last_credit : api + 'getAllhuman_resource_Last_credit',
    getProjectById : api + 'getProjectById',
    getDashboarddata : api + 'getDashboarddata',
    projectDetailsgetById : api + 'projectDetailsgetById',
    create_accounts_head : api + 'create_accounts_head',
    accounts_head_getById : api + 'accounts_head_getById',
    update_accounts_head : api + 'update_accounts_head',
    getAccountsHeadList : api + 'getAccountsHeadList',
    getInvoicedById: api + 'getInvoicedById',
    invWisetrasaction : api + 'invWisetrasaction',
    // event management
    getAllEvent : api + 'getAllEvent',
    create_event : api + 'create_event',
    update_event : api + 'update_event',
    delete_event : api + 'delete_event',
    // event management end
    getInventoryMaterials :  api + 'getInventoryMaterials',
    InventoryMaterialsEntry :  api + 'InventoryMaterialsEntry',
    InventoryMaterialsUpdate :  api + 'InventoryMaterialsUpdate',
    InventoryMaterialsDelete :  api + 'InventoryMaterialsDelete',
    invMaterialSold :  api + 'invMaterialSold',
    // schedule management 
    gantt_task_getall : api + 'gantt_task_getall',
    gantt_task_getbyId : api + 'gantt_task_getbyId',
    gantt_task_create : api + 'gantt_task_create',
    gantt_task_update : api + 'gantt_task_update',
    gantt_task_delete : api + 'gantt_task_delete',

    gantt_link_getall : api + 'gantt_link_getall',
    gantt_link_getbyId : api + 'gantt_link_getbyId',
    gantt_link_create : api + 'gantt_link_create',
    gantt_link_update : api + 'gantt_link_update',
    gantt_link_delete : api + 'gantt_link_delete',
    get_calanderOffday : api + 'get_calanderOffday',
    get_gantt_tasksForEstimatedSchedule : api + 'get_gantt_tasksForEstimatedSchedule',
    get_gantt_linksForEstimatedSchedule : api + 'get_gantt_linksForEstimatedSchedule',
    generateEstimatedScheduleFromCurrentSchedule : api + 'generateEstimatedScheduleFromCurrentSchedule',
    deleteEstimatedSchedule : api + 'deleteEstimatedSchedule',
    updateInvoice : api + 'updateInvoice',
    getSoldOutMaterialData : api + 'getSoldOutMaterialData',
    role_getById : api + 'role_getById'
    


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
