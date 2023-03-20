import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseHandler, asyncHandler } from '../helpers/handlers';
import { postsService } from '../services';

interface Post {
  title: string;
  body: string;
  userId: number;
  tagName: string;
}

const Post = (post: any): Post => ({
  title: post.title,
  body: post.body,
  userId: post.userId,
  tagName: post.tagName,
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  try {
    await postsService.retrieveAll((err: any, data: any) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }

      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(true, 500, 'Server Error', null));
  }
});

export const getTagPosts = asyncHandler(async (req: Request, res: Response) => {
  const tagName = req.params.tagname;

  try {
    await postsService.retrieveAllTag(
      tagName,
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(true, 500, 'Server Error', null));
  }
});

export const getSinglePost = asyncHandler(async (req: Request, res: Response) => {
  try {
    await postsService.retrieveOne(req.params.id, (err: any, data: any) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
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

export const addPost = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseHandler(false, 400, errors.array()[0].msg, null));
  }
  try {
    const post = Post({
      title: req.body.title,
      body: req.body.body,
      userId: req.user.id,
      tagName: req.body.tagname,
    });
    // Save Post in the database
    await postsService.create(post, (err: any, data: any) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
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

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  try {
    await postsService.remove(req.params.id, (err: any, data: any) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
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




