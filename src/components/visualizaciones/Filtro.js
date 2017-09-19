import React, { Component } from 'react';

class Filtro extends Component {
	state = {
		anio_seleccionado: 2003
	};

	renderAnios() {
		let anios = [];
		for (let i = 2003; i <= 2017; i += 1) {
			anios.push(
				<option key={i} value={i}>
					{i}
				</option>
			);
		}
		return anios;
	}

	filtrar = evt => {
		this.setState({ anio_seleccionado: evt.target.value });
		this.props.filtrar(+evt.target.value);
	};

	cancelarFiltro = () => {
		this.props.cancelarFiltro();
	};

	render() {
		var style = {
			height: '100px'
		};

		return (
			<div style={style}>
				<select
					value={!this.props.filtro ? 'sin_filtro' : this.state.anio_seleccionado}
					onChange={this.filtrar}>
					<option value="sin_filtro">Sin filtro</option>
					{this.renderAnios()}
				</select>
				<br />
				<br />
				{this.props.filtro && (
					<button onClick={this.cancelarFiltro} className="btn btn-danger">
						Cancelar Filtro
					</button>
				)}
			</div>
		);
	}
}

export default Filtro;
