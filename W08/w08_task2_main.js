d3.csv("https://229x109x.github.io/InfoVis2022/W08/w08_task.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; d.r = +d.r; d.color = d.color });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:40, right:10, bottom:30, left:50}
        };

        const linechart_plot = new LineChart( config, data );
        linechart_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class LineChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.line = d3.line()
            .x( d => self.xscale(d.x) + self.config.margin.left)
            .y( d => self.yscale(d.y) + self.config.margin.top);
        
        self.area = d3.area()
            .x( d => self.xscale(d.x) + self.config.margin.left )
            .y1( d => self.yscale(d.y) + self.config.margin.top )
            .y0( self.config.height - self.config.margin.bottom );
        
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .domain([0,d3.max(self.data,d => d.x)])
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .domain([d3.max(self.data,d => d.y),0])
            .range( [0, self.inner_height] )

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)
            .call( self.xaxis );
        
        self.yaxis_group = self.chart.append('g')
            .call( self.yaxis );

    }

    update() {
        let self = this;

        self.render();
    }

    render() {
        let self = this;

        self.svg.append('path')
            .data(self.data)
            .attr('d', self.line(self.data))
            .attr('stroke', 'black')
            .attr('fill', 'none');

        self.svg.append('path')
            .data(self.data)
            .attr('d', self.area(self.data))
            .attr('stroke', 'red')
            .attr('fill', 'orange')
            .attr('fill-opacity', 0.5);

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r )
            .attr("fill", d => d.color);

        self.svg.append("text")
            .attr("x", self.config.width/2-30)
            .attr("y", 15)
            .text("Chart Title")
            .attr("font-size", 20);

        self.svg.append("text")
            .attr("x", self.config.width/2-10)
            .attr("y", self.config.height)
            .text("X-label")
            .attr("font-size", 15);

        self.svg.append("text")
            .attr("x", 20)
            .attr("y", self.config.height/2+20)
            .attr("transform", `rotate(-90, 20, ${self.config.height/2+20})`)
            .text("Y-label")
            .attr("font-size", 15);

        self.xaxis_group
            .call( self.xaxis );
            
        self.yaxis_group
            .call( self.yaxis );
    }
}
