import React from 'react';
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
    gotoStore (e) {
        e.preventDefault();
        let inputValue = this.storeInput.value;
        
        const router = this.context.router;
        router.transitionTo(`/store/${inputValue}`)
    }
    render() {
        return (
            <form className="store-selector" onSubmit={(e) => this.gotoStore(e)}>
                <h2>Please Enter A Store</h2>
                <input
                    ref={(input) => {this.storeInput = input}}
                    type="text"
                    name="store-name"
                    id="store-name"
                    required="required"
                    placeholder="store name"
                    defaultValue={getFunName()}/>
                <button type="submit">Visit Store ➡️</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}
export default StorePicker;