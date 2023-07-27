function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
        let metadata = data.metadata;
        sampleObject = metadata.filter(obj=>obj.id==sample) [0];
        let panel = d3.select('#sample-metadata')
        panel.html('')

    for (sample in sampleObject) {
        panel.append('h6').text('$(sample): ${sampleObject[sample]}');
    }

    let Guage = {
        type: 'indicator',
        mode: 'guage+number',
        value: sampleObject.wfreq,
        gauge: {
            axis: {range: [0, 9]},
            steps: [
                {range: [0,1], color: '#BED78C'},
                {range: [1,2], color: '#B0CF8B'},
                {range: [2,3], color: '#9FC488'},
                {range: [3,4], color: '#8FBC6E'},
                {range: [4,5], color: '#9FD12B'},
                {range: [5,6], color: '#9ECD2F'},
                {range: [6,7], color: '#A1CB2D'},
                {range: [7,8], color: '#8DC42E'},
                {range: [8,9], color: '#82A24C'}
            ],
        threshold: {
            line: {color: 'blue', width: 4},
            thickness: 0.75,
            value: sampleObject.wfreq
           }
        }

    };

    let gLayout= {
        width: 600,
        height: 400,
        title: 'Number of Washes per Week'
    };
    
    Plotly.newPlot('gauge', [Guage], gLayout)
});
}

function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
        let bubbleData = {
            X: data.samples.filter(sampleNumber => sampleNumber.id == sample) [0].otu_ids,
            y: data.samples.filter(sampleNumber => sampleNumber.id == sample) [0].sample_values,
            text: data.samples.filter(sampleNumber => sampleNumber.id == sample) [0].otu_labels,
            mode: 'markers',
            marker: {
                size: data.samples.filter(sampleNumber => sampleNumber.id == sample) [0].sample_values 
            }
        };

        let bubbleLayout = {
            width: 1000,
            height: 500,
            xaxis: {title: {
                text: 'OTU ID'
    

    
        }}
    };

    
    Plotly.newPlot("buble", [bubbleData], bubbleLayout, {responsive:true});
    let barData = {
        X: data.samples.filter(sampleNumber => sampleNumber.id == sample) [0].sample_values.slice(0,10).revers,
        y: data.samples.filter(sampleNumber => sampleNumber.id == sample) [0].otu_ids.slice(0,10).map('OTU ${otu}').reverse(),
        text: data.samples.filter(sampleNumber => sampleNumber.id == sample) [0].otu_labels.slice(o,10).reverse(),
        type: 'bar',
        orientation: 'h'
       };

      Plotly.newPlot("bar", [barData], {responsive:true});
 });
};

function init() {
    let dropdown = d3.select('#selDataset');
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
        let sampleNames= data.names;

        for (let i = 0; i < sampleNames.length; i++) {
            dropdown.append('option').property('value', sampleNames[i]).text(sampleNames[i]);
        };
    buildMetadata(sampleNames[0]);
    buildCharts(sampleNames[0]);
    })};

function optionChanged(newSample) {
    buildMetadata(sampleNames);
    buildCharts(sampleNames);
};
init();