export class Task {
    public static data =  [
			{id: 1, text: "Project #1", start_date: null, duration: null, parent:0, progress: 0, open: 1,tag: "something"},
			{id: 2, text: "Task #1", start_date: "2021-08-01 00:00", duration:5, parent:1, progress: 1,tag: "something"},
			{id: 3, text: "Task #2", start_date: "2021-08-06 00:00", duration:2, parent:1, progress: 0.5,tag: "something"},
			{id: 4, text: "Task #3", start_date: null, duration: null, parent:1, progress: 0.8, open: 1,tag: "something"},
			{id: 5, text: "Task #3.1", start_date: "2021-07-31 00:00",end_date: "2021-08-11 00:00", duration:11, parent:4, progress: 0.2,tag: "something"},
			{id: 6, text: "Task #3.2", start_date: "2021-08-11 00:00", duration:1, parent:4, progress: 0,tag: "something"}
		]
	
}