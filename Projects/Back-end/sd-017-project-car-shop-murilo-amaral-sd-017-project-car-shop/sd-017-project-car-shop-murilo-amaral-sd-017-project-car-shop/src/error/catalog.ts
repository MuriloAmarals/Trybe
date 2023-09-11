export enum ErroTypes {
  InvalidMongoId = 'InvalidMongoId',
  NotFound = 'NotFound',
}
  
type ObjectErrorResponse = {
  message: string,
  httpStatus: number
};
  
export type ErrorCatalog = {
  [key in ErroTypes]: ObjectErrorResponse
};
  
export const errorCatalog: ErrorCatalog = {
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  NotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
};