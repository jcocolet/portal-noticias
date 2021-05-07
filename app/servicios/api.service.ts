import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Constants } from '../utiles/constants';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
  })
export class ApiService {

	url: string;
	public valor: string;

	constructor(private http: HttpClient, private c: Constants) {
    this.url = c.URL;
		console.log(this.url);
  }
	get(endpoint: string, params?: any) {
		return this.http.get(this.url + endpoint, {observe: 'response'}).pipe(catchError(this.handleError));
	}

	post(endpoint: string, body: any) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		 });
		 let options = {
			headers: headers
		 }
		 console.info("SERVICIO:" + this.url + endpoint);
		 console.info("REQUEST:" + body);
		 console.info("HEADER:" + options);
		return this.http.post(this.url + endpoint, body,options).pipe(catchError(this.handleError));
	}

	put(endpoint: string, body: any) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		 });
		 let options = {
			headers: headers
		 }
		return this.http.put(this.url + endpoint, body, options).pipe(catchError(this.handleError));
	}

	delete(endpoint: string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		 });
		 let options = {
			headers: headers
		 }
		return this.http.delete(this.url + endpoint, options).pipe(catchError(this.handleError));
	}

	patch(endpoint: string, body: any) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		 });
		 let options = {
			headers: headers
		 }
		return this.http.patch(this.url + endpoint, body, options).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
