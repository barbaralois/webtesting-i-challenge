const enhancer = require('./enhancer.js');

describe('success()', function () {
  it('should only take an object as an argument', () => {
    expect(() => {
      enhancer.success(['a', 'hello', 17]);
    }).toThrow();
    expect(() => {
      enhancer.success('durability');
    }).toThrow();
    expect(() => {
      enhancer.success(12345);
    }).toThrow();
    expect(() => {
      enhancer.success();
    }).toThrow();
  });

  it('should throw an error if input is missing a name, durability, or enhancement key', () => {
    expect(() => {
      enhancer.success({ name: 'sword', durability: 50 });
    }).toThrow();
    expect(() => {
      enhancer.success({ durability: 10 });
    }).toThrow();
    expect(() => {
      enhancer.success({ name: 'spear', enhancement: 4 });
    }).toThrow();
  });

  it('should throw an error if enhancement level is above 20', () => {
    expect(() => {
      enhancer.success({ name: 'dagger', durability: 100, enhancement: 22 });
    }).toThrow();
  });

  it('should return an object with +1 enhancement', () => {
    expect(
      enhancer.success({ name: 'dagger', durability: 100, enhancement: 2 })
    ).toStrictEqual({ name: 'dagger', durability: 100, enhancement: 3 });
  });

  it('should stay the same if the enhancement level is 20', () => {
    expect(
      enhancer.success({ name: 'sword', durability: 50, enhancement: 20 })
    ).toStrictEqual({ name: 'sword', durability: 50, enhancement: 20 });
  });
});

describe('fail()', function () {
  it('should only take an object as an argument', () => {
    expect(() => {
      enhancer.fail(['c', 'cat', 175]);
    }).toThrow();
    expect(() => {
      enhancer.fail('name');
    }).toThrow();
    expect(() => {
      enhancer.fail(54321);
    }).toThrow();
    expect(() => {
      enhancer.fail();
    }).toThrow();
  });

  it('should throw an error if input is missing a name, durability, or enhancement key', () => {
    expect(() => {
      enhancer.fail({ name: 'sword', durability: 50 });
    }).toThrow();
    expect(() => {
      enhancer.fail({ durability: 10 });
    }).toThrow();
    expect(() => {
      enhancer.fail({ name: 'spear', enhancement: 4 });
    }).toThrow();
  });

  it('should throw an error if durability is below 0', () => {
    expect(() => {
      enhancer.fail({ name: 'sword', durability: -4, enhancement: 3 });
    }).toThrow();
  });

  it('should throw an error if the enhancement level is below 0', () => {
    expect(() => {
      enhancer.fail({ name: 'sword', durability: 50, enhancement: -5 });
    }).toThrow();
  });

  it('should return an object with -1 enhancement and -10 durability if level began at or above 17', () => {
    expect(
      enhancer.fail({ name: 'gloves', durability: 35, enhancement: 17 })
    ).toStrictEqual({ name: 'gloves', durability: 25, enhancement: 16 });
  });

  it('should return an object with -10 durability if level began at 15 or 16', () => {
    expect(
      enhancer.fail({ name: 'knives', durability: 95, enhancement: 16 })
    ).toStrictEqual({ name: 'knives', durability: 85, enhancement: 16 });
  });

  it('should return an object with -5 durability if level began at or below 14', () => {
    expect(
      enhancer.fail({ name: 'knives', durability: 45, enhancement: 6 })
    ).toStrictEqual({ name: 'knives', durability: 40, enhancement: 6 });
  });

  it('should return an object with a durability of 0 if it would otherwise go below 0', () => {
    expect(
      enhancer.fail({ name: 'gloves', durability: 5, enhancement: 18 })
    ).toStrictEqual({ name: 'gloves', durability: 0, enhancement: 17 });

    expect(
      enhancer.fail({ name: 'axe', durability: 4, enhancement: 8 })
    ).toStrictEqual({ name: 'axe', durability: 0, enhancement: 8 });
  });
});

describe('repair()', function () {
  it('should only take an object as an argument', () => {
    expect(() => {
      enhancer.repair([16, 'apple', 17]);
    }).toThrow();
    expect(() => {
      enhancer.repair('enhancement');
    }).toThrow();
    expect(() => {
      enhancer.repair(51591);
    }).toThrow();
    expect(() => {
      enhancer.repair();
    }).toThrow();
  });

  it('should throw an error if input is missing a name, durability, or enhancement key', () => {
    expect(() => {
      enhancer.repair({ name: 'sword', durability: 50 });
    }).toThrow();
    expect(() => {
      enhancer.repair({ durability: 10 });
    }).toThrow();
    expect(() => {
      enhancer.repair({ name: 'spear', enhancement: 4 });
    }).toThrow();
  });

  it('should return an object with durability of 100 and the same name/enhancement values', () => {
    expect(
      enhancer.repair({ name: 'dagger', durability: 60, enhancement: 2 })
    ).toStrictEqual({ name: 'dagger', durability: 100, enhancement: 2 });
  });
});

// STRETCH
describe('get()', function () {
  it('should only take an object as an argument', () => {
    expect(() => {
      enhancer.get(['a', 'hello', 17]);
    }).toThrow();
    expect(() => {
      enhancer.get('durability');
    }).toThrow();
    expect(() => {
      enhancer.get(12345);
    }).toThrow();
    expect(() => {
      enhancer.get();
    }).toThrow();
  });

  it('should throw an error if input is missing a name, durability, or enhancement key', () => {
    expect(() => {
      enhancer.get({ name: 'sword', durability: 50 });
    }).toThrow();
    expect(() => {
      enhancer.get({ durability: 10 });
    }).toThrow();
    expect(() => {
      enhancer.get({ name: 'spear', enhancement: 4 });
    }).toThrow();
  });

  it('should add the enhancement level to the name if above 0', () => {
    expect(
      enhancer.get({ name: 'axe', durability: 4, enhancement: 1 })
    ).toStrictEqual({ name: '[+1] axe', durability: 4, enhancement: 1 });
  });

  it('should not change if the enhancement level is 0', () => {
    expect(
      enhancer.get({ name: 'nunchucks', durability: 55, enhancement: 0 })
    ).toStrictEqual({ name: 'nunchucks', durability: 55, enhancement: 0 });
  });
});
