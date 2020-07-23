import { Request, Response } from 'express';
import address from '../config/address';
import knex from '../database/connection';

class PointsController {
  // Create new waste collection point
  async create(request: Request, response: Response) {
    // Get request body
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;
    
    // Set transaction
    const trx = await knex.transaction();
    
    const point = {
        image: request.file.filename,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    };

    // Insert new point
    const insertedIds = await trx('points').insert(point);

    // Set items for the new point
    const point_id = insertedIds[0];
    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
            item_id,
            point_id: point_id
        };
    });
    
    // Insert items
    await trx('points_items').insert(pointItems);
    
    // Commit transaction
    await trx.commit();

    return response.json({
        id: point_id,
        ...point
    });
  }

  // Get waste collection point
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const serverAddress = address.getAddress();

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json( { message: 'Point not found' });
    }
    
    const items = await knex('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', id).select('items.title');

    const serializedPoint = {
      ...point,
      image_url: `http://${serverAddress}:3333/uploads/${point.image}`
    };

    return response.json({ point: serializedPoint, items });
  }

  // Get list of waste collection points
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;
    const serverAddress = address.getAddress();

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('points_items', 'points.id', '=', 'points_items.point_id')
      .whereIn('points_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://${serverAddress}:3333/uploads/${point.image}`
      };
    });
    
    return response.json(serializedPoints);
  }
}

export default PointsController;
