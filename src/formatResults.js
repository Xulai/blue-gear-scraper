import { map } from 'ramda';

const formatWeapon = map(r => r);

const formatFood = map(r => r);
const formatMateria = map(r => r);
const formatPotion = map(r => r);

export {formatWeapon, formatGear, formatFood, formatMateria, formatPotion};