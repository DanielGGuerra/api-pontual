export class PaginatedResponse<T> {
  public total: number;
  public data: T[];

  constructor(data: T[], total: number) {
    this.total = total;
    this.data = data;
  }
}
