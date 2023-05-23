import {Request, Response} from 'express';

import { Category} from '../../models/Category';

export async function deleteCategory(req:Request, res:Response) {

  try {
    const {CategoryId} = req.params;

    await Category.findByIdAndDelete(CategoryId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
