import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CalendarFakeDb } from '@packages/fake-database/calendar';
import { CalendarTable } from '@packages/fake-database/sqlcalendertable';
import { Task } from '@packages/fake-database/task';
import { TaskLink } from '@packages/fake-database/task_link';


export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Calendar
            'calendar': CalendarFakeDb.data,
            'event_talbe' : CalendarTable.data,
            'tasks' : Task.data,
            'links' : TaskLink.data
        };
    }
}
