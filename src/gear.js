import { map } from 'ramda';
import { getStatValue, getStatAAbrv, getStatBAbrv, getSymbol } from './stat.js';

// Name, Icon, Level, Item Level, Int, Vit, Crit, DH, Det, SpS,	Substat Max, Stat A, Stat B, Symbol, Melds, Strong Melds, Lower Substat, Defense, Magic Defense
const apiToObject = map(
    r => ({
        Name: r.Name,
        Icon: `=IMAGE("https://xivapi.com${r.Icon}")`,
        Level: r.LevelEquip,
        ItemLevel: r.LevelItem,
        Intelligence: getStatValue(r.Stats.Intelligence),
        Vitality: getStatValue(r.Stats.Vitality),
        CriticalHit: getStatValue(r.Stats.CriticalHit),
        DirectHitRate: getStatValue(r.Stats.DirectHit),
        Determination: getStatValue(r.Stats.Determination),
        SpellSpeed: getStatValue(r.Stats.SpellSpeed),
        StatA: getStatAAbrv(r.Stats),
        StatB: getStatBAbrv(r.Stats),
        Symbol: `="${getSymbol(r.Stats)}"`,
        Melds: r?.IsAdvancedMeldingPermitted
            ? 5
            : r.MateriaSlotCount || 0,
        StrongMelds: r?.IsAdvancedMeldingPermitted
            ? (r.MateriaSlotCount || 0) + 1
            : r.MateriaSlotCount || 0,
        LowerSubstat: 'FORMULANEEDED',
        Defense: r.DefensePhys || 0,
        MagicDefense: r.DefenseMag || 0,
    })
);

const objectToArray = map(
    r => [
        r.Name, r.Icon, r.Level, r.ItemLevel, r.Intelligence, r.Vitality,
        r.CriticalHit, r.DirectHitRate, r.Determination, r.SpellSpeed,
        r.SubstatMax, r.StatA, r.StatB, r.Symbol, r.Melds, r.StrongMelds,
        r.LowerSubtat, r.Def, r.MagicDef
    ]
);

export { apiToObject, objectToArray };