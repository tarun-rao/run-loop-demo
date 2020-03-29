export default class Demo3 {
  perform(backburner, logger) {
    var renderCount = 0;
    var delayTime = 2000;
    var person = { name: 'test' };

    function render() {
      logger.log('render', ++renderCount);
      document.querySelector('#output').innerHTML = person.name;
    }

    function scheduleOnce(name) {
      person.name = name;
      backburner.scheduleOnce('render', render);
    }

    function scheduleLater(name) {
      backburner.later('render', function() {
        person.name = name;
        backburner.scheduleOnce('render', render);
      }, delayTime);
    }

    backburner.run(function() {
      scheduleOnce('Adam');
      scheduleLater('Eve');
      scheduleOnce('John');
    });
  }
  code() {
    document.querySelector('#code').innerHTML = `
      function render() {
        logger.log('render', ++renderCount);
        document.querySelector('#output').innerHTML = person.name;
      }
  
      function scheduleOnce(name) {
        person.name = name;
        backburner.scheduleOnce('render', render);
      }
  
      function scheduleLater(name) {
        backburner.later('render', function() {
          person.name = name;
          render();
        }, delayTime);
      }
  
      backburner.run(function() {
        scheduleOnce('Adam');
        scheduleLater('Eve');
        scheduleOnce('John');
      });
    `;
  }
};