import _ from 'lodash';
import config from 'src/config';
import { createSelector } from 'reselect';
import { selectDefaultTemplateOptions } from 'src/selectors/accessConditionState';
import { getDomains, isVerified } from 'src/selectors/sendingDomains';
import { hasSubaccounts, selectSubaccountIdFromProps } from 'src/selectors/subaccounts';
import { filterTemplatesBySubaccount } from 'src/helpers/templates';

export const getDraftTemplateById = (state, id) => _.get(state, ['templates', 'byId', id, 'draft']);
export const getPublishedTemplateById = (state, id) => _.get(state, ['templates', 'byId', id, 'published']);

export const selectTemplates = (state) => state.templates.list;
export const selectPublishedTemplates = (state) => _.filter(state.templates.list, (template) => template.has_published);

export const selectDraftTemplate = (state, id) => _.get(state, ['templates', 'byId', id, 'draft']);
export const selectPublishedTemplate = (state, id) => _.get(state, ['templates', 'byId', id, 'published']);

const createTemplateSelector = (getter) => createSelector(
  [getter, selectDefaultTemplateOptions],
  (template, defaultOptions) => {
    if (!template) { return; }
    return { ...template, options: { ...defaultOptions, ...template.options }};
  }
);
export const selectDraftTemplateById = createTemplateSelector(getDraftTemplateById);
export const selectPublishedTemplateById = createTemplateSelector(getPublishedTemplateById);

export const selectDraftTemplatePreview = (state, id, defaultValue) => (
  state.templates.contentPreview.draft[id] || defaultValue
);
export const selectPublishedTemplatePreview = (state, id, defaultValue) => (
  state.templates.contentPreview.published[id] || defaultValue
);
export const selectPreviewLineErrors = (state) => (
  _.get(state, 'templates.contentPreview.error.response.data.errors', [])
);

export const selectDefaultTestData = () => JSON.stringify(config.templates.testData, null, 2);
export const selectTemplateTestData = (state) => JSON.stringify(state.templates.testData || config.templates.testData, null, 2);

export const selectAndCloneDraftById = createSelector(
  [selectDraftTemplateById],
  (draft) => {
    if (!draft) { return; }
    return { ...draft, name: `${draft.name} Copy`, id: `${draft.id}-copy` };
  }
);

// Selects sending domains for From Email typeahead
export const selectDomainsBySubaccount = createSelector(
  [getDomains, selectSubaccountIdFromProps],
  (domains, subaccountId) => _.filter(domains, (domain) => {

    if (!isVerified(domain)) {
      return false;
    }

    return subaccountId
      ? domain.shared_with_subaccounts || domain.subaccount_id === Number(subaccountId)
      : !domain.subaccount_id;
  })
);

/**
 * Returns domains by subaccount, but if no verified domain exists, return sparkpost default domain
 */
export const selectDomainsBySubaccountWithDefault = createSelector(
  [selectDomainsBySubaccount], (domains) => {
    if (!domains || !domains.length) {
      return [{ domain: config.sandbox.domain }];
    } else {
      return domains;
    }
  }
);


/**
 * Selects subaccountId from the selector's second arguement, in place of props
 */
export const selectSubaccountId = (state, subaccountId) => subaccountId;

/**
 * Selects published templates, filtered by provided subaccount
 * @param state  redux state
 * @param subaccountId
 */
export const selectPublishedTemplatesBySubaccount = createSelector(
  [selectPublishedTemplates, selectSubaccountId, hasSubaccounts],
  (templates, subaccountId, subaccountsExist) => filterTemplatesBySubaccount({ templates, subaccountId, hasSubaccounts: subaccountsExist })
);

/**
 * Prepare templates collection for listing with published and draft as separate item.
 * @return array
 */
export const selectTemplatesForListTable = createSelector(
  [selectTemplates], (templates) => {
    const templatesForListing = [];
    templates.forEach((template) => {
      const hasPublished = template.has_published;
      const hasDraft = template.has_draft;

      if (hasPublished) {
        templatesForListing.push({ ...template, list_name: template.name, list_status: hasDraft ? 'published_with_draft' : 'published' });
      }
      if (hasDraft) {
        templatesForListing.push({ ...template, list_name: hasPublished ? `${template.name} (DRAFT)` : template.name, list_status: 'draft' });
      }
    });
    return templatesForListing;
  });
