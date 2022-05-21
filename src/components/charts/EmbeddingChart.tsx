import React, {useEffect, useRef} from "react";
import * as d3 from 'd3';
import {Coord, InstanceCoord, InstanceCoords} from "../utils/MiscInterfaces";
import CSS from 'csstype';


// If you mess with any of these you need
// to regenerate background colored images
// :(
const BUFFER_PROPORTION = 1 / 20;
const MARGINS_PROPORTION = 1 / 8;
const CIRCLE_R = 2;
const colors = d3.scaleOrdinal(d3.schemeCategory10);
const WIDTH = 500;
const HEIGHT = 500;

// const getImageBounds = (minX: number,
//                         maxX: number,
//                         xScaleBuffer: number,
//                         minY: number,
//                         maxY: number,
//                         yScaleBuffer: number) => {
//     console.log(minX - xScaleBuffer);
//     console.log(Math.abs(minX - xScaleBuffer) + Math.abs(maxX + xScaleBuffer));
//     console.log(minY - yScaleBuffer);
//     console.log(Math.abs(maxY + yScaleBuffer) + Math.abs(minY - yScaleBuffer));
// }

interface EmbeddingChartProps extends InstanceCoords {
    readonly handleSelectedIdChange: (id: number) => void;
    readonly handleCoordChange: (coord: Coord) => void;
    readonly svgStyle?: CSS.Properties;
}

export const EmbeddingChart: React.FC<EmbeddingChartProps> = ({coords, handleSelectedIdChange, handleCoordChange, svgStyle}) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (coords) {

            const margins = WIDTH * MARGINS_PROPORTION;
            const getX = (d: InstanceCoord) => d.x;
            const getY = (d: InstanceCoord) => d.y;
            const minX = d3.min(coords, getX);
            const maxX = d3.max(coords, getX);
            const minY = d3.min(coords, getY);
            const maxY = d3.max(coords, getY);

            if (minX && maxX && minY && maxY) {
                const xScaleBuffer = (maxX - minX) * BUFFER_PROPORTION;
                const yScaleBuffer = (maxY - minY) * BUFFER_PROPORTION;

                const xScale = d3.scaleLinear()
                    .domain([minX - xScaleBuffer, maxX + xScaleBuffer])
                    .range([margins, (WIDTH - margins)]);
                const yScale = d3.scaleLinear()
                    .domain([minY - yScaleBuffer, maxY + yScaleBuffer])
                    .range([(HEIGHT - margins), margins]);
                const xAxis = d3.axisBottom(xScale);
                const yAxis = d3.axisLeft(yScale);

                const rootG = d3.select(d3Container.current);
                rootG.selectAll('g').remove().exit();

                const circlesG = rootG.append('g');
                const xAxisG = rootG.append('g');
                const yAxisG = rootG.append('g');

                circlesG
                    .selectAll('circle')
                    .data(coords)
                    .enter()
                    .append('circle')
                    .attr('cx', function (d) {
                        return xScale(d.x);
                    })
                    .attr('cy', function (d) {
                        return yScale(d.y);
                    })
                    .attr('r', CIRCLE_R)
                    .attr('id', (d) => {
                        return "id" + d.id;
                    })
                    .style("stroke", "black")
                    .style("fill", (d) => {
                        return colors(String(d.label));
                    })
                    .on("mouseover", function (d) {
                        circlesG
                            .select(".selected")
                            .attr('class', null)
                            .style('fill', (d) => {
                                // Danger
                                const coord = d as InstanceCoord;
                                return colors(String(coord.label));
                            });

                        d3.select(this)
                            .attr('class', 'selected')
                            .style("fill", "#fff13b");

                        handleSelectedIdChange(d.id);
                    })
                    .style("stroke-width", .25);

                rootG
                    .on('mousemove', function () {
                        const mousePos = d3.mouse(d3.event.currentTarget);
                        handleCoordChange({
                            x: xScale.invert(mousePos[0]),
                            y: yScale.invert(mousePos[1])
                        });
                    });

                xAxisG
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + (HEIGHT - margins) + ")")
                    .call(xAxis);

                yAxisG
                    .attr("class", "axis")
                    .attr("transform", "translate(" + margins + ", 0)")
                    .call(yAxis);
            }

        }

    }, [coords, handleCoordChange, handleSelectedIdChange]);

    return (
        <svg ref={d3Container} width={500} height={500}/>
    )

}

interface EmbeddingChartWithBackgroundProps extends EmbeddingChartProps {
    readonly imgPath: string;
}

export const EmbeddingChartWithBackground: React.FC<EmbeddingChartWithBackgroundProps> = ({imgPath,...rest}) => {

    const divStyle: CSS.Properties = {
        position: "relative",
        display: "inline-block",
    };
    const svgStyle: CSS.Properties = {
        position: "relative",
        top: "0px",
        left: "0px"
    };

    const margins = WIDTH * MARGINS_PROPORTION;
    const imgWidth = WIDTH - (margins * 2);
    const imgHeight = HEIGHT - (margins * 2);

    const imgStyle: CSS.Properties = {
        position: "absolute",
        top: (margins) + "px",
        left: (margins) + "px",
        zIndex: -1
    };
    return(
        <div style={divStyle}>
            <img alt="img" style={imgStyle} src={imgPath} width={imgWidth} height={imgHeight}/>
            <EmbeddingChart {...rest} svgStyle={svgStyle}/>
        </div>

    )

}
