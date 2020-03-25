export default class Demo2 {
  perform(backburner, logger) {
    
    var renderCount = 0;
    var renderDiffCount = 0;
    var person = {name: 'Adam'};

    function render() {
      logger.log('render same context', ++renderCount);
      document.querySelector('#output').innerHTML += `${person.name}<br/>`;
    }

    function scheduleSameContext(name) {
      person.name = name;
      backburner.scheduleOnce('render', render);
    }

    function scheduleDiffContext(name) {
      backburner.scheduleOnce('render', function() {
        logger.log('render diff context', ++renderDiffCount);
        document.querySelector('#output').innerHTML += `${name}<br/>`;
      });
    }

    backburner.run(function() {
      scheduleSameContext('Adam');
      scheduleSameContext('Eve');

      scheduleDiffContext('Tom');
      scheduleDiffContext('Rob');
    });
  }
  code() {
    document.querySelector('#code').innerHTML = `
      function scheduleSameContext(name) {
        person.name = name;
        backburner.scheduleOnce('render same context', render);
      }

      function scheduleDiffContext(name) {
        person.name = name;
        backburner.scheduleOnce('render', function() {
          logger.log('render diff context', ++renderDiffCount);
          document.querySelector('#output').innerHTML += person.name;
        });
      }

      backburner.run(function() {
        scheduleSameContext('Adam');
        scheduleSameContext('Eve');

        scheduleDiffContext('Adam');
        scheduleDiffContext('Even');
      });
    `;
  }
};