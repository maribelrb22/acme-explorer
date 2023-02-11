'use strict'

import FinderModel from '../models/FinderModel.js';

const finderTrip = async (req, res) => {
    const keyword = req.query.keyword || null;
    const minPrice = req.query.minPrice || null;
    const maxPrice = req.query.maxPrice || null;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
  
    let query = {};
  
    if (keyword) {
      query.$or = [
        { ticker: { $regex: keyword, $options: "i" } },
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }
  
    if (minPrice) {
      query.price = { $gte: minPrice };
    }
  
    if (maxPrice) {
      if (!query.price) {
        query.price = {};
      }
  
      query.price.$lte = maxPrice;
    }
  
    if (startDate) {
      query.date = { $gte: startDate };
    }
  
    if (endDate) {
      if (!query.date) {
        query.date = {};
      }
  
      query.date.$lte = endDate;
    }
  
    const trips = await FinderModel.find(query);
  
    res.json(trips);
  }