import React from 'react';
import { Check, CheckDecagram, Error } from '@sparkpost/matchbox-icons';

import styles from './Icons.module.scss';

export const AutoVerifiedIcon = () => <CheckDecagram size={18} className={styles.GreenStamp}/>;
AutoVerifiedIcon.displayName = 'AutoVerifiedIcon';

export const VerifiedIcon = () => <Check size={16} className={styles.GreenCheck}/>;
VerifiedIcon.displayName = 'VerifiedIcon';

export const ErrorIcon = () => <Error size={16} className={styles.RedError}/>;
ErrorIcon.displayName = 'ErrorIcon';
