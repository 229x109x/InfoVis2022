d3.csv("https://229x109x.github.io/InfoVis2022/W04/w04_task2.csv")
    .then( data => {
        data.forEach( d => { d.label = d.label; d.data = +d.data; d.color = d.color });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:20, right:10, bottom:30, left:80}
        };

        const barchart_plot = new BarChart( config, data );
        barchart_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarChart {

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

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .domain([0,d3.max(self.data,d => d.data)])
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.label))
            .range( [0, self.inner_height] )
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
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

        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => self.yscale(d.label))
            .attr("width", d => self.xscale(d.data))
            .attr("height", self.yscale.bandwidth())
            .style("fill", d => d.color);

        self.svg.append("text")
            .attr("x", self.config.width/2-30)
            .attr("y",15)
            .text("Chart Title")
            .attr("font-size",20)

        self.svg.append("text")
            .attr("x", self.config.width/2-10)
            .attr("y", self.config.height)
            .text("X-label")
            .attr("font-size",15)

        self.svg.append("text")
            .attr("x", 20)
            .attr("y", self.config.height/2+20)
            .attr("transform",`rotate(-90,20,${self.config.height/2+20})`)
            .text("Y-label")
            .attr("font-size",15)

        self.xaxis_group
            .call(self.xaxis);
            
        self.yaxis_group
            .call(self.yaxis);
    }
}
