import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { ExpandMore, ChevronLeft } from '@sparkpost/matchbox-icons';
import { Button, Popover, UnstyledLink, WindowEvent } from 'src/components/matchbox';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import SubaccountTypeahead from 'src/components/typeahead/SubaccountTypeahead';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import withSignalOptions from '../../containers/withSignalOptions';
import SubaccountOption from './SubaccountOption';
import { onEscape } from 'src/helpers/keyEvents';
import OGStyles from './SubaccountFilter.module.scss';
import HibanaStyles from './SubaccountFilterHibana.module.scss';

const OPTIONS = [
  {
    id: undefined,
    name: 'Master & All Subaccounts',
    condition: ({ id }) => !id && id !== 0,
  },
  {
    id: 0,
    name: 'Master Account',
    condition: ({ id }) => id === 0,
  },
  {
    name: 'Search for Subaccount',
    nested: true,
    condition: ({ id }) => id > 0,
  },
];

export function SubaccountFilter(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const contentRef = useRef(null);
  const triggerRef = useRef(null);
  const styles = useHibanaOverride(OGStyles, HibanaStyles);

  const close = () => {
    setIsOpen(false);
    setIsSearchOpen(false);
  };

  const handleChange = ({ id, name }) => {
    close();
    props.changeSignalOptions({ subaccount: { id, name } });
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleVisibilityToggle = () => {
    setIsOpen(!isOpen);
  };

  const containsTarget = (ref, e) => Boolean(ref.current && ref.current.contains(e.target));

  const handleWindowClick = e => {
    if (!containsTarget(contentRef, e) && !containsTarget(triggerRef, e)) {
      close();
    }
  };

  const {
    hasSubaccounts,
    signalOptions: { subaccount = OPTIONS[0] },
  } = props;

  if (!hasSubaccounts) {
    return null;
  }

  const trigger = (
    <div ref={node => (triggerRef.current = node)}>
      <Button
        aria-controls="popover-subaccount-filter"
        fullWidth
        onClick={handleVisibilityToggle}
        className={styles.Button}
      >
        <span className={styles.ButtonLabel}>{subaccount.name}</span>
        {subaccount.id > 0 && <span>({subaccount.id})</span>}
        <ExpandMore className={styles.ButtonIcon} size={22} />
      </Button>
    </div>
  );

  return (
    <div className={styles.SubaccountFilter}>
      <WindowEvent handler={handleWindowClick} event="click" />
      <WindowEvent handler={onEscape(close)} event="keydown" />
      <Popover
        id="popover-subaccount-filter"
        className={styles.Popover}
        left
        open={isOpen}
        trigger={trigger}
      >
        <div ref={node => (contentRef.current = node)}>
          <div className={classnames(styles.PopoverContent, isSearchOpen && styles.showSearch)}>
            <div className={styles.SubaccountSearchHeader}>
              <UnstyledLink className={styles.BackButton} onClick={handleSearchToggle}>
                <ChevronLeft size={20} />
              </UnstyledLink>
              <span>Subaccount</span>
            </div>
            <div className={styles.SubaccountSearch}>
              <SubaccountTypeahead
                label=""
                onChange={handleChange}
                placeholder="Search here"
                unfiltered
              />
            </div>
          </div>
          <div className={classnames(styles.PopoverContent, !isSearchOpen && styles.showOptions)}>
            {OPTIONS.map(({ condition, id, name, nested }) => (
              <SubaccountOption
                key={name}
                label={name}
                nested={nested}
                onChange={handleChange}
                onOpen={handleSearchToggle}
                selected={condition(subaccount)}
                value={{ id, name }}
              />
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
}

const mapStateToProps = state => ({
  hasSubaccounts: hasSubaccounts(state),
});

export default withSignalOptions(connect(mapStateToProps)(SubaccountFilter));
