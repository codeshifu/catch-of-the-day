import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {

    constructor(props) {
        super(props);

        this.renderInventory = this
            .renderInventory
            .bind(this);
    }

    handleFishValueChange(e, key) {
        const fish = this.props.fishes[key];

        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        }

        // call parent component updateFish method
        this
            .props
            .updateFish(key, updatedFish);
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                <input
                    onChange={(e) => this.handleFishValueChange(e, key)}
                    value={fish.name}
                    type="text"
                    name="name"
                    placeholder="Fish name"/>
                <input
                    onChange={(e) => this.handleFishValueChange(e, key)}
                    value={fish.price}
                    type="text"
                    name="price"
                    placeholder="Fish price"/>

                <select
                    onChange={(e) => this.handleFishValueChange(e, key)}
                    value={fish.status}
                    name="status"
                    placeholder="Fish status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea
                    onChange={(e) => this.handleFishValueChange(e, key)}
                    value={fish.desc}
                    name="desc"
                    placeholder="Fish desc"></textarea>

                <input
                    onChange={(e) => this.handleFishValueChange(e, key)}
                    value={fish.image}
                    type="text"
                    name="image"
                    placeholder="Fish image"/>

                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                <p>Inventory</p>
                {Object
                    .keys(this.props.fishes)
                    .map(this.renderInventory)
}
                <AddFishForm addFish={this.props.addFish} loadFishes={this.props.loadFishes}/>
            </div>
        )
    }
}

// props validation
Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadFishes: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    updateFish: React.PropTypes.func.isRequired
}

export default Inventory;