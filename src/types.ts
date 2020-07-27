export interface ServerResponse<T> {
  data: T;
}
export type ServerErrorResponse = {
  error: string;
};
