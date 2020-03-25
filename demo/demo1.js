export default class Demo1 {
  perform(backburner, logger) {
    
    var actionCount = 0;
    var renderCount = 0;
    var afterRenderCount = 0;
    var routerTransitionCount = 0;
    var destroyCount = 0;
    var person = {name: 'Erik'};

    function actions() {
      logger.log('actions', ++actionCount);
    }

    function routerTransitions() {
      logger.log('routerTransitions', ++routerTransitionCount);
    }

    function render() {
      logger.log('render', ++renderCount);
      document.querySelector('#output').innerHTML = person.name;
    }

    function afterRender() {
      logger.log('afterRender', ++afterRenderCount);
    }

    function destroy() {
      logger.log('destroy', ++destroyCount);
    }

    function setName(name) {
      person.name = name;
      backburner.schedule('destroy', destroy);
      backburner.schedule('routerTransitions', routerTransitions);
      backburner.schedule('render', render);
      backburner.schedule('actions', actions);
      backburner.schedule('afterRender', afterRender);
    }

    backburner.run(function() {
      setName('Kris');
    });
  }
  code() {
    document.querySelector('#code').innerHTML = `
      function setName(name) {
        person.name = name;
        backburner.schedule('destroy', destroy);
        backburner.schedule('routerTransitions', routerTransitions);
        backburner.schedule('render', render);
        backburner.schedule('actions', actions);
        backburner.schedule('afterRender', afterRender);
      }

      backburner.run(function() {
        setName('Kris');
      });
    `;
  }
};