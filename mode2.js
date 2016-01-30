
$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  function createSvg(parent) {
    return d3.select(parent).append('svg').attr('height',$( window ).height());
  }

  var svg = createSvg('body');

  // Create our initial D3 chart.
  var frequencyData = new Uint8Array(100);

/*
  svg.selectAll('circle')
     .data([1])
     .enter()
     .append('circle')
     .attr('cx','50%')
     .attr('cy','50%');*/

       svg.selectAll('circle')
     .data(frequencyData)
     .enter()
     .append('circle')
     .attr('cx', function (d, i) {
        return (i * 100)+100;
     })
     .attr('cy', 300) ;

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     // 動畫
     requestAnimationFrame(renderChart);

     // 頻率數據複製到陣列frequencyData。
     analyser.getByteFrequencyData(frequencyData);
     //只抓某條
     var d2 = frequencyData[1];
     // 更新數據
     svg.selectAll('circle')
        .data(frequencyData)
        .attr('r', function(d) {
           return d/5;
        })
        .attr('fill', function(d) {
           return 'rgb(0, ' + d + ', 0)';
        });
  }

  // Run the loop
  renderChart();

});