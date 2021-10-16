import { Publisher, ExpirationCompleteEvent, Subjects } from '@ly-common-lib/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}