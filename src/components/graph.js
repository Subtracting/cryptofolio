import React from 'react';
import {  VictoryAxis, VictoryStack, VictoryArea, VictoryVoronoiContainer } from 'victory';



// const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")

class Graph extends React.Component {
    render() {


        return (
            <VictoryStack colorScale={"grayscale"} 
            // containerComponent={
            //   <VictoryVoronoiContainer
            //     labels={({ datum }) => `${(datum.coin)}, ${(datum.x)}, ${(datum.y).toFixed(2)}`}
            //     />
            //   }
                          
            animate={{
              duration: 2000,
              onLoad: { duration: 2000 }
            }}

            height={500}
            width = {600}
            >
                <VictoryAxis
                width={500}
                height={600}
                scale={{ x: "time" }}
              />

              {
                this.props.bought.map((boughtcoin) => 
                <VictoryArea data = {(this.props.rawData).filter(a => a.coin === boughtcoin.coin)}
                // interpolation="natural"
                x = "x"
                y = "y"
                // style={{
                //   data: {stroke: "#282c34", strokeWidth: 2}
                // }}

              />)
              
              }
              
            </VictoryStack>
        )
      }
    }

export default Graph;
