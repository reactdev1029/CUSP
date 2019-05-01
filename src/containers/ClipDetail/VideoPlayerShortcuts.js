export const shortcuts = [
  {
    keyCode: 37,
    ctrl: false,
    handle: (player, actions) => {
      if (!player.hasStarted) {
        return;
      }

      const operation = {
        action: 'backward-3',
        source: 'shortcut'
      };
      actions.replay(3, operation);
    }
  },
  {
    keyCode: 39,
    ctrl: false,
    handle: (player, actions) => {
      if (!player.hasStarted) {
        return;
      }

      const operation = {
        action: 'forward-3',
        source: 'shortcut'
      };
      actions.forward(3, operation);
    }
  }
];
