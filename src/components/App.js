import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.addFish = this
            .addFish
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

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh SeaFood Market"/>
                </div>
                <Order/>
                <Inventory addFish={this.addFish}/>
            </div>
        )
    }
}