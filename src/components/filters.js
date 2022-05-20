import {favorites} from './coins';

let stateSelect = (array, sortState) => {
    if (sortState === 1) {
      return array.sort((a, b) => (a.price_change_percentage_24h < b.price_change_percentage_24h) ? 1 : -1);
    }
    else if (sortState === -1) {
      return array.sort((a, b) => (a.price_change_percentage_24h > b.price_change_percentage_24h) ? 1 : -1)
    }
    else {
      return array
    }
  }
  
let favSelect = (array, favfilterState) => {
  if (favfilterState === 1) {
    return array.filter(x => 
      favorites.indexOf(x.id) !== -1)
  }
  else if ([0,-1].includes(favfilterState)) {
    return array
  }
}


export {stateSelect, favSelect}