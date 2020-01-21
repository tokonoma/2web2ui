import { useMemo, useEffect } from 'react';
import { hash } from './hash';

const logToPendo = ({ testName, variantName }) => {
  if (window.pendo) {
    window.pendo.track(`${testName} | ${variantName}`);
  }
};

function useABTest(options = {}) {
  const { testName, variants = [], onVariantLoad = logToPendo, uid } = options;

  const index = useMemo(() => hash(uid) % variants.length, [variants.length, uid]);

  const VariantComponent = variants[index];
  const variantName = VariantComponent.displayName || VariantComponent.name || 'ABTestVariant';

  useEffect(() => {
    if (onVariantLoad && uid && variantName && testName) {
      onVariantLoad({ testName, variantName, uid });
    }
  }, [onVariantLoad, testName, uid, variantName]);

  return VariantComponent;
}

export default useABTest;
