import React from 'react';
import { connect } from 'react-redux';
import { Grid, UnstyledLink } from '@sparkpost/matchbox';
import { getUsage } from 'src/actions/account';
import { LoadingSVG } from 'src/components/loading/Loading';
import { selectMonthlyRecipientValidationUsage } from 'src/selectors/accountBillingInfo';
import { calculateNewCost } from 'src/pages/billing/helpers/totalRecipientValidationCost';
import styles from './UploadedListForm.module.scss';
import { formatFullNumber } from 'src/helpers/units';
import RVPriceModal from './RVPriceModal';

export class UploadedListForm extends React.Component {
  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    this.props.getUsage();
  }

  handleModal = isModalOpen => () => {
    this.setState({ isModalOpen });
  };

  render() {
    const { currentUsage, job, loading } = this.props;
    const { addressCount, filename } = job;

    return (
      <div className={styles.formContainer}>
        <h2>{filename}</h2>
        <p className={styles.descriptionParagraph}>
          <span>Your list has been uploaded successfully and the cost to validate is below. </span>
          <strong>Would you like to proceed?</strong>
        </p>
        <Grid>
          <Grid.Column xs={12} md={4}>
            <div>Your list has</div>
            <div className={styles.CountBox}>
              <span className={styles.Number} data-id="recipient-list-address-count">
                {formatFullNumber(addressCount)}
              </span>{' '}
              emails
            </div>
          </Grid.Column>
          <Grid.Column xs={12} mdOffset={1} md={7}>
            <div>and will cost</div>
            {loading ? (
              <div className={styles.LoadingCostContainer}>
                <LoadingSVG size="Small" />
              </div>
            ) : (
              <>
                <div className={styles.Cost}>{calculateNewCost(currentUsage, addressCount)}</div>
                <UnstyledLink onClick={this.handleModal(true)}>
                  How was this calculated?
                </UnstyledLink>
              </>
            )}
          </Grid.Column>
        </Grid>

        {<RVPriceModal open={this.state.isModalOpen} handleOpen={this.handleModal} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUsage: selectMonthlyRecipientValidationUsage(state),
  loading: state.account.usageLoading,
});

export default connect(mapStateToProps, { getUsage })(UploadedListForm);
