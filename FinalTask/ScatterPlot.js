class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 960,
            size: config.size || 230,
            padding: config.padding || 20
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;
    
        self.svg = d3.select( self.config.parent )
        .attr('width', self.config.width)
        .attr('height', self.config.height);

        