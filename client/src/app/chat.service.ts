import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class ChatService {
	private url = 'http://localhost:8000';
    private socket;    

	constructor(public http:HttpClient) { 
	 	this.socket = io(this.url);
	}

	public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
}
