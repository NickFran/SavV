function clamp(value, min, max) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

function getNextIndex(currentIndex, arrayLength, direction) {
    if (direction === 'forward') {
        // Go to next, wrap to 0 if at end
        return (currentIndex + 1) % arrayLength;
    } else if (direction === 'back') {
        // Go to previous, wrap to last if at start
        return (currentIndex - 1 + arrayLength) % arrayLength;
    }
    return currentIndex; // fallback
}

module.exports = { clamp, getNextIndex };

