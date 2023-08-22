import got from 'got';
import { join, concat } from 'ramda';
import * as fs from 'node:fs';

const scrapeItems = async () => {
    const filters = [
        'ClassJobCategory.BLU=1',
        'EquipSlotCategory.Legs=1',
        'Stats.Intelligence.NQ>0',
    ];

    let results = [];
    for (let page = 1;;page++) {
        const data = await got.get(
            'https://xivapi.com/search',
            {
                searchParams: {
                    indexes: 'item',
                    filters:  filters ? join(',', filters) : undefined,
                    columns: '*',
                    page
                }
            }
        ).json();

        if (!data || !data.Results) {
            console.error('Response was empty');
            break;
        }

        results = concat(results, data.Results);

        if (!data.Pagination.PageNext) {
            break;
        }
    }

    return results;
};

export default scrapeItems;