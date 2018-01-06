import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import base from '../base'

import sampleFishes from '../sample-fishes'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        // initial app state(s)
        this.state = {
            fishes: {},
            order: {}
        }

        // add a fish
        this.addFish = this
            .addFish
            .bind(this);

        // load sample fishes
        this.loadFishes = this
            .loadFishes
            .bind(this);

        // update a fish
        this.updateFish = this
            .updateFish
            .bind(this);

        // delete a fish
        this.removeFish = this
            .removeFish
            .bind(this);

        // add fish to order
        this.addToOrder = this
            .addToOrder
            .bind(this);
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        const localStoreRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if (localStoreRef) {
            this.setState({
                order: JSON.parse(localStoreRef)
            })
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        if (localStorage) {
            localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
        }
    }

    // add a fish
    addFish(fish) {
        const fishes = {
            ...this.state.fishes
        };

        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;

        // notify state
        this.setState({fishes})
    }

    updateFish(key, updatedFish) {
        const fishes = {
            ...this.state.fishes
        };

        fishes[key] = updatedFish;

        this.setState({fishes})
    }

    removeFish(key) {
        const fishes = {
            ...this.state.fishes
        };
        // set state to null (cos of firebase)
        fishes[key] = null;

        this.setState({fishes});
    }
    // place an order for a fish
    addToOrder(key) {
        const order = {
            ...this.state.order
        };

        order[key] = order[key] + 1 || 1;

        this.setState({order})
    }

    // load saved fishes from firebase db if available
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
                            .map(key => <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}/>)
}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}/>
                <Inventory
                    fishes={this.state.fishes}
                    addFish={this.addFish}
                    loadFishes={this.loadFishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}/>
            </div>
        )
    }
}