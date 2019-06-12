import React, { Component } from 'react';
// Actions
import { getData } from '../../utils/api';
// Component
import Item from './Item/Item';
import CreateItem from './CreateItem/CreateItem'

import Button from 'react-bootstrap/Button';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            lastClicked: null,
            creating: false,
        }
        this.updateList = this.updateList.bind(this);
        this.changeLastClicked = this.changeLastClicked.bind(this)
        this.createItem = this.createItem.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.updateList();
    }

    updateList() {
        getData('items').then((items) => this.setState({ items }));
    }

    changeLastClicked(id) {
        this.setState({ lastClicked: id })
    }

    createItem() {
        this.setState({ creating: true });
    }

    closeModal() {
        this.setState({ creating: false });
        this.updateList();
    }

    renderItems() {
        return this.state.items.map((item, i) => (
            <Item
                key={`item-${i}`}
                lastClicked={this.state.lastClicked}
                changeLastClicked={this.changeLastClicked}
                updateList={this.updateList}
                {...item}
            />
        ));
    }

    render() {
        return (
            <>
                <CreateItem show={this.state.creating} hide={this.closeModal} />
                <Button variant="primary" onClick={this.createItem}>Add new Item</Button>
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
            </>
        );
    }
}

export default List;