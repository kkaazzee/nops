const promptly = require('promptly');
const camelCase = require('camelcase');

async function prompt(label, defaultValue, validator, input) {
  const usesDefault = defaultValue != null;

  let finalDefaultValue;

  if (usesDefault) {
    finalDefaultValue = typeof defaultValue === 'function' ?
      defaultValue(input) :
      defaultValue;
  }

  const method = /^n|y$/.test(finalDefaultValue) ? promptly.confirm : promptly.prompt;

  return method.call(promptly,
    usesDefault ? `${label} (Default: ${finalDefaultValue}): ` : `${label}: `,
    {
      default: finalDefaultValue,
      validator: !!validator && ((value) => {
        const isValid = validator(value);
        if (!isValid) {
          throw new Error(`"${value}" is an invalid value for "${label}"`);
        }
        return value;
      })
    }
  );
}

module.exports = async function (fixtures) {
  const fixture = (fixtures && fixtures.packages[fixtures.selected]) || undefined;
  const queries = [
    // Soft removal for now. They're entirely unnecessary.
    // ['Title ID', fixture && fixture[0]],
    // ['Name', fixture && fixture[1]],
    ['URL', fixture && fixture[2]],
    ['License', fixture && fixture[3]],
    ['Download directory', process.cwd()],
    ['Decrypt directory', process.cwd()]
  ];
  const input = {};

  let query;
  let i = 0;

  process.stdout.write('Press `Enter` or `Return` to use the default value.\n\n');

  while (query = queries[i++]) {
    const [label, defaultValue, validator] = query;
    const key = camelCase(label.toLowerCase()).replace(/[?,.-]/g, '');

    input[key] = await prompt(label, defaultValue, validator, input);
  }

  return input;
};
