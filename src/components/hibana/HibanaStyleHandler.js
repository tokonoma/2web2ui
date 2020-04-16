import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-webpack-loader-syntax
import styles from '!!raw-loader!@sparkpost/matchbox/styles.css';
import { useHibana } from 'src/context/HibanaContext';

const baseStyles = `
${styles}

html {
  font-size: 16px;
}

@media screen and (min-width: 960px) {
  html {
    font-size: 18px;
  }
}

@media screen and (min-width: 1470px) {
  html {
    font-size: 20px;
  }
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #aaa;
}

::-moz-placeholder {
  /* Firefox 19+ */
  color: #aaa;
}

:-ms-input-placeholder {
  /* IE 10+ */
  color: #aaa;
}

:-moz-placeholder {
  /* Firefox 18- */
  color: #aaa;
}

hr {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #e1e1e6;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  appearance: none;
}

input[type='number'] {
  appearance: textfield;
}

code {
  font-size: 1rem;
}
`;

export default function HibanaStyleHandler() {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const styleEl = document.querySelector('#style-portal');

  // Could have used React Helmet here, but Helmet was always appending styles to the end of the `<head/>`.
  // This was ultimately causing CSS module CSS to be overwritten inappropriately, introducing bugs.
  // By targeting a particular `<style/>` tag already in the `<head/>`, these base styles appear *before*
  // the CSS module `<style/>` tags render in the `<head/>`.
  if (!isHibanaEnabled) {
    return ReactDOM.createPortal(baseStyles, styleEl);
  }

  return null;
}
