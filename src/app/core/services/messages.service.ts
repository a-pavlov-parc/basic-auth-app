import { Injectable } from '@angular/core';
import { remove } from 'lodash';

import { Message } from '../components/messages/message.model';
import { IsDestroyedMixin } from '../../shared/mixins/is-destroyed.mixin';

@Injectable()
export class MessagesService extends IsDestroyedMixin {
    readonly timeout = 15;

    messages: Array<Message> = [];

    constructor() {
        super();
    }

    showMessage(
        text: string,
        type: 'SUCCESS' | 'INFO' | 'WARNING' | 'DANGER' = 'SUCCESS'
    ): Message {
        const message = new Message();
        message.text = text;
        message.type = type;

        this.messages.push(message);

        message.showForSeconds(this.timeout).subscribe(() => {
            remove(this.messages, { removed: true });
        });

        return message;
    }

    removeMessage(message: Message) {
        message.removeFadeOut().subscribe(() => {
            remove(this.messages, { removed: true });
        });
    }
}
