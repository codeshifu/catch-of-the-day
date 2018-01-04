import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        // add a fish
        this.addFish = this
            .addFish
            .bind(this);
        // load sample fishes
        this.loadFishes = this
            .loadFishes
            .bind(this);
        // add fish to order
        this.addToOrder = this
            .addToOrder
            .bind(this);
        this.state = {
            fishes: {},
            order: {}
        }
    }

    addFish(fish) {
        const fishes = {
            ...this.state.fishes
        };
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;

        // notify state
        this.setState({fishes})
    }
    addToOrder(key) {
        const order = {
            ...this.state.order
        };
        order[key] = order[key] + 1 || 1;
        this.setState({order})
    }
    loadFishes() {
        this.setState({fishes: sampleFishes})
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh SeaFood Market"/>
                    <ul className="list-of-fishes">
                        {Object
                            .keys(this.state.fishes)
                            .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
}
                    </ul>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} loadFishes={this.loadFishes}/>
            </div>
        )
    }
}