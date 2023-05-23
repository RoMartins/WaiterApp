import {Request, Response} from 'express';
import { Product } from '../../models/Product ';

export async function createProduct(req:Request, res:Response) {
  try {
    const imagePath = req.file?.filename;
    const {name, description, price, ingredients, category} = req.body;
    console.log('chegou');

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      category,
      imagePath
    });

    res.status(201).json(product);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
