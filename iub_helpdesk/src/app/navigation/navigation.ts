import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'dashboard',
        title    : 'Dashboard',
        type     : 'item',
        icon     : 'dashboard',
        url     : '/dashboard'
    },
    {
        id       : 'users',
        title    : 'User Management',
        type     : 'group',
        icon      : 'group',
        children : [
            {
                id       : 'student',
                title    : 'Student',
                type     : 'collapsable',
                icon     : 'supervised_user_circle',
                children : [
                    {
                        id       : 'add_new_student',
                        title    : 'Add New Student',
                        type     : 'item',
                        icon     : 'person_add',
                        url      : '/users/student-entry',
                  
                    },
                    {
                        id       : 'student_list',
                        title    : 'Student List',
                        type     : 'item',
                        icon     : 'view_list',
                        url      : '/users/student-list',
                  
                    },  
                ]
          
            },
            {
                id       : 'employees',
                title    : 'Employees',
                type     : 'collapsable',
                icon     : 'supervisor_account',
                children : [
                    {
                        id       : 'add_new_employee',
                        title    : 'Add New Employee',
                        type     : 'item',
                        icon     : 'person_add',
                        url      : '/users/employee-entry',
                  
                    },
                    {
                        id       : 'employee_list',
                        title    : 'Employees List',
                        type     : 'item',
                        icon     : 'view_list',
                        url      : '/users/employee-list',
                  
                    },  
                ]
          
            },
            
        ]
    },
    {
        id       : 'tickets',
        title    : 'Ticket Management',
        type     : 'group',
        icon      : 'group',
        children : [
               
                    {
                        id       : 'add_new_ticket',
                        title    : 'Create a ticket',
                        type     : 'item',
                        icon     : 'post_add',
                        url      : '/ticket/ticket-entry',
                  
                    },
                    {
                        id       : 'ticket_list',
                        title    : 'Ticket List',
                        type     : 'item',
                        icon     : 'view_list',
                        url      : '/ticket/ticket-list',
                  
                    }
                
        ]
    },

    // {
    //     id       : 'projects',
    //     title    : 'Projects Management',
    //     type     : 'group',
    //     icon      : 'group',
    //     children : [
    //         {
    //             id       : 'add_new_project',
    //             title    : 'Add New Projects',
    //             type     : 'item',
    //             icon     : 'add_task',
    //             url      : '/projects/create-projects',
    //         },
    //         {
    //             id       : 'projects_managemnet',
    //             title    : 'Projects Details',
    //             type     : 'item',
    //             icon     : 'assignment',
    //             url      : '/projects/projects-list',
    //         }, 
    //         // {
    //         //     id       : 'projects_schedule',
    //         //     title    : 'Projects Schedule',
    //         //     type     : 'item',
    //         //     icon     : 'view_list',
    //         //     url      : '/projects/create_project_schedule',
    //         // },
    //         // {
    //         //     id       : 'project',
    //         //     title    : 'Projects',
    //         //     type     : 'collapsable',
    //         //     icon     : 'developer_board',
    //         //     children : [
    //         //         {
    //         //             id       : 'add_new_client',
    //         //             title    : 'Add New Projects',
    //         //             type     : 'item',
    //         //             icon     : 'person_add',
    //         //             url      : '/projects/create-projects',
    //         //         },
    //         //         {
    //         //             id       : 'projects_list',
    //         //             title    : 'Projects Details',
    //         //             type     : 'item',
    //         //             icon     : 'view_list',
    //         //             url      : '/projects/projects-list',
    //         //         },  
    //         //     ]
          
    //         // },
          
           
    //     ]
    // },
    // {
    //     id       : 'event_management_group',
    //     title    : 'Event Management',
    //     type     : 'group',
    //     icon      : 'group',
    //     // url      : '/event_management/calendar',
    //     children : [
    //         {
    //             id       : 'event_management',
    //             title    : 'Event Management',
    //             type     : 'item',
    //             icon     : 'event_available',
    //             url      : '/event_management/calendar',
                
    //         }
            
    //     ]
    // },
    // {
    //     id       : 'accounts',
    //     title    : 'Accounts',
    //     type     : 'group',
    //     icon      : 'group',
    //     children : [
    //         {
    //             id       : 'create_payment',
    //             title    : 'Payment',
    //             type     : 'item',
    //             icon     : 'payments',
    //             url      : '/projects/create_payment',
    //         },
    //         {
    //             id       : 'invoiced',
    //             title    : 'All Invoiced',
    //             type     : 'item',
    //             icon     : 'receipt',
    //             url      : '/projects/all_invoiced_list',
    //         },
    //         {
    //             id       : 'transaction',
    //             title    : 'Transaction',
    //             type     : 'collapsable',
    //             icon     : 'compare_arrows',
    //             children : [
    //                 {
    //                     id       : 'transaction_list',
    //                     title    : 'All Transaction',
    //                     type     : 'item',
    //                     icon     : 'compare_arrows',
    //                     url      : '/projects/transaction_list',
    //                 },
                  
    //             ]
    //         },
           
    //         {
    //             id       : 'inventory',
    //             title    : 'Inventory',
    //             type     : 'collapsable',
    //             icon     : 'storefront',
    //             children : [
    //                 {
    //                     id       : 'material_management',
    //                     title    : 'Material Management',
    //                     type     : 'item',
    //                     icon     : 'library_add',
    //                     url      : '/projects/inventory_management',
    //                 },
    //                 {
    //                     id       : 'material_sold',
    //                     title    : 'Material Soldout List',
    //                     type     : 'item',
    //                     icon     : 'camera_roll',
    //                     url      : '/projects/inventory_soldout',
    //                 },  
    //             ]
    //         },
             
    //     ]
    // },
    // {
    //     id       : 'payroll',
    //     title    : 'Payroll Management',
    //     type     : 'group',
    //     icon      : 'group',
    //     children : [
    //         {
    //             id       : 'manage_salary',
    //             title    : 'Manage Salary',
    //             type     : 'item',
    //             icon     : 'tune',
    //             url      : '/payroll/manage_salary',
    //         },
    //         {
    //             id       : 'salary_data_list',
    //             title    : 'Salary Manage List',
    //             type     : 'item',
    //             icon     : 'view_list',
    //             url      : '/payroll/salary_data_list',
    //         },
    //         {
    //             id       : 'monthly_payroll',
    //             title    : 'Monthly Payroll',
    //             type     : 'item',
    //             icon     : 'attach_money',
    //             url      : '/payroll/salary_payment',
    //         },
    //         // {
    //         //     id       : 'payroll_management',
    //         //     title    : 'Payroll Management',
    //         //     type     : 'collapsable',
    //         //     icon     : 'attach_money',
    //         //     children : [
    //         //         {
    //         //             id       : 'manage_salary',
    //         //             title    : 'Manage Salary',
    //         //             type     : 'item',
    //         //             icon     : 'attach_money',
    //         //             url      : '/payroll/manage_salary',
    //         //         },
    //         //         {
    //         //             id       : 'salary_data_list',
    //         //             title    : 'Salary Manage List',
    //         //             type     : 'item',
    //         //             icon     : 'attach_money',
    //         //             url      : '/payroll/salary_data_list',
    //         //         },
    //         //         {
    //         //             id       : 'payrolls',
    //         //             title    : 'Monthly Payroll',
    //         //             type     : 'item',
    //         //             icon     : 'attach_money',
    //         //             url      : '/payroll/salary_payment',
    //         //         },
                    
    //         //     ]
    //         // }
            
    //     ]
    // },
    // {
    //     id       : 'configuration',
    //     title    : 'Configuration',
    //     type     : 'group',
    //     icon     : 'room_preferences',
    //     children : [
            
    //         {
    //             id       : 'department',
    //             title    : 'Department Manage',
    //             type     : 'collapsable',
    //             icon     : 'tune',
    //             children : [
    //                 {
    //                     id       : 'create_department',
    //                     title    : 'Create Department',
    //                     type     : 'item',
    //                     icon     : 'add',
    //                     url      : '/configure/create_department',
    //                 },
    //                 {
    //                     id       : 'department_list',
    //                     title    : 'Department List',
    //                     type     : 'item',
    //                     icon     : 'view_list',
    //                     url      : '/configure/department_list',
    //                 },
                    
    //             ]
    //         },
    //         {
    //             id       : 'accounts_head',
    //             title    : 'Accounts Heads',
    //             type     : 'collapsable',
    //             icon     : 'tune',
    //             children : [
    //                 {
    //                     id       : 'create_accounts_head',
    //                     title    : 'Create new head',
    //                     type     : 'item',
    //                     icon     : 'add',
    //                     url      : '/configure/create_accounts_head',
    //                 },
    //                 {
    //                     id       : 'accounts_head_list',
    //                     title    : 'All head list',
    //                     type     : 'item',
    //                     icon     : 'view_list',
    //                     url      : '/configure/accounts_head_list',
    //                 },
                    
    //             ]
    //         },
    //         {
    //             id       : 'designation',
    //             title    : 'Designation Manage',
    //             type     : 'collapsable',
    //             icon     : 'tune',
    //             children : [
    //                 {
    //                     id       : 'create_designation',
    //                     title    : 'Create Designation',
    //                     type     : 'item',
    //                     icon     : 'add',
    //                     url      : '/configure/create_designation',
    //                 },
    //                 {
    //                     id       : 'designation_list',
    //                     title    : 'Designation List',
    //                     type     : 'item',
    //                     icon     : 'view_list',
    //                     url      : '/configure/designation_list',
    //                 },
                    
    //             ]
    //         },
    //         {
    //             id       : 'services',
    //             title    : 'Services',
    //             type     : 'collapsable',
    //             icon     : 'tune',
    //             children : [
    //                 {
    //                     id       : 'create_service',
    //                     title    : 'Add New service',
    //                     type     : 'item',
    //                     icon     : 'add_task',
    //                     url      : '/projects/create-task',
                  
    //                 },
    //                 {
    //                     id       : 'service_list',
    //                     title    : 'Services List',
    //                     type     : 'item',
    //                     icon     : 'view_list',
    //                     url      : '/projects/tasks-list',
                  
    //                 },  
    //             ]
          
    //         }
            
    //     ]
    // },
    
    
    // {
    //     id       : 'administrator',
    //     title    : 'Administrator',
    //     type     : 'group',
    //     icon      : 'security',
    //     children : [
    //         {
    //             id       : 'role_management',
    //             title    : 'Role Management',
    //             type     : 'item',
    //             icon     : 'admin_panel_settings',
    //             url      : '/administration/role_management',
    //         },
    //         {
    //             id       : 'user_management',
    //             title    : 'User Management',
    //             type     : 'item',
    //             icon     : 'groups',
    //             url      : '/administration/user_management',
    //         }
            
            
    //     ]
    // }
    // {
    //     id       : 'reports',
    //     title    : 'Reports',
    //     type     : 'group',
    //     icon      : 'group',
    //     children : [
    //         {
    //             id       : 'projects_report',
    //             title    : 'Projects Related',
    //             type     : 'collapsable',
    //             icon     : 'developer_board',
    //             children : [
    //                 {
    //                     id       : 'human_resources',
    //                     title    : 'Human Resources',
    //                     type     : 'item',
    //                     icon     : 'reorder',
    //                     url      : '/reports/human-resources',
    //                 },
    //             ]
                
    //         }
            
    //     ]
    // },
    
    
];
