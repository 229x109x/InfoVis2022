d3.csv("https://229x109x.github.io/InfoVis2022/W08/w08_task.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; d.r = +d.r; d.color = d.color });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:25, right:10, bottom:50, left:50},
            title: 'Title',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });
