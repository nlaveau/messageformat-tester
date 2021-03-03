export class FileParseError {
  constructor(
    public key: string,
    public message: string,
    public error: string
  ) {}
}
