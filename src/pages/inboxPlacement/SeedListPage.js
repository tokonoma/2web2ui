import React from 'react';
import { connect } from 'react-redux';
import { getSeedList } from 'src/actions/inboxPlacement';
import { selectReferenceSeed } from 'src/selectors/inboxPlacement';
import { showAlert } from 'src/actions/globalAlert';
import { ApiErrorBanner, ButtonWrapper, CopyToClipboard, Loading } from 'src/components';
import SaveCSVButton from 'src/components/collection/SaveCSVButton';
import { PageLink } from 'src/components/links';
import { CodeBlock, Grid, Page, Panel, Stack } from 'src/components/matchbox';
import { Bold } from 'src/components/text';

export class SeedListPage extends React.Component {
  componentDidMount() {
    this.props.getSeedList();
  }

  renderError = () => {
    const { error, getSeedList } = this.props;

    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading seedlist.'}
        errorDetails={error.message}
        reload={getSeedList}
      />
    );
  };

  renderContents = () => {
    const { seeds, referenceSeed } = this.props;
    const csvData = seeds.map(address => ({ 'Seed Address': address }));

    return (
      <>
        <Panel.Section>
          <Grid>
            <Grid.Column sm={12} md={10} lg={8}>
              To use Seedlist data for deliverability, first add the following email addresses to
              your list. Make sure that the reference email address <Bold>{referenceSeed}</Bold> is
              the first one in your list.
            </Grid.Column>
          </Grid>
        </Panel.Section>
        <Panel.Section>
          <Stack>
            <Grid>
              <Grid.Column sm={12} md={10} lg={8}>
                <Stack>
                  <p>
                    Next, set up your campaign. Make sure you are sending to the full list of seed
                    email addresses. For best results, set the <Bold>`X-SP-Inbox-Placement`</Bold>{' '}
                    header with a unique value such as <Bold>"my-first-test"</Bold>. If you don't,
                    you may run into issues if your have more than one test running with the same
                    subject line.
                  </p>
                  <p>
                    Send the email and jump back to{' '}
                    <PageLink to="/inbox-placement">Inbox Placement</PageLink> to see the results.
                  </p>
                </Stack>
              </Grid.Column>
            </Grid>
            <CodeBlock code={seeds.join('\n')} />
          </Stack>
        </Panel.Section>
        <Panel.Section>
          <ButtonWrapper>
            <CopyToClipboard variant="primary" value={seeds.join(',')}>
              Copy List
            </CopyToClipboard>
            <SaveCSVButton
              data={csvData}
              saveCsv={true}
              caption="Download CSV"
              filename="sparkpost-seedlist.csv"
              variant="secondary"
            />
          </ButtonWrapper>
        </Panel.Section>
      </>
    );
  };

  render() {
    const { pending, error } = this.props;

    if (pending) {
      return <Loading />;
    }

    return (
      <Page
        breadcrumbAction={{
          component: PageLink,
          content: 'All Tests',
          to: '/inbox-placement',
        }}
        title="Create an Inbox Placement Test"
      >
        {error ? this.renderError() : <Panel title="Seed Addresses">{this.renderContents()}</Panel>}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  seeds: state.inboxPlacement.seeds,
  pending: state.inboxPlacement.seedsPending,
  error: state.inboxPlacement.seedsError,
  referenceSeed: selectReferenceSeed(state),
});
export default connect(mapStateToProps, { getSeedList, showAlert })(SeedListPage);
