interface ResponseData {
  success: boolean;
  code: number;
  message: string;
  data: unknown;
}

const responseHandler = (
  success: boolean,
  code = 400,
  message = 'valid',
  data: unknown,
): ResponseData => ({
  success,
  code,
  message,
  data,
});

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: Function,
) => Promise<void>;

const asyncHandler = (fn: AsyncRequestHandler): AsyncRequestHandler => (
  req,
  res,
  next,
) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.log(error);
    responseHandler(false, 500, 'Something went wrong', null);
  });

export { responseHandler, asyncHandler };
