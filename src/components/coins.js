import React from 'react';
import "../styling/coins.css"; 

let favorites = []

let favoriteCoin = (coin) => {
  if (!(favorites.includes(coin))) {
    favorites.push(coin)
  }
  else {
    favorites = favorites.filter(e => e !== coin)
  }
  return favorites
}
export {favorites}

let favCheck = (coin) => {
  if (favorites.includes(coin)) {
    return "fav"
  }
  else {
    return "zoom-box"
  }
}

const Coins = ({ coins }) => {

  return (
    <div>
      {coins.map((coins) => (
        <div className="grid-container" key={coins.id}>
          <div className={favCheck(coins.id)} onClick={() => {favoriteCoin(coins.id)}}>
            <div className="grid-item">
                <h5>{coins.name}</h5>
                <h6 style={{color:"#bdc9db"}}>${coins.current_price}</h6>
                <h6 style={{color:"rgb(205, 204, 211, 0.7)"}}>{(coins.price_change_percentage_24h).toFixed(2)}%</h6>
                <img className="img-responsive" src={coins.image} width="110" height="110" alt={coins.id}></img>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Coins  