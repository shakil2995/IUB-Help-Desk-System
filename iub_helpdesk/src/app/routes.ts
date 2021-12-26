import { NotFoundComponent } from './not-found/not-found.component';

export const routes = [
    { 
        path: '', 
        redirectTo: '/dashboard', pathMatch: 'full'
    },
    { 
        path: 'dashboard', 
        loadChildren: () => import('app/main/dashboard/dashboard.module').then(m => m.DashboardModule)   
    },
    { 
        path: 'login',
        loadChildren: () => import('app/main/login/login.module').then(m => m.LoginModule)        
    },
    { 
        path: 'login/login2',
        loadChildren: () => import('app/main/login/login.module').then(m => m.LoginModule)        
    },
    { 
        path: 'login/login3',
        loadChildren: () => import('app/main/login/login.module').then(m => m.LoginModule)        
    },
    { 
        path: 'registration', 
        loadChildren: () => import('app/main/app-registration/app-registration.module').then(m => m.AppRegistrationModule)        
    },
    
    { 
        path: 'users',
        loadChildren: () => import('app/main/users/users.module').then(m => m.UsersModule)   
    },
    { 
        path: 'users/student-entry', 
        loadChildren: () => import('app/main/users/users.module').then(m => m.UsersModule)   
    },
    { 
        path: 'users/student-update/:id', 
        loadChildren: () => import('app/main/users/users.module').then(m => m.UsersModule)   
    },
    { 
        path: 'users/student-list', 
        loadChildren: () => import('app/main/users/users.module').then(m => m.UsersModule)   
    },
    { 
        path: 'users/employee-entry', 
        loadChildren: () => import('app/main/users/users.module').then(m => m.UsersModule)   
    },
    { 
        path: 'users/employee-list', 
        loadChildren: () => import('app/main/users/users.module').then(m => m.UsersModule)   
    },
    { 
        path: 'users/contructor-entry', 
        loadChildren: () => import('app/main/users/users.module').then(m => m.UsersModule)   
    },
    { 
        path: 'users/contructor-list', 
        loadChildren: () => import('app/main/users/users.module').then(m => m.UsersModule)   
    },

    { 
        path: 'ticket',
        loadChildren: () => import('app/main/tickets/tickets.module').then(m => m.TicketsModule)   
    },
    { 
        path: 'ticket/ticket-entry',
        loadChildren: () => import('app/main/tickets/tickets.module').then(m => m.TicketsModule)   
    },
    { 
        path: 'ticket/ticket-list',
        loadChildren: () => import('app/main/tickets/tickets.module').then(m => m.TicketsModule)   
    },

    
    // administration module
    { 
        path: 'administration',
        loadChildren: () => import('app/main/administration/administration.module').then(m => m.AdministrationModule)
    },
    { 
        path: 'administration/role_management',
        loadChildren: () => import('app/main/administration/administration.module').then(m => m.AdministrationModule)
    },
    { 
        path: 'administration/user_management',
        loadChildren: () => import('app/main/administration/administration.module').then(m => m.AdministrationModule)
    },
    // extra not-found and redirect control
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    { 
        path: '**', 
        redirectTo: 'not-found' 
    }
    
];
