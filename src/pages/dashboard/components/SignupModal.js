import React, { useState } from 'react';
import useRouter from 'src/hooks/useRouter';
import { Modal } from 'src/components';
import styles from './SignupModal.module.scss';
import { Panel, Button } from '@sparkpost/matchbox';
import { Close } from '@sparkpost/matchbox-icons';
import _ from 'lodash';

const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="174" height="133" viewBox="0 0 174 133">
    <g fill="none" fillRule="evenodd" transform="translate(-1 -13)">
      <path
        fill="#C5CED6"
        d="M84,29 C114.375661,29 139,53.6243388 139,84 C139,114.375661 114.375661,139 84,139 C53.6243388,139 29,114.375661 29,84 C29,53.6243388 53.6243388,29 84,29 Z M84.5,34 C57.1619049,34 35,56.1619049 35,83.5 C35,110.838095 57.1619049,133 84.5,133 C111.838095,133 134,110.838095 134,83.5 C134,56.1619049 111.838095,34 84.5,34 Z"
      />
      <path
        stroke="#55555A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M41.3333333,93.6666667 C44.8100197,108.778197 56.3464573,120.936715 71.3333333,125.666667"
        opacity=".5"
      />
      <path
        stroke="#37AADC"
        strokeLinecap="round"
        strokeWidth="6"
        d="M60,28 C50.5689875,31.7682393 42.321889,38.0256128 36,46"
      />
      <path
        stroke="#FA6423"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M86.3333333,143.666667 C118.365849,143.666667 144.333333,117.27907 144.333333,84.7283191 C144.333333,81.6468148 144.100613,78.6205444 143.652059,75.6666667"
      />
      <path
        fill="#55555A"
        d="M71.6680582,98.0139538 L60.2001965,86.6769635 C58.5999345,85.0995728 58.5999345,82.5393463 60.2001965,80.957911 C61.7963656,79.3805202 64.387071,79.3805202 65.987333,80.957911 L77.0336423,91.8702192 L102.011644,67.1860765 C103.611906,65.6046412 106.202611,65.6046412 107.802873,67.1860765 C109.399042,68.7675118 109.399042,71.3236937 107.802873,72.905129 L82.391041,98.0179984 C80.9585815,99.4336055 79.0554566,100.214212 77.0295496,100.214212 C74.9995498,100.210167 73.096425,99.4336055 71.6680582,98.0139538 Z"
      />
      <g transform="translate(1 13)">
        <circle cx="36" cy="121" r="4" fill="#FA6423" opacity=".4" />
        <circle cx="156.5" cy="67.5" r="2.5" fill="#FA6423" opacity=".4" />
        <circle cx="30" cy="131" r="2" fill="#FA6423" opacity=".7" />
        <circle cx="142" cy="33" r="4" fill="#FA6423" opacity=".8" />
        <circle cx="148" cy="11" r="2" fill="#37AADC" />
        <circle cx="14" cy="127" r="2" fill="#37AADC" />
        <circle cx="17.5" cy="44.5" r="5.5" fill="#37AADC" opacity=".2" />
        <circle cx="2" cy="39" r="2" fill="#37AADC" />
        <circle cx="18" cy="2" r="2" fill="#37AADC" opacity=".3" />
        <circle cx="170" cy="100" r="4" fill="#37AADC" opacity=".2" />
        <circle cx="153.5" cy="103.5" r="3.5" fill="#37AADC" opacity=".55" />
        <circle cx="160.5" cy="86.5" r="2.5" fill="#55555A" />
        <circle cx="123.5" cy="20.5" r="2.5" fill="#55555A" />
        <circle cx="14" cy="39" r="4" fill="#55555A" />
      </g>
    </g>
  </svg>
);

const SignupModal = () => {
  const { location } = useRouter();
  const [isModalOpen, setModalOpen] = useState(_.get(location, 'state.fromOnboarding', false));
  return (
    <Modal open={isModalOpen}>
      <Panel className={styles.modalContainer}>
        <div className={styles.CloseButton}>
          <Button onClick={() => setModalOpen(false)} flat>
            <Close />
          </Button>
        </div>
        <div className={styles.bodyContainer}>
          <div>
            <Icon />
          </div>
          <div className={styles.SuccessMessage}>Sign Up Complete!</div>
          <div>
            <Button size="large" color="orange" onClick={() => setModalOpen(false)}>
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </Panel>
    </Modal>
  );
};

export default SignupModal;
