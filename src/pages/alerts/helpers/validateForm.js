import { NOTIFICATION_CHANNELS } from '../constants/formConstants';

const isNotificationChannelsEmpty = (values) => (
  NOTIFICATION_CHANNELS.every((channel) => (values[channel] || '').trim() === '')
);

const validateForm = (values) => {
  const errors = {};
  const { single_filter } = values;

  if (isNotificationChannelsEmpty(values)) {
    NOTIFICATION_CHANNELS.forEach((channel) => {
      errors[channel] = 'At least one notification channel must not be empty';
    });
  }

  if (single_filter && single_filter.filter_type !== 'none' && (single_filter.filter_values.length === 0)) {
    errors.single_filter = { filter_values: 'Required' };
  }

  return errors;
};

export default validateForm;
