export function getDisplayName(Component, wrapper = 'container') {
  return `${wrapper}(${Component.displayName || Component.name || 'Component'})`;
}
