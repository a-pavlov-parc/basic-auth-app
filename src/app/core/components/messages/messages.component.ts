import { Component } from '@angular/core';

import { Message } from './message.model';
import { MessagesService } from '../../services/messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.scss']
})
export class MessagesComponent {
    constructor(private messagesService: MessagesService) {}

    remove(message: Message) {
        this.messagesService.removeMessage(message);
    }

    get messages() {
        return this.messagesService.messages;
    }
}
