d3.csv("https://229x109x.github.io/InfoVis2022/W04/w04_task2.csv")
    .then( data => {
        data.forEach( d => { d.label = d.label; d.data = +d.data; d.color = d.color });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:40, right:10, bottom:30, left:50}
        };

        const piechart_plot = new PieChart( config, data );
        piechart_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class PieChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

        self.pie = d3.pie()
            .value(d => d.data);
        
        self.radius = Math.min(self.config.width,self.config.height)/2
        
        self.arc = d3.arc()
            .innerRadius(self.radius/2)
            .outerRadius(self.radius);
   
    }

    update() {
        let self = this;

        self.render();
    }

    render() {
        let self = this;

        self.svg.selectAll('pie')
            .data(self.pie(self.data))
            .enter()
            .append('path')
            .attr('d', self.arc)
            .style('fill', d => d.data.color)
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        self.svg.selectAll('pie')
            .data(self.pie(self.data))
            .enter()
            .append('text')
            .attr('transform',d => `translate(${self.arc.centroid(d)})`)
            .style("text-anchor", "middle")
            .style("font-size",15)
            //.style('fill', d => d.data.color)
            .text(d => d.data.label);

    }
}
     