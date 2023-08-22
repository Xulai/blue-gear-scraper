import 'dotenv/config';
import { stringify } from 'csv-stringify/sync';
import * as fs from 'node:fs';
import { apiToObject, objectToArray } from './gear.js';
import scrapeItems from './scrapeItems.js';

const xivApiKey = process.env.XIV_API_KEY;

const results = await scrapeItems();

const gear = apiToObject(results);

try {
    fs.writeFileSync('./output/output.csv', stringify(objectToArray(gear), {escape_formulas: false}));
    // file written successfully
  } catch (err) {
    console.error(err);
}