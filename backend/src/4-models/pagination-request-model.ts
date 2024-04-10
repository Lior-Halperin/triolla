export interface paginationRequestProp {
  per_page: string | number;
  page: string | number;
}

class PaginationRequestModel {
  limit: number;
  skip: number;

  constructor(prop: paginationRequestProp) {
    this.limit = prop.per_page ? parseInt(prop.per_page as string, 10) : 10; // parseInt(string, Decimal system)
    this.skip = prop.page
      ? (parseInt(prop.page as string, 10) - 1) * this.limit
      : 0;

    // Ensure the calculated skip and limit values are not negative
    this.skip = this.skip < 0 ? 0 : this.skip;
    this.limit = this.limit < 1 ? 10 : this.limit;
  }
}

export default PaginationRequestModel;