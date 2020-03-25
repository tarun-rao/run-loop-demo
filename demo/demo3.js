export default class Demo3 {
  perform(backburner, logger) {
    var loopCount = 0;
    var timeoutCount = 0;
    var delayTime = 1000;
    var personLater = { name: 'Adam later' }
    var personTimeout = { name: 'Adam later' }

    // Run Loop
    function render() {
      logger.log('Run Loop Later', ++loopCount);
      document.querySelector('#output').innerHTML += `${personLater.name}<br>`;
    }

    function scheduleLater(name) {
      backburner.later('render', function() {
        personLater.name = name;
        backburner.scheduleOnce('render', render);
      }, delayTime);
    }

    // Timeout
    function timeOut(name) {
      setTimeout(function() {
        personTimeout.name = name;
        logger.log('Timeout Later', ++timeoutCount);
        document.querySelector('#output').innerHTML += `${personLater.name}<br>`;
      }, delayTime)
    }

    // Execution
    timeOut('Adam timeout');
    timeOut('Eve timeout');

    backburner.run(function() {
      scheduleLater('Adam later');
      scheduleLater('Eve later');
    });
  }
  code() {
    document.querySelector('#code').innerHTML = `
      var loopCount = 0;
      var timeoutCount = 0;
      var delayTime = 1000;
      var personLater = { name: 'Adam later' }
      var personTimeout = { name: 'Adam later' }

      // Run Loop
      function render() {
        logger.log('Run Loop Later', ++loopCount);
        document.querySelector('#output').innerHTML += personLater.name;
      }

      function scheduleLater(name) {
        backburner.later('render', function() {
          personLater.name = name;
          backburner.scheduleOnce('render', render);
        }, delayTime);
      }

      // Timeout
      function timeOut(name) {
        setTimeout(function() {
          personTimeout.name = name;
          logger.log('Timeout Later', ++timeoutCount);
          document.querySelector('#output').innerHTML += personTimeout.name;
        }, delayTime)
      }

      // Execution
      timeOut('Adam timeout');
      timeOut('Eve timeout');

      backburner.run(function() {
        scheduleLater('Adam later');
        scheduleLater('Eve later');
      });
    `;
  }
};