d3.csv("https://229x109x.github.io/InfoVis2022/W04/w04_task2.csv")
    .then( data => {
        data.forEach( d => { d.label = d.label; d.data = +d.data; d.color = d.color });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:25, right:10, bottom:50, left:100},
            title: 'Title',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();

        d3.select('#reverse').on('click', d => { bar_chart.sort('reverse'); bar_chart.update(); });
        d3.select('#descend').on('click', d => { bar_chart.sort('descend'); bar_chart.update(); });
        d3.select('#ascend').on('click', d => { bar_chart.sort('ascend'); bar_chart.update(); });
    })
    .catch( error => {
        console.log( error );
    });
