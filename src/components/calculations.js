import React from 'react'

let calcInvest = (coinsBought) => {
    let investSum = 0
  
    coinsBought.forEach((element, index, array) => {
      investSum += element.invest
    })
  
    return investSum.toFixed(2)
  }


let calcValue = (lastPrices, coinsBought) => {
    let investValue = 0
    if (lastPrices.length !== 0 && coinsBought !== undefined) {
      coinsBought.forEach((element, index, array) => {
        investValue += (lastPrices[lastPrices.findIndex(x => x.id === element.coin)]["current_price"] * element.amount)
      })
    }

    return investValue.toFixed(2)
    }

export {calcInvest, calcValue}

class Portfolio extends React.Component {
  render() {
    let investment = calcInvest(this.props.coinsBought)
    let portvalue = calcValue(this.props.lastPrices, this.props.coinsBought)
    let profit = (portvalue - investment).toFixed(2)
    return(
      <div>
        <h4><i>Portfolio Value</i></h4>
        <h1>${portvalue}</h1>
        <br></br>
        <br></br>
        <h4><i>Invested</i></h4>
        <h1>${investment}</h1>
        <br></br>
        <br></br>
        <h4><i>Profit</i></h4>
        <h1>${profit}</h1> 
      </div>
    )
  }
}


export default Portfolio;