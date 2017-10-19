class DotDot {

  constructor({ cadence = 5, interval = 1500, onStart, onTick, onEnd }) {
    this.name = 'DotDot';
    this.cadence = cadence;
    this.interval = interval;
    this.onStart = onStart;
    this.onTick = onTick;
    this.onEnd = onEnd;

    this.isStarted = false;
  }

  async start(...args) {
    const { cadence, interval, name, onStart, onTick } = this;

    if (this.isStarted) {
      throw new Error(`${name} is already started. Call \`end()\` first.`);
    }

    this.isStarted = true;

    if (onStart) {
      await onStart(...args);

      if (!this.isStarted) {
        // The instance could have been ended while awaiting `onStart`.
        return;
      }
    }

    if (onTick) {
      let count = 0;

      const tick = async () => {
        await onTick(!!count++ && (count % cadence === 0));

        if (this.isStarted) {
          // The instance may be ended while awaiting onTick. Ensure that we
          // don't incorrectly trigger another tick.
          this.timeoutId = setTimeout(tick, interval);
        }
      };

      this.timeoutId = setTimeout(tick, interval);
    }
  }

  async end(...args) {
    const { timeoutId, name, onEnd } = this;

    if (!this.isStarted) {
      throw new Error(`${name} is not started. Call \`start()\` first.`);
    }

    this.isStarted = false;
    this.timeoutId = clearTimeout(timeoutId);

    await onEnd(...args);
  }

  async tryStart() {
    if (!this.isStarted) {
      await this.start();
    }
  }

}

module.exports = DotDot;
