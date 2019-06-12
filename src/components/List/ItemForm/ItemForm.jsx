import React, {Component} from 'react';

//Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class ItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.data.name || '',
            description: props.data.description || '',
            value: props.data.value || 0,
        };

        this.updateName = this.updateName.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }
    
    updateName({ target }) {
        this.setState({ name: target.value });
    }

    updateDescription({ target }) {
        this.setState({ description: target.value });
    }

    updateValue({ target }) {
        this.setState({ value: Number(target.value) });
    }

    render(){
        return(
            <Form>
                <Form.Group>
                    <Form.Label> Name </Form.Label>
                    <Form.Control
                        type="text"
                        palceholder="Item Name"
                        value={this.state.name}
                        onChange={this.updateName}
                    />
                    <Form.Label> Description </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        value={this.state.description}
                        onChange={this.updateDescription}
                    />
                    <Form.Label> Value </Form.Label>
                    <Form.Control
                        type="number"
                        min="0"
                        placeholder="value"
                        value={this.state.value}
                        onChange={this.updateValue}
                    />
                    <Button variant="primary" onClick={() => this.props.submit({...this.state})}> Save </Button>
                </Form.Group>
            </Form>
        )
    }
}
export default ItemForm;