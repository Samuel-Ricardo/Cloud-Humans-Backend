declare module '@cloud/API' {

  export interface _Response<D> {

    status: Status;
    message: string;
    error: boolean;
    data: D;

  }

}
