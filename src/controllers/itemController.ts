import { Request, Response } from 'express';
import Item from '../models/Item';
import asyncHandler from '../middleware/asyncHandler';
import { IItem } from '../types';
import mongoose from 'mongoose';

// @desc    Get all items
// @route   GET /api/items
// @access  Public
export const getItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await Item.find();

  res.status(200).json({
    success: true,
    count: items.length,
    data: items,
  });
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
export const getItem = asyncHandler(async (req: Request, res: Response) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    throw new Error('Item not found');
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

// @desc    Create new item
// @route   POST /api/items
// @access  Public
export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const item = await Item.create(req.body as IItem);

  res.status(201).json({
    success: true,
    data: item,
  });
});

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Public
export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    throw new Error('Item not found');
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body as Partial<IItem>, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: item,
  });
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Public
export const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    throw new Error('Item not found');
  }

  await Item.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

  res.status(200).json({
    success: true,
    data: {},
  });
});
