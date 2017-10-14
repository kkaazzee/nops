class DotDot {

  constructor({ cadence = 5, interval = 1500, onStart, onTick, onEnd }) {
    this.name = 'DotDot';
    this.cadence = cadence;
    this.interval = interval;
    this.onStart = onStart;
    this.onTick = onTick;
    this.onEnd = onEnd;
  }

  async start(...args) {
    const { cadence, interval, name, onStart, onTick } = this;

    let count = 0;

    if (this.timeoutId) {
      throw new Error(`${name} is already started. Call \`end()\` first.`);
    }

    if (onStart) {
      await onStart(...args);
    }

    if (onTick) {
      const tick = async () => {
        await onTick(!!count++ && (count % cadence === 0));
        if (this.timeoutId) {
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

    if (!timeoutId) {
      throw new Error(`${name} is not started. Call \`start()\` first.`);
    }

    this.timeoutId = clearInterval(timeoutId);

    await onEnd(...args);
  }

}

module.exports = DotDot;
