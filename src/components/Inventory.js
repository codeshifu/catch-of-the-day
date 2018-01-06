import React, {Component, PropTypes} from 'react';
import AddFishForm from './AddFishForm'
import base from "../base";

class Inventory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: null,
            owner: null
        }

        // render inventory
        this.renderInventory = this
            .renderInventory
            .bind(this);

        // oauth login
        this.authenticate = this
            .authenticate
            .bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
    }


    componentDidMount () {
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, {user})
            }
        })
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

    authHandler (err, authData) {
        if (err) throw err;

        console.log(authData);
        const storeRef = base.database().ref(this.props.storeId);
        
        storeRef.once('value', snapshot => {
            const dbData = snapshot.val() || {};
            const uid = authData.user.uid;

            // claim store if no owner
            if (!dbData.owner) {
                storeRef.set({
                    owner: uid
                });
            }

            this.setState({
                uid,
                owner: dbData.owner || uid
            })

        })
    }

    authenticate(provider) {
        console.log(provider);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    logout () {
        base.unauth();
        this.setState({uid: null});
    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In With Github</button>
            </nav>
        )
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
        const logout = <button onClick={this.logout}>Log Out</button>;

        // show login button if not logged in
        if (!this.state.uid) 
            return this.renderLogin();

        // check if logged in user is not owner of current store
        if (this.state.uid && this.state.owner !== this.state.uid) {
            return (
                <div>
                    <p>Sorry you aren't the owner of this store!</p>
                    {logout}
                </div>
            )
        }
        return (
            <div>
                <p>Inventory</p>
                {logout}
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
    storeId: PropTypes.string.isRequired,
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    loadFishes: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired
}

export default Inventory;