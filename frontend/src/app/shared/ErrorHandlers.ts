export class UserRequestsErrors {
  errorNumber: number;
  message: string;
  friendlyMessage: string;
  constructor(errorNumber, message, friendlyMessage) {
    this.errorNumber = errorNumber;
    this.message = message;
    this.friendlyMessage = friendlyMessage;
  }
}
