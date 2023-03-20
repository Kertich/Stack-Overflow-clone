import { Request, Response } from 'express';
import { responseHandler, asyncHandler } from '../helpers/handlers';
import { tagsService } from '../services';

export const getTags = asyncHandler(async (req: Request, res: Response) => {
  try {
    await tagsService.retrieveAll((err, data) => {
      if (err) {
        console.log(err);
        return res.status(err).json(err);
      }
      return res.status(data).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

export const getSingleTag = asyncHandler(async (req: Request, res: Response) => {
  try {
    await tagsService.retrieveOne(req.params.tagname, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});
