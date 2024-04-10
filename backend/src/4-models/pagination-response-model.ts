import { paginationRequestProp } from "./pagination-request-model";

export interface PaginationResponseModel extends paginationRequestProp {
  total: number;
  data: object[];
}
