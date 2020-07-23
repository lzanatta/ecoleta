import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Lamps/light bulbs', image: 'lightbulb.svg'},
        { title: 'Cells and batteries', image: 'battery.svg'},
        { title: 'Paper and cardboard', image: 'paper.svg'},
        { title: 'Electronic waste', image: 'electronic.svg'},
        { title: 'Organic residues', image: 'organic.svg'},
        { title: 'Kitchen oil', image: 'oil.svg'}
    ])
}
