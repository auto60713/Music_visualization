$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);


  var frequencyData = new Uint8Array(30);

  var svgHeight = $( window ).height()-25;
  var svgWidth  = $( window ).width()-40;


  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

   d3.select("svg").append('circle')
     .attr('cx', '50%')
     .attr('cy', '50%'); 

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     requestAnimationFrame(renderChart);

     // 頻率數據複製到陣列frequencyData。
     analyser.getByteFrequencyData(frequencyData);
     var d2 = frequencyData[1]; // take bass feature

     svg.select('circle')
        .data(frequencyData)
        .attr('r', d2)
        .attr('fill', function(d) {
           return '#6DE699';
        });
  }

  // Run the loop
  renderChart();

});