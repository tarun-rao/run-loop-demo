export default class Demo4 {
  queues = {
    actions: 1,
    routerTransitions: 2,
    render: 1,
    afterRender: 4,
    destroy: 1
  }
  queueBtns = {};
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
    function scheduleActions() {
      logger.log('actions', ++actionCount);
    }

    function scheduleRouterTransitions() {
      logger.log('routerTransitions', ++routerTransitionCount);
    }

    function scheduleRender() {
      logger.log('render', ++renderCount);
      document.querySelector('#output').innerHTML = person.name;
    }

    function scheduleAfterRender() {
      logger.log('afterRender', ++afterRenderCount);
    }

    function scheduleDestroy() {
      logger.log('destroy', ++destroyCount);
    }

    // flush
    var _this = this;
    function flush(type) {
      backburner.later(function() {
        logger.log('flushed queue items', _this.queues[type]);
        _this.queues[type] = 0;
        _this.queueBtns[type].disabled = true;
        _this._drawStats();
      });
    }

    // Schedulers
    function setActions({ actions }) {
      for (let i = 0; i < actions; i++) {
        backburner.scheduleOnce('actions', scheduleActions);
      }
      flush('actions');
    }

    function setRouterTransitions({ routerTransitions }) {
      for (let i = 0; i < routerTransitions; i++) {
        backburner.scheduleOnce('routerTransitions', scheduleRouterTransitions);
      }
      flush('routerTransitions');
    }

    function setRender({ render }) {
      for (let i = 0; i < render; i++) {
        backburner.scheduleOnce('render', scheduleRender);
      }
      flush('render');
    }
    
    function setAfterRender({ afterRender }) {
      for (let i = 0; i < afterRender; i++) {
        backburner.scheduleOnce('afterRender', scheduleAfterRender);
      }
      flush('afterRender');
    }

    function setDestroy(destroy) {
      for (let i = 0; i < destroy; i++) {
        backburner.scheduleOnce('destroy', scheduleDestroy);
      }
      flush('destroy');
    }

    // Init
    backburner.run(() => {

      function* makeIterator() { 
        yield setActions;
        yield setRouterTransitions;
        yield setRender;
        yield setAfterRender;
        yield setDestroy;
      };

      this.gen = makeIterator();
    });
  }

  _createActions() {
    let actionEl = document.querySelector('#action');
    let nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    actionEl.append(nextBtn);

    // events
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log(this.queues);
      this.gen.next().value(this.queues);
    });

    // queue buttons
    Object.keys(this.queues).forEach((queue) => {
      var btn = document.createElement('button');
      btn.innerHTML = `+1 ${queue}`;
      btn.id = queue;
      this.queueBtns[queue] = btn;
      actionEl.append(btn);

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.queues[e.target.id]++;
        this._drawStats();
      });
    });

    // stats
    this._drawStats();
  }

  _drawStats() {
    var container;
    for (let queue in this.queues) {
      container = document.querySelector(`#stat-${queue}`);
      container.innerHTML = '';
      for (let i = 0; i < this.queues[queue]; i++) {
        container.append(document.createElement('div'));
      }
    };
  }

  code() {
    document.querySelector('#code').innerHTML = '';
  }
};