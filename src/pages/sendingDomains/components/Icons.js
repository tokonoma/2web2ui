import React from 'react';
import { Check, Error } from '@sparkpost/matchbox-icons';

import styles from './Icons.module.scss';

export const VerifiedIcon = () => <Check size={16} className={styles.GreenCheck}/>;
VerifiedIcon.displayName = 'VerifiedIcon';

export const ErrorIcon = () => <Error size={16} className={styles.RedError}/>;
ErrorIcon.displayName = 'ErrorIcon';
