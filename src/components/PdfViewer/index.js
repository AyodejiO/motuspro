/*jshint esversion: 9 */
import React, { Component } from 'react';
import { Pagination } from 'antd';
import { Document, Page } from 'react-pdf';
import PropTypes from 'prop-types';

class PdfViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        file: {url: null, headers: { withCredentials: true }},
        numPages: null,
        pageNumber: 1,
    };
  }

  componentDidMount() {
    const {file} = this.props;
    if(file) {
      this.setState({
        file: {
          ...this.state.file,
          url: file
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {file} = this.props;
    if(file) {
      this.setState({
        file: {
          ...this.state.file,
          url: file
        }
      });
    }
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

  handleChangePage = pageNumber => this.setState({
    pageNumber,
  });

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { file, numPages, pageNumber } = this.state;
    // const { file } = this.props;
  if(!file.url) return null;
    return (
      <React.Fragment>
        <div className="gx-d-flex gx-justify-content-center gx-w-100">
          <div>
            {/* Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}   */}

            {numPages === null? null : <Pagination
              simple
              size="small"
              current={pageNumber} 
              total={numPages} 
              pageSize={1}
              onChange={this.handleChangePage}
            />}
          </div>
          {/* <button
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
          </button> */}
        </div>
        <br/>
        <div className="gx-d-flex gx-justify-content-center gx-w-100">
          <Document
            // className="gx-w-100"
            file={file}
            // renderMode="svg"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
        
      </React.Fragment>
    );
  }
}

PdfViewer.propTypes = {
  file: PropTypes.string.isRequired
};

export default PdfViewer;