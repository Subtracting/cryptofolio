import React, {Component}  from 'react';
import Coins from './components/coins';
import Graph from './components/graph';
import Portfolio from './components/calculations';
import * as fSelect from './components/filters';
import * as click from './components/clicks';
import CoinTable from './components/cointable'


import "./styling/App.css"; 
import logo from './logoclean.png'

import Queue from "queue-promise";

const queue = new Queue({
  concurrent: 1,
  interval: 2000
});

async function oneCoinPost (data) {
    await fetch("http://localhost:5000/data", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
  })
    .then(res => { return res.json() })
}

const postCoins = (coinsBought, coins, priceData) => {
  if ((coins.length !== 0) && (priceData !== [])) {

      var date = new Date().toLocaleString()
      var unix = new Date().getTime()
    
      var last_price = 0
      var coin = "x"
      var ind = 0

      console.log(coinsBought)
    
      coinsBought.forEach((element, index, array) => {
        
        coin = element.coin
        ind = coins.findIndex(x => x.id === element.coin)
        last_price = coins[ind].current_price

        // if (!(priceData.some(e => e.price === last_price))) {
    
        var amount = element.amount
        var value = last_price * amount
        var invested = element.invest
  
        let data = {"date": date, "unix": unix, "coin": coin, "price": last_price, "value": value, "amount": amount, "invested": invested}
        queue.enqueue(() => oneCoinPost(data))
        // }
      })
    }
      
    }

let formatData = (rawData, coinsBought) => {
    console.log("raw ", rawData)
    let result = []
    coinsBought.forEach((element, index, array) => {
          
      let coin = element.coin
      var data = rawData.filter(function(val, i, a) { return val.coin === coin })
      const keys_to_keep = ['coin', 'unix', 'value'];
      const picked = list => list.map(o => Object.fromEntries(keys_to_keep.map(k => [k, o[k]])))
  
      const renamed = picked(data).map(({coin, unix: x, value: y}) => ({coin, x, y}))

      result = result.concat(renamed)
    })

    console.log("format data :", result)

    return result
  }

class App extends Component {

  constructor() {
    super();

    this.state = {
      coins: [],
      priceData: [],
      inputState: '',
      sortState: 0,
      favfilterState: 0,
      lastPrices: [],
      currencyState: 'usd',
      coinsBought: [],
      formatData: []
      }

      this.getPrice = this.getPrice.bind(this)
    }
  
    componentDidMount() {
      this.getBought()
      this.getPrice(0)
      this.postPrice(0)
      this.interval = setInterval(() => {this.getCoins()}, 1000)
    }
  
    componentWillUnmount() {
      clearInterval(this.interval)
    }

  getBought = async () => {
      await fetch("http://localhost:5000/coinsBought")
            .then(res => res.json())
            .then(res => {
              console.log("coinsBought get " + new Date())
              this.setState({coinsBought : res})
              console.log(this.state.coinsBought)})
        }

  buyCoin = async (coin, invest, lastPrices) => {
      let amount = (invest / lastPrices[lastPrices.findIndex(x => x.id === coin)]["current_price"]).toFixed(4)
      let put_object = {"coin": coin, "amount": amount, "invest": invest}

      await fetch("http://localhost:5000/coinsBought", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(put_object)
            })
            .then(res => {
              res.json()
              this.setState({ coinsBought: [...this.state.coinsBought, put_object ] })
              this.getPrice(1) 
              this.postPrice(1)
            })
  }

  // if already exists in this.state.coinsbought, get id/index in this.state.coinsBought, then PUT, else POST
  // FormatData for graph in state

      
  getPrice = async (once) => {
    try {
      await fetch("http://localhost:5000/data")
            .then(res => res.json())
            .then(res => {
              console.log("get fulfilled " + new Date())
              this.setState({priceData : res})})
              this.setState({formatData: formatData(this.state.priceData, this.state.coinsBought)})
        }
    catch(error) {
            console.log(error)
        }
    finally {
          if (once !== 1) {
            setTimeout(this.getPrice, 5*60000);
          }
        }
    }
  
  postPrice = (once) => {
    try {
        postCoins(this.state.coinsBought, this.state.coins, this.state.priceData)
        console.log("post fulfilled " + new Date())
        }
    catch (error) {
      console.log(error)
        }
    finally {
      if (once !== 1) {
        setTimeout(this.postPrice, 5*60000)
          }
      }
  }


  getCoins() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + this.state.currencyState + "&order=market_cap_desc&per_page=150")
    .then(response => response.json())
    .then((data) => {
      this.setState({ coins: fSelect.favSelect(fSelect.stateSelect(data.filter(x => x.id.match(this.state.inputState)), this.state.sortState), this.state.favfilterState)})
      this.setState({ lastPrices : data})
    })
    .catch(console.log)  
  }

  render () {
      return (
      <div>
        <div className ="App-header">
          <center><h2><img src={logo} height="150px" alt="header-logo"/><i>cryptofolio</i></h2></center>
          <br></br>
        </div>

        <div className="div1">

          {/* sort button*/}
          <div>
            <button type="button" className="btn btn-dark btn-lg" onClick={() => this.setState({ sortState: click.sortClick(this.state.sortState)}) }>
            Sort coins
            </button>

            {/* fav button*/}
            <button type="button" className="btn btn-dark btn-lg" onClick={() => this.setState({ favfilterState: click.favClick(this.state.favfilterState)})}>
            Favorite coins
            </button>

            {/* buy button*/}
            <button type="button" className="btn btn-dark btn-lg" onClick={() => this.buyCoin("bitcoin", 1000, this.state.lastPrices)}>
            Buy coin
            </button>


            {/* search form */}
            <div className="form">
              <form>
                <input
                  type="text"
                  placeholder="Search..."
                  value={this.state.inputState}
                  onChange={e => {
                      this.setState({ inputState: e.target.value });
                      this.value = this.state.inputState;}}
                      />
              </form>
            </div>
          </div>
          
          <div>
            {/* coin grid */}          
            <br></br>
            <Coins coins={this.state.coins}/>
          </div>
          
        </div>

        <div className="div2">
          <br></br>        
          <br></br>       

          <div className="div1" key="graph">
            <div>
              <Graph rawData = {this.state.formatData} bought = {this.state.coinsBought}/>
            </div>
          </div>

          <div className="div2" align="center">
            <Portfolio lastPrices = {this.state.lastPrices} coinsBought = {this.state.coinsBought} />        
          </div>   

          <div className="table">
            <CoinTable prices = {this.state.lastPrices}/>
          </div>
          
        </div>

      </div>
    )
  }
}

export default App;