module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  if (typeof item !== 'object' || Array.isArray(item)) {
    throw error;
  } else {
    if (
      !item.name ||
      !item.durability ||
      !item.enhancement ||
      item.durability < 0 ||
      item.enhancement < 0 ||
      item.enhancement > 20
    ) {
      throw error;
    } else {
      if (item.enhancement < 20) {
        return { ...item, enhancement: item.enhancement + 1 };
      } else {
        return { ...item };
      }
    }
  }
}

function fail(item) {
  if (typeof item !== 'object' || Array.isArray(item)) {
    throw error;
  } else {
    if (
      !item.name ||
      item.durability === undefined ||
      item.enhancement === undefined ||
      item.durability < 0 ||
      item.enhancement < 0 ||
      item.enhancement > 20
    ) {
      throw error;
    } else {
      if (item.enhancement > 16) {
        if (item.durability < 10) {
          return {
            ...item,
            enhancement: item.enhancement - 1,
            durability: 0,
          };
        } else {
          return {
            ...item,
            enhancement: item.enhancement - 1,
            durability: item.durability - 10,
          };
        }
      } else if (item.enhancement === 15 || item.enhancement === 16) {
        if (item.durability < 5) {
          return { ...item, durability: 0 };
        } else {
          return { ...item, durability: item.durability - 10 };
        }
      } else {
        if (item.durability < 5) {
          return { ...item, durability: 0 };
        } else {
          return { ...item, durability: item.durability - 5 };
        }
      }
    }
  }
}

function repair(item) {
  if (typeof item !== 'object' || Array.isArray(item)) {
    throw error;
  } else {
    if (
      !item.name ||
      item.durability === undefined ||
      item.enhancement === undefined ||
      item.durability < 0 ||
      item.enhancement < 0 ||
      item.enhancement > 20
    ) {
      throw error;
    } else {
      return { ...item, durability: 100 };
    }
  }
}

// STRETCH
function get(item) {
  if (typeof item !== 'object' || Array.isArray(item)) {
    throw error;
  } else {
    if (
      !item.name ||
      item.durability === undefined ||
      item.enhancement === undefined ||
      item.durability < 0 ||
      item.enhancement < 0 ||
      item.enhancement > 20
    ) {
      throw error;
    } else {
      if (item.enhancement > 0) {
        return { ...item, name: `[+${item.enhancement}] ${item.name}` };
      } else {
        return { ...item };
      }
    }
  }
}
