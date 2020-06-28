import React from 'react';
import { withRouter } from 'react-router-dom'

import Card from './../components/card';
import FormGroup from './../components/form-group';

import axios from 'axios';

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    entrar = () => {
        axios
         .post('http://localhost:8080/api/usuarios/autenticar', {
             email: this.state.email,
             senha: this.state.senha
         }).then(response => {
             localStorage.setItem('_usuario_logado', JSON.stringify(response.data));
             this.props.history.push('/home');
         }).catch(erro =>{
            this.setState({
                mensagemErro: erro.response.data
            })
        })
    }

    keyPress = (key) => {
        if(key.key === 'Enter'){
            this.entrar();
        }
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuario');
    }

    render() {
        return (
            <div className="row">
                {this.state.mensagemErro}
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }} >
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <FormGroup label="Email: *" htmlForm="exampleInputEmail1">
                                            <input type="email"
                                                value={this.state.email}
                                                onKeyDown={this.keyPress}
                                                onChange={(e) => this.setState({ email: e.target.value })}
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlForm="exampleInputPassword1">
                                            <input type="password"
                                                value={this.state.senha}
                                                onKeyDown={this.keyPress}
                                                onChange={(e) => this.setState({ senha: e.target.value })}
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Password" />
                                        </FormGroup>
                                        <button onClick={this.entrar} type="button" className="btn btn-success float-left btn-lg">Entrar</button>
                                        <button onClick={this.prepareCadastrar} type="button" className="btn btn-danger float-right btn-lg">Cadastrar</button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);