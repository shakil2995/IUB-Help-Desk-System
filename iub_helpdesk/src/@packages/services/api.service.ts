import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
const fakeapi = 'api/'; 
export function HandleError(error: any): Promise<any>{
	console.log(error);
	return Promise.reject(error);
}
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllTicket(): Observable<any> {
    return this.http.get(environment.getAllTicket, { headers: headers });
  }

  getAllemployee(): Observable<any> {
    return this.http.get(environment.getallemployee, { headers: headers });
  }

  ticket_create(data: any): Observable<any> {
    return this.http.post(environment.ticket_create, data);
  }
  ticket_update(data: any,id): Observable<any> {
    return this.http.put(environment.ticket_update + id, data);
  }

  employee_create(data: any): Observable<any> {
    return this.http.post(environment.employee_create, data);
  }
  employee_getById(id: number): Observable<any> {
    return this.http.get(environment.employee_getById + '/' + id, { headers: headers });
  }
  employee_update(id: number, data: any): Observable<any> {
    return this.http.put(environment.employee_update + '/' + id, data);
  }
  employee_delete(id: number): Observable<any> {
    return this.http.delete(environment.employee_delete + '/' + id, { headers: headers });
  }
  getAllClient(): Observable<any> {
    return this.http.get(environment.getAllClient, { headers: headers });
  }
  client_create(data): Observable<any> {
    return this.http.post(environment.client_create, data);
  }
  client_getById(id): Observable<any> {
    return this.http.get(environment.client_getById + '/' + id, { headers: headers });
  }
  client_update(id, data): Observable<any> {
    return this.http.put(environment.client_update + '/' + id, data);
  }
  client_delete(id): Observable<any> {
    return this.http.delete(environment.client_delete + '/' + id, { headers: headers });
  }
  getAllContructor(): Observable<any> {
    return this.http.get(environment.getAllContructor, { headers: headers });
  }
  contructor_create(data): Observable<any> {
    return this.http.post(environment.contructor_create, data);
  }
  contructor_getById(id): Observable<any> {
    return this.http.get(environment.contructor_getById + '/' + id, { headers: headers });
  }
  contructor_update(id, data): Observable<any> {
    return this.http.put(environment.contructor_update + '/' + id, data);
  }
  contructor_delete(id): Observable<any> {
    return this.http.delete(environment.contructor_delete + '/' + id, { headers: headers });
  }
  // task apis getAlltask
  create_task(data): Observable<any> {
    return this.http.post(environment.create_task, data, { headers: headers });
  }

  update_task(id, data): Observable<any> {
    return this.http.put(environment.task_update + '/' + id, data, { headers: headers });
  }
  getAlltask(): Observable<any> {
    return this.http.get(environment.getAlltask, { headers: headers });
  }
  task_getById(id): Observable<any> {
    return this.http.get(environment.task_getById + '/' + id, { headers: headers });
  }


  task_delete(id): Observable<any> {
    return this.http.delete(environment.task_delete + '/' + id, { headers: headers });
  }
  // task apis getAlltask
  create_project(data): Observable<any> {
    return this.http.post(environment.create_project, data, { headers: headers });
  }
  update_project(id, data): Observable<any> {
    return this.http.put(environment.project_update + '/' + id, data, { headers: headers });
  }
  p_costDurationUpdate(id, data): Observable<any> {
    return this.http.put(environment.p_costDurationUpdate + '/' + id, data, { headers: headers });
  }
  getAllproject(): Observable<any> {
    return this.http.get(environment.getAllproject, { headers: headers });
  }
  project_getById(id): Observable<any> {
    return this.http.get(environment.project_getById + '/' + id, { headers: headers });
  }

  project_delete(id): Observable<any> {
    return this.http.delete(environment.project_delete + '/' + id, { headers: headers });
  }
  //project related
  createNew_project_task(data): Observable<any> {
    return this.http.post(environment.createNew_project_task, data, { headers: headers });
  }
  createNewSubtask(data): Observable<any> {
    return this.http.post(environment.createNewSubtask, data, { headers: headers });
  }
  updateNewSubtask(id, data): Observable<any> {
    return this.http.put(environment.updateNewSubtask + '/' + id, data, { headers: headers });
  }
  taskstatusChange(data): Observable<any> {
    return this.http.post(environment.taskstatusChange, data, { headers: headers });
  }
  add_resource(data): Observable<any> {
    return this.http.post(environment.add_resource, data, { headers: headers });
  }
  deleteResource(id): Observable<any> {
    return this.http.delete(environment.deleteResource + '/' + id, { headers: headers });
  }
  getMaterialList(data): Observable<any> {
    return this.http.post(environment.getresourceList, data, { headers: headers });
  }
  getProjectInvioced(id): Observable<any> {
    return this.http.get(environment.getProjectInvioced + '/' + id, { headers: headers });
  }
  saveInvoiced(data): Observable<any> {
    return this.http.post(environment.saveInvoiced, data, { headers: headers });
  }
  updateInvoiced(data): Observable<any> {
    return this.http.post(environment.updateInvoice, data, { headers: headers });
  }
  getAllInvoiced(): Observable<any> {
    return this.http.get(environment.getAllInvoiced, { headers: headers });
  }
  getOnlyprojects(): Observable<any> {
    return this.http.get(environment.getOnlyprojects, { headers: headers });
  }
  createPayment(data): Observable<any> {
    return this.http.post(environment.createPayment, data, { headers: headers });
  }
  invMaterialSold(data): Observable<any> {
    return this.http.post(environment.invMaterialSold, data, { headers: headers });
  }
  getAllTransaction(): Observable<any> {
    return this.http.get(environment.getAllTransaction, { headers: headers });
  }
  // utilites apis
  create_department(data): Observable<any> {
    return this.http.post(environment.create_department, data, { headers: headers });
  }
  create_accounts_head(data): Observable<any> {
    return this.http.post(environment.create_accounts_head, data, { headers: headers });
  }
  department_getById(id): Observable<any> {
    return this.http.get(environment.department_getById + '/' + id, { headers: headers });
  }
  accounts_head_getById(id): Observable<any> {
    return this.http.get(environment.accounts_head_getById + '/' + id, { headers: headers });
  }

  getDepartmentlist(): Observable<any> {
    return this.http.get(environment.getDepartmentlist, { headers: headers });
  }
  getAccountsHeadList(): Observable<any> {
    return this.http.get(environment.getAccountsHeadList, { headers: headers });
  }
  create_designation(data): Observable<any> {
    return this.http.post(environment.create_designation, data, { headers: headers });
  }
  designation_getById(id): Observable<any> {
    return this.http.get(environment.designation_getById + '/' + id, { headers: headers });
  }
  getdesignationlist(): Observable<any> {
    return this.http.get(environment.getdesignationlist, { headers: headers });
  }
  update_department(id, data): Observable<any> {
    return this.http.put(environment.update_department + '/' + id, data, { headers: headers });
  }
  update_accounts_head(id, data): Observable<any> {
    return this.http.put(environment.update_accounts_head + '/' + id, data, { headers: headers });
  }
  update_designation(id, data): Observable<any> {
    return this.http.put(environment.update_designation + '/' + id, data, { headers: headers });
  }
  salary_insert(data): Observable<any> {
    return this.http.post(environment.salary_insert, data, { headers: headers });
  }
  salary_update(id, data): Observable<any> {
    return this.http.put(environment.salary_update + '/' + id, data, { headers: headers });
  }
  salary_data_list(): Observable<any> {
    return this.http.get(environment.salary_data_list, { headers: headers });
  }
  salaryData_getById(id): Observable<any> {
    return this.http.get(environment.salaryData_getById + '/' + id, { headers: headers });
  }
  salary_payroll_list(): Observable<any> {
    return this.http.get(environment.salary_payroll_list, { headers: headers });
  }
  payroll_create(data): Observable<any> {
    return this.http.post(environment.payroll_create, data, { headers: headers });
  }
  getAllPayrollData(): Observable<any> {
    return this.http.get(environment.getAllPayrollData, { headers: headers });
  }
  human_resource_insert(data): Observable<any> {
    return this.http.post(environment.human_resource_insert, data, { headers: headers });
  }
  getAllhuman_resource(id): Observable<any> {
    return this.http.get(environment.getAllhuman_resource + '/' + id, { headers: headers });
  }
  getAllhuman_resource_Last_credit(id): Observable<any> {
    return this.http.get(environment.getAllhuman_resource_Last_credit + '/' + id, { headers: headers });
  }
  getProjectById(id): Observable<any> {
    return this.http.get(environment.getProjectById + '/' + id, { headers: headers });
  }
  getDashboarddata(): Observable<any> {
    return this.http.get(environment.dashboard_data, { headers: headers });
  }
  projectDetailsgetById(id): Observable<any> {
    return this.http.get(environment.projectDetailsgetById + '/' + id, { headers: headers });
  }
  getInvoicedById(id): Observable<any> {
    return this.http.get(environment.getInvoicedById + '/' + id, { headers: headers });
  }
  invWisetrasaction(id): Observable<any> {
    return this.http.get(environment.invWisetrasaction + '/' + id, { headers: headers });
  }
  getInventoryMaterials(): Observable<any> {
    return this.http.get(environment.getInventoryMaterials, { headers: headers });
  }
  InventoryMaterialsEntry(data): Observable<any> {
    return this.http.post(environment.InventoryMaterialsEntry, data, { headers: headers });
  }
  // Event management
  getAllEvent():Observable<any>{
    return this.http.get(environment.getAllEvent,{headers : headers});
  }
  create_event(data):Observable<any>{
    return this.http.post(environment.create_event,data,{headers : headers});
  }
  update_event(id,data):Observable<any>{
    return this.http.put(environment.update_event +'/'+ id,data,{headers : headers});
  }
  delete_event(id:number):Observable<any>{
    return this.http.delete(environment.delete_event +'/'+ id,{headers : headers});
  }
  InventoryMaterialsUpdate(data, id): Observable<any> {
    return this.http.put(environment.InventoryMaterialsUpdate + '/' + id, data, { headers: headers });
  }
  InventoryMaterialsDelete(id): Observable<any> {
    return this.http.delete(environment.InventoryMaterialsDelete + '/' + id, { headers: headers });
  }
  
  // schedule management 
  get_gantt_tasksForEstimatedSchedule(data): Observable<any>{
     return  this.http.post(environment.get_gantt_tasksForEstimatedSchedule,data,{headers : headers})
	}
  get_gantt_tasks(data): Observable<any>{
    return  this.http.post(environment.gantt_task_getall,data,{headers : headers})
 }


  gantt_task_getbyId(id: number): Observable<any> {
    return this.http.get(environment.gantt_task_getbyId + '/' + id, { headers: headers })
	}

	remove_gantt_tasks(id: number): Observable<any> {
    return this.http.delete(environment.gantt_task_delete + '/' + id, { headers: headers })
	}
  // for links 
  get_gantt_tasks_links(data): Observable<any>{
		return this.http.post(environment.gantt_link_getall,data,{headers : headers})
	}
  get_gantt_tasks_linksForEstimatedSchedule(data): Observable<any>{
		return this.http.post(environment.get_gantt_linksForEstimatedSchedule,data,{headers : headers})
	}


  gantt_link_getbyId(id: number): Observable<any> {
    return this.http.get(environment.gantt_link_getbyId + '/' + id, { headers: headers })

	} 
	remove_gantt_tasks_links(id: number): Observable<any> {
    return this.http.delete(environment.gantt_link_delete + '/' + id, { headers: headers })
	}

  get_calanderOffday(): Observable<any>{
		return this.http.get(environment.get_calanderOffday,{headers : headers})
	}
  generateEstimatedScheduleFromCurrentSchedule(data):Observable<any> {
    return this.http.post(environment.generateEstimatedScheduleFromCurrentSchedule,data,{headers : headers})
	}
  deleteEstimatedSchedule(data):Observable<any> {
    return this.http.post(environment.deleteEstimatedSchedule,data,{headers : headers})
	}
  getSoldOutMaterialData(): Observable<any> {
    return this.http.get(environment.getSoldOutMaterialData, { headers: headers });
  }
  role_getById(id:any): Observable<any> {
    return this.http.get(environment.role_getById +'/'+id, { headers: headers });
  }

}
