import { Request, Response } from 'express';
import address from '../config/address';
import knex from '../database/connection';

class ItemsController {
    // Get list of collectable waste types
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');
        const serverAddress = address.getAddress();
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://${serverAddress}:3333/assets/items/${item.image}`
            };
        });
    
        return response.json(serializedItems);
    }
}

export default ItemsController;
