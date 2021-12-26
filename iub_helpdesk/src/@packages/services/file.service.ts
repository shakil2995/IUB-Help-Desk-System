import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const headers = new HttpHeaders();

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(
        private http: HttpClient
    ) { }

    uploadFile(fileData: any): Observable<any> {
        const fileAsformData = new FormData();
        Object.keys(fileData).forEach((key) => {
            fileAsformData.append(key, fileData[key]);
        });
        return this.http.post<any>(environment.pictureUploadApi, fileAsformData, { headers: headers });
    }
    uploadPictureFile(fileData: any): Observable<any> {
        const fileAsformData = new FormData();
       
        fileAsformData.append('pictures',fileData);
        
        return this.http.post<any>(environment.pictureUploadApi, fileAsformData, { headers: headers });
    }
}
