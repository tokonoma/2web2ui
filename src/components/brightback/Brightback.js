import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { prepBrightback } from 'src/actions/brightback';
import { selectBrightbackData } from 'src/selectors/brightback';
import BrightbackPropTypes from './Brightback.propTypes';
import { configFlag } from 'src/helpers/conditions/config';
export class Brightback extends React.Component {
  componentDidMount() {
    const { data, prepBrightback, enabled } = this.props;
    if (enabled) {
      prepBrightback(data);
    }
  }

  getRenderProps() {
    const { valid, url, condition = true, enabled } = this.props;

    if (valid && condition && enabled) {
      return {
        to: url,
        enabled: true
      };
    }

    return {};
  }

  render() {
    return this.props.render(this.getRenderProps());
  }
}

Brightback.propTypes = BrightbackPropTypes;

const mapStateToProps = (state, props) => ({
  valid: state.brightback.valid,
  url: state.brightback.url,
  data: selectBrightbackData(state, props),
  enabled: configFlag('brightback.enabled')(state)
});
export default withRouter(connect(mapStateToProps, { prepBrightback })(Brightback));
