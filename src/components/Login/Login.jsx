import React from 'react';
import { ENGINE_METHOD_DIGESTS } from 'constants';

// CON FUNCION NORMAL

/*
function Login(props) {
  return (
    <div>
      {props.name}
    </div>
  );
}
*/

// EJEMPLO DE LO MISMO CON ARROW FUNCTION

/*  
const Login = (props) => {
    return (
        <div>
            {props.name}
        </div>
    );
}
*/

// LO MISMO CON DECONSTRUCTING Y ARROW FUNCTION

/*
const Login = ({ name }) => (
    <div>
        {name}
    </div>
);
*/

// LO MISMO CON CLASE Y HERENCIA 

class Login extends React.Component {
    // props es externo
    constructor(props) {
        super(props);
        //Declarar estado
        this.state = {
            clicked: false, 
            name: this.props.name,
        };
        // bind  =  crea una nueva función que lo amarra al componente que estoy usando
        this.changeClicked = this.changeClicked.bind(this);
    }

    // DOM
    // state es interno
    changeClicked(event) {
        console.log(event.target);
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return (
            <div onClick={this.changeClicked}>
                {this.state.name}
                <br />
                {this.state.clicked.toString()}
            </div>
        )
    }
}

export default Login;