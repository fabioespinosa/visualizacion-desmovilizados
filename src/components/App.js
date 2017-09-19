import _ from 'lodash';
import React, { Component } from 'react';
import Titulo from './Titulo/Titulo';
import Visualizacion from './visualizaciones/Visualizacion';
import Explicacion from './Explicacion/Explicacion';
import * as d3 from 'd3';
import './App.css';
import datos from '../data/desmovilizados.csv';

class App extends Component {
	state = {
		datos: [],
		filtro: false
	};

	componentWillMount() {
		d3.csv(datos, (err, datos) => {
			datos.forEach(d => {
				d.anio = +d.anio;
				d.numero_desmovilizados = +d.numero_desmovilizados;
				d.key = d.departamento + ':' + d.anio;
			});
			this.datosOriginales = datos;
			this.setState({ datos: datos });
		});
	}

	agruparPorDepartamento() {
		// this.setState({
		// 	datos: _.
		// });
	}

	cancelarFiltro = () => {
		this.setState({ datos: this.datosOriginales, filtro: false });
	};

	filtrar = anio => {
		this.setState({
			filtro: true,
			datos: this.datosOriginales
				.filter(d => d.anio === anio)
				.map(d => Object.assign(d, { key: d.departamento }))
		});
	};

	render() {
		return (
			<div className="App">
				<Titulo />
				<Visualizacion
					datos={this.state.datos}
					filtrar={this.filtrar}
					cancelarFiltro={this.cancelarFiltro}
					filtro={this.state.filtro}
					filtroOn={this.filtroOn}
				/>
				<Explicacion />
			</div>
		);
	}
}

export default App;
