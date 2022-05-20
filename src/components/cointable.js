import React from 'react'
import coinData from '../db.json'
import "../styling/App.css"; 


class CoinTable extends React.Component {
    render() {
        const DisplayData = coinData.coinsBought.map(
            (coins) => {
                if (this.props.prices.length !== 0) {
                    const coinprice = this.props.prices[this.props.prices.findIndex(x => x.id === coins.coin)]["current_price"] ?? 0
                    const pricechange_24 = this.props.prices[this.props.prices.findIndex(x => x.id === coins.coin)]["price_change_percentage_24h"].toFixed(2) ?? 0
                    const value = (coinprice * coins.amount).toFixed(2)
                    const profit = (value - coins.invest).toFixed(2)
                    return(                    
                        <tr key={coins.coin}>
                            <td>{coins.coin}</td>
                            <td>${coinprice}</td>
                            <td>{coins.amount}</td>
                            <td>${coins.invest}</td>
                            <td>${value}</td>
                            <td>{pricechange_24}%</td>
                            <td>${profit}</td>
                        </tr>
                    )
                }   
                else {
                    return 0
                }
            }
        )

    return(
        <div>
            <table className="custom_class">
                <thead>
                    <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Owned</th>
                    <th>Invested</th>
                    <th>Current Value</th>
                    <th>Change</th>
                    <th>Profit</th>
                    </tr>
                </thead>
                <tbody>{DisplayData}</tbody>
            </table>
        </div>
    )
}
}

  
 export default CoinTable;