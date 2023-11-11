export class SetUserName {
  static readonly type = '[Settings] SetUserName';

  constructor(public userName: string) {}
}
