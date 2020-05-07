export function trackCustomConversionGoal(...args) {
  window._vis_opt_queue = window._vis_opt_queue || [];
  window._vis_opt_queue.push(function() {
    window._vis_opt_register_conversion(...args);
  });
}

export function hasVWOflagSet(option) {
  return Boolean(window[option]);
}
