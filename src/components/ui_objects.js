import React from 'react'

class UIobjects extends React.Component {
  render() {
      return (
         <div>
          <button type="button" className="btn btn-dark btn-lg" onClick={() => this.setState({ sortState: click.sortClick(this.state.sortState)}) }>
          Sort coins
          </button>

          <button type="button" className="btn btn-dark btn-lg" onClick={() => this.setState({ favfilterState: click.favClick(this.state.favfilterState)})}>
          Favorite coins
          </button>

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
      )
  }
}

export default UIobjects