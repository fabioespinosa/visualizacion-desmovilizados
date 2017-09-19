import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
	state = {
		width: 900,
		height: 5100,
		margin_top: 20,
		margin_left: 300,
		margin_right: 100
	};

	componentDidMount() {
		this.container = d3.select(this.refs.container);
		this.renderBarChart(this.props);
	}

	shouldComponentUpdate(nextProps) {
		this.renderBarChart(nextProps);
		return false;
	}

	renderBarChart(props) {
		var t = d3.transition().duration(2000);

		var height = props.datos.length * 10;
		var width = 900;

		// Scales:
		// Color scale:
		var colors = d3.scaleOrdinal(d3.schemeCategory10);

		// X Scale:
		var xMax = d3.max(props.datos, d => d.numero_desmovilizados);
		var widthScale = d3
			.scaleLinear()
			.domain([0, xMax])
			.range([0, width - this.state.margin_left - this.state.margin_right]);

		// Y Scale:
		var yDomain = props.datos.map(d => d.departamento);
		var yScale = d3
			.scaleBand()
			.domain(yDomain)
			.range([this.state.margin_top, height]);

		// Data
		var svg = d3
			.select('svg')
			.attr('height', height)
			.attr('width', width);

		var data = svg.selectAll('rect').data(props.datos, d => d.key);

		// Exit
		data
			.exit()
			.transition(t)
			.attr('width', 0)
			.remove();

		var enter = data
			.enter()
			.append('rect')
			.attr('height', '10');

		// Enter + update
		enter = enter
			.merge(data)
			.transition(t)
			.attr('x', this.state.margin_left)
			.attr('fill', d => colors(d.departamento))
			.attr('y', (d, i) => {
				if (!props.filtro) {
					return yScale(d.departamento) + (i % 15) * 10;
				}
				return yScale(d.departamento);
			})
			.attr('width', (d, i) => widthScale(d.numero_desmovilizados))
			.attr('height', '10')
			.attr('stroke', '#fff');

		d3.select('#eje_x').remove();
		d3.select('#eje_y').remove();
		d3.select('#eje_anios').remove();

		var xAxis = d3.axisTop().scale(widthScale);
		svg
			.append('g')
			.attr('id', 'eje_x')
			.attr('transform', `translate(${this.state.margin_left},${this.state.margin_top})`)
			.call(xAxis);

		if (!props.filtro) {
			d3.select('#eje_anios').remove();
			var aniosDomain = this.createArrayAnios();
			var yScaleAnios = d3
				.scaleBand()
				.domain(aniosDomain)
				.range([this.state.margin_top, height]);

			var aniosAxis = d3
				.axisLeft()
				.tickFormat(d3.format('d'))
				.scale(yScaleAnios);
			svg
				.append('g')
				.attr('id', 'eje_anios')
				.attr('transform', `translate(${this.state.margin_left},0)`)
				.call(aniosAxis);
		}

		var yAxis = d3
			.axisLeft()
			.tickPadding('30')
			.scale(yScale);
		svg
			.append('g')
			.attr('id', 'eje_y')
			.attr('transform', `translate(${this.state.margin_left},0)`)
			.call(yAxis);
	}

	createArrayAnios() {
		let arreglo = [];
		for (let i = 0; i <= 510; i += 1) {
			arreglo.push(2003 + i % 15 + '.' + i);
		}
		return arreglo;
	}

	render() {
		return (
			<svg>
				<g ref="container" className="barchart" />
			</svg>
		);
	}
}

export default BarChart;
