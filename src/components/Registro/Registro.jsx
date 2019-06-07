import React from 'react';

class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellidopaterno: '',
            apellidomaterno: ''
        }
    }

    actualizaNombre(event) {
        let datoIngresado = event.target.value;
        // ... para decir que haga una copia del objeto
        let originalState = { ...this.state };
        originalState.nombre = datoIngresado;
        this.setState(originalState);
    }

    actualizaApellidoP(event) {
        let datoIngresado = event.target.value;
        // "..." para decir que haga una copia del objeto, es lo ideal 
        // para que haga la copia de todos los componentes del objeto
        let originalState = { ...this.state };
        originalState.apellidopaterno = datoIngresado;
        this.setState(originalState);
    }

    actualizaApellidoM(event) {
        let datoIngresado = event.target.value;
        // "..." para decir que haga una copia del objeto, es lo ideal 
        // para que haga la copia de todos los componentes del objeto
        let originalState = { ...this.state };
        originalState.apellidomaterno = datoIngresado;
        this.setState(originalState);
    }

    enviar(event) {
        alert('Su informacion es:  ' + JSON.stringify(this.state))
    }

    validar(event){
        return (this.state.nombre === '' || this.state.apellidomaterno === '' || this.state.apellidopaterno === '')
    }

    render() {
        return (
            <div>
                <div> Nombre <input
                    placeholder='Ingresa tu nombre'
                    value={this.state.nombre}
                    onChange={(event) => this.actualizaNombre(event)}
                />
                </div>
                <div> Apellido Paterno <input
                    placeholder='Ingresa apellido'
                    value={this.state.apellidopaterno}
                    onChange={(event) => this.actualizaApellidoP(event)}
                />
                </div>
                <div> Apellido Materno <input
                    placeholder='Ingresa apellido'
                    value={this.state.apellidomaterno}
                    onChange={(event) => this.actualizaApellidoM(event)}
                />
                </div>
                <div> <button
                    disabled={this.state.nombre === '' || this.state.apellidomaterno === '' || this.state.apellidopaterno === ''}
                    onClick={(event) => this.enviar(event)}
                > Enviar
                    </button>
                </div>
                <div> <button
                    disabled={this.validar()}
                    onClick={(event) => this.validar(event)}
                > EnviarconFuncion
                    </button>
                </div>

            </div>
        )
    }
}

export default Registro;