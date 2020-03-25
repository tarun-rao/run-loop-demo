export default class Demo4 {
  count = 0;
  perform(backburner, logger) {
    var actionCount = 0;
    var renderCount = 0;
    var afterRenderCount = 0;
    var routerTransitionCount = 0;
    var destroyCount = 0;
    var person = {name: 'Erik'};

    // Create Action Buttons
    this._createActions();

    // Handlers
    function actions() {
      backburner.later(() => {
        logger.log('actions', ++actionCount);
      }, 5000);
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

    // Setters
    function setActions() {
      backburner.schedule('actions', actions);
    }

    function setRouterTransitions() {
      backburner.schedule('routerTransitions', routerTransitions);
    }

    function setRender() {
      backburner.schedule('render', render);
    }
    
    function setAfterRender() {
      backburner.schedule('afterRender', afterRender);
    }

    function setDestroy() {
      backburner.schedule('destroy', destroy);
    }

    // Init
    backburner.run(() => {
      function* makeIterator() {  
        yield setActions();
        yield setRouterTransitions();
        yield setRender();
        yield setAfterRender();
        yield setDestroy();
      };

      this.gen = makeIterator();
    });
  }

  _createActions() {
    var actionEl = document.querySelector('#action');
    var nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    actionEl.append(nextBtn);

    // events
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.gen.next();
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