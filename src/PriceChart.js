import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class PriceChart extends Component {
    
    constructor(props) {
        super(props);
        this.MAXCOUNT = 30;
        this.state = {ticks: new Array(this.MAXCOUNT).keys(), prices: [], count: 0};
        this.updatePrice = this.updatePrice.bind(this);
        this.iexSource = new EventSource(`https://cloud-sse.iexapis.com/stable/stocksUS${this.props.interval}Second?token=sk_f11fd481512c48f0bad599b70b4d9dbb&symbols=${this.props.ticker}`);
    }

    componentDidMount() {
        this.iexSource.onmessage = e =>
        this.updatePrice(JSON.parse(e.data)[0]);  
    }

    updatePrice(msg) {
        console.log(`Updated: ${msg.latestUpdate}  Price: ${msg.latestPrice}`)
        let count = this.state.count;
        let newPrices = [];
        if (count < this.MAXCOUNT) {
            newPrices = this.state.prices.slice(0);
            newPrices.push(msg.latestPrice);
            count += 1;
        } else {
            newPrices = this.state.prices.slice(1);
            newPrices.push(msg.latestPrice)
        }
        this.setState((state,props)=>({
            prices: newPrices,
            count: count
        }));
    }

    render() {
        return (
            <Plot
            data={[
              {
                x: this.state.ticks,
                y: this.state.prices,
                type: 'scatter',
                mode: 'lines+points',
                marker: {color: this.props.color},
              },
            ]}
            layout={{width: 600, height: 400, title: this.props.chartTitle,
            xaxis: { ticks: '', range: [0,this.MAXCOUNT]}}}
            config={{staticPlot: true, displayModeBar: false}}
          />
        );
    }
}

export default PriceChart;
