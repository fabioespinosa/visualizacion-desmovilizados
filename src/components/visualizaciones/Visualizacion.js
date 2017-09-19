import React, { Component } from 'react';
import BarChart from './BarChart';
import Filtro from './Filtro';

class Visualizacion extends Component {
	render() {
		return (
			<div>
				<Filtro {...this.props} />
				<BarChart {...this.props} />
			</div>
		);
	}
}

export default Visualizacion;
