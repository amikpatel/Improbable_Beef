function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  function optionChanged(newSample) {
    console.log(newSample);
  }
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text('ID: ' + result.id);
      PANEL.append("h6").text('ETHNICITY: ' + result.ethnicity);
      PANEL.append("h6").text('GENDER: ' + result.gender);
      PANEL.append("h6").text('AGE: ' + result.age);
      PANEL.append("h6").text('LOCATION: ' + result.location);
      PANEL.append("h6").text('BBTYPE: ' + result.bbtype);
      PANEL.append("h6").text('WFREQ: ' + result.wfreq);
    }); 
  }
  function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var resultArray = data.samples.filter(sampleObj => {
                return sampleObj.id == sample
            });
      var result = resultArray[0];
      var top_ten_otu_ids = result.otu_ids.slice(0, 10).map(numericIds => {
            return 'OTU ' + numericIds;
        }).reverse();
        var top_ten_sample_values = result.sample_values.slice(0, 10).reverse();
        var top_ten_otu_labels = result.otu_labels.slice(0, 10).reverse();

        // Build Bar Chart
        var bar_trace = [{
                x: top_ten_sample_values,
                y: top_ten_otu_ids,
                text: top_ten_otu_labels,
                type: 'bar',
                orientation: 'h'
            }];
        var bar_layout = {};
        Plotly.newPlot('bar', bar_trace, bar_layout)

        //Build Bubble Chart
        var otu_ids = result.otu_ids
        var sample_values = result.sample_values
        var otu_labels = result.otu_labels
        
        var bubble_trace = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
                //sizeref: 0.2,
                //sizemode: 'area'
            }
            }]
        var bubble_layout = {};
        Plotly.newPlot('bubble', bubble_trace, bubble_layout);
    });
}
  init();

