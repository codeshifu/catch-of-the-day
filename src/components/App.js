import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.addFish = this
            .addFish
            .bind(this);
        this.loadFishes = this
            .loadFishes
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
                            .map(key => <Fish key={key} details={this.state.fishes[key]}/>)
}
                    </ul>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} loadFishes={this.loadFishes}/>
            </div>
        )
    }
}