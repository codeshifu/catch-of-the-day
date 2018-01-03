import React from 'react';
import AddFishForm from './AddFishForm'

export default class Inventory extends React.Component {
    render() {
        return (
            <div>
                <p>Inventory</p>
                <AddFishForm addFish={this.props.addFish} loadFishes={this.props.loadFishes}/>
            </div>
        )
    }
}