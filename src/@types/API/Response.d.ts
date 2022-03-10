declare module '@cloud/API' {

  export interface _Response<D> {

    status: number;
    message: string;
    error: boolean;
    data: D;

  }

}
