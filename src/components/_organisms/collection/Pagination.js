import React, { Component } from 'react';
import { Pagination } from '@sparkpost/matchbox';
import styles from './Pagination.module.scss';
import { DEFAULT_PER_PAGE_BUTTONS } from 'src/constants';
import PerPageButtons from './PerPageButtons';
import SaveCSVButton from './SaveCSVButton';


class CollectionPagination extends Component {

  renderPageButtons() {
    const { data, perPage, currentPage, pageRange, onPageChange } = this.props;

    if (data.length <= perPage) {
      return null;
    }

    return (
      <Pagination
        pages={Math.ceil(data.length / perPage)}
        pageRange={pageRange}
        currentPage={currentPage}
        onChange={onPageChange}
      />
    );
  }

  render() {
    const { data, perPage, perPageButtons, onPerPageChange, saveCsv, currentPage } = this.props;
    if (!currentPage) { return null; }

    return (
      <div>
        <div className={styles.PageButtons}>
          {this.renderPageButtons()}
        </div>
        <div className={styles.PerPageButtons}>
          <PerPageButtons
            totalCount={data.length}
            data = {data}
            perPage= {perPage}
            perPageButtons={perPageButtons}
            onPerPageChange={onPerPageChange}
          />
          <SaveCSVButton data = {data} saveCsv = {saveCsv}/>
        </div>
      </div>
    );
  }
}

CollectionPagination.defaultProps = {
  pageRange: 5,
  perPageButtons: DEFAULT_PER_PAGE_BUTTONS,
  saveCsv: true
};

export default CollectionPagination;
