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

function getInbetweenCoords(coord1, coord2, fraction) {
    const lat = coord1.lat + (coord2.lat - coord1.lat) * fraction;
    const lon = coord1.lon + (coord2.lon - coord1.lon) * fraction;
    return { lat, lon };
}

function format24hr(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function format12hr(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}

module.exports = { clamp, getNextIndex, getInbetweenCoords, format24hr, format12hr };
