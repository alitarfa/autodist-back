export class UserException extends Error {

  private status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'UserException';
    this.status = status;
  }
}
