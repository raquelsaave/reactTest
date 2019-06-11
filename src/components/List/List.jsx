import React, {Component} from 'react';
// Component
import Item from './Item/Item'
// Actions
import { getData } from '../../utils/api';

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            lastClicked: null,
        }
        this.changeLastClicked = this.changeLastClicked.bind(this)
    }

    componentDidMount() {
        getData('items').then((items) => this.setState({items}));
    }

    changeLastClicked(id){
        this.setState({lastClicked: id})
    }

    renderItems() {
        return this.state.items.map((item,i) => (
            <Item 
                key={`item-${i}`} 
                lastClicked={this.state.lastClicked}
                changeLastClicked={this.changeLastClicked}
                {...item}
            />
         ));
    }

    render() {
        return (
            <table className="list">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th>Clicked</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        );
    }
}

export default List;