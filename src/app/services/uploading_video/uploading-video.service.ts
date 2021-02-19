import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadingVideoService {

  vimeoObsShare: Observable<string>;
  vimeoResult: string;

  private vimeoLink = new BehaviorSubject('');
  vimeoLinkObs = this.vimeoLink.asObservable();

  constructor(private http: HttpClient) { }

  updateVimeoLink(val) {
    this.vimeoLink.next(val);
  }

  createVimeo(options, fileSize): Observable<any> {
    const initHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + options.token,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4',
      }
    );

    const initBody = {
      'upload': {
        'approach': 'tus',
        'size': fileSize
      },
      "privacy": {
        "embed": "private"       // public for public video
      },
      'name': options.videoName,
      'description': options.videoDescription
    };
    
    if (this.vimeoResult) {
      return new Observable<any>(observer => {
        observer.next(this.vimeoResult);
        observer.complete();
      });
    } else if (this.vimeoObsShare) {
      return this.vimeoObsShare;
    } else {
      return this.http.post(options.url, initBody, { headers: initHeaders });
    }
  }

  vimeoUpload(url, file: File): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Tus-Resumable': '1.0.0',
      'Upload-Offset': '0',
      'Content-Type': 'application/offset+octet-stream',
      'Accept': 'application/vnd.vimeo.*+json;version=3.4'
    });

    const params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
      headers: headers
    };

    const req = new HttpRequest('PATCH', url, file, options);
    return this.http.request(req);
  }

  vimeoDelete(url): Observable<HttpEvent<any>> {
    const token = '2f72e3f8d1269d8f11c1387e272ef3d5';
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const options = { headers: headers };

    // https://api.vimeo.com/videos/{video_id}

    const req = new HttpRequest('DELETE', url, undefined, options);
    return this.http.request(req);
  }
}
