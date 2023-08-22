import { cond, either, equals, T, omit, pipe, prop, sortBy, toPairs, always } from 'ramda';

export const statToAbrv = cond([
    [equals('Intelligence'), always('INT')],
    [equals('Mind'), always('MND')],
    [equals('Strength'), always('STR')],
    [equals('Dexterity'), always('DEX')],
    [equals('Vitality'), always('VIT')],
    [equals('CriticalHit'), always('CRIT')],
    [either(equals('DirectHitRate'), equals('DirectHit')), always('DH')],
    [equals('Determination'), always('DET')],
    [equals('SpellSpeed'), always('SPS')],
    [T, always(null)]
]);

export const getStatValue = stat => stat?.HQ || stat?.NQ || 0;
export const hasStat = (stat, stats) => stats[stat]?.NQ > 0;

export const getSubStats = omit(['Intelligence', 'Mind', 'Strength', 'Dexterity', 'Vitality']);

export const getSortedSubStats = stats => {
    let subStats = toPairs(getSubStats(stats));
    if (!subStats)
        return [];
    subStats = sortBy(prop('0'), subStats);
    subStats = sortBy(pipe(prop('1'), prop('NQ')), subStats);
    return subStats;
};

export const getStatA = stats => getSortedSubStats(stats)?.[0];
export const getStatAAbrv = stats => statToAbrv(getStatA(stats)?.[0]);

export const getStatB = stats => getSortedSubStats(stats)?.[1];
export const getStatBAbrv = stats => statToAbrv(getStatB(stats)?.[0]);

export const getSymbol = stats => {
    let symbol = '>';
    const statA = getStatA(stats);
    const statB = getStatB(stats);

    if (getStatValue(statA?.[1]) == getStatValue(statB?.[1]))
        symbol = '=';

    return symbol;
};