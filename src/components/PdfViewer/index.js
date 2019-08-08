/*jshint esversion: 9 */
import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import PropTypes from 'prop-types';

class PdfViewer extends Component {
  constructor(props) {
    this.state = {
        numPages: null,
        pageNumber: 1,
    };
  }
  
  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  changePage = offset => this.setState(prevState => ({
    pageNumber: prevState.pageNumber + offset,
  }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { numPages, pageNumber } = this.state;
    const { file } = this.props;

    return (
      <React.Fragment>
        <Document
          file={file}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={this.previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={this.nextPage}
          >
            Next
          </button>
        </div>
      </React.Fragment>
    );
  }
}

PdfViewer.propTypes = {
  file: PropTypes.string.isRequired
};

export default PdfViewer;