/*jshint esversion: 9 */
import React from "react";
import {connect} from "react-redux";
// import { Document, Page } from 'react-pdf';
// import { Document, Page } from 'react-pdf/dist/entry.webpack';
// import 'react-pdf/dist/Page/AnnotationLayer.css';

import { Button, Card, Icon, Skeleton } from 'antd';
import {createQuote} from "appRedux/actions/Quotes";
import PdfViewer from 'components/PdfViewer';

// const options = {
//   cMapUrl: 'cmaps/',
//   cMapPacked: true,
// };

class Quote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: {url: ''},
      numPages: null,
      pageNumber: 1,
    };
  }

  extra = () => {
    const {createQuote, order, quote, quoteLoading} = this.props;
    return (<>
      <Button type="primary" size="small" className="gx-mb-0" onClick={() => createQuote(order.id)} loading={quoteLoading}>
        <Icon type="check" /> <span className="gx-ml-2">Send</span>
      </Button>
      <Button type="primary" size="small" className="gx-mb-0" onClick={() => createQuote(order.id)} loading={quoteLoading}>
        <Icon type="download" /> <span className="gx-ml-2">Download</span>
      </Button>
      <Button type="primary" size="small" className="gx-mb-0" onClick={() => createQuote(order.id)} loading={quoteLoading} disabled={quote.accepted}>
        <Icon type="file-pdf" /> <span className="gx-ml-2">Re-Generate</span>
      </Button>
    </>);
  }

  render() {
    // const { file } = this.state;
    const {createQuote, order, orderLoading, quote, quoteLoading} = this.props;
    if(orderLoading && !order) return null;
    return (
      <div>
        <Skeleton loading={orderLoading}>
          {quote?
              <div>
                {/* <iframe title={`pdfviewer`} className="gx-w-100" style={{height: "800px"}} src={quote.file} /> */}
                <Card type="inner" title={`Quote ${quote.invoice_no}`} extra={this.extra()}>
                  <div className="">
                    <PdfViewer file={quote.file} />
                  </div>
                </Card>
              </div>
              : <div className="gx-d-flex gx-justify-content-center gx-w-100">
                <div className="gx-w-md-25">
                  {/* <Button type="success">Create Quote</Button> */}
                  <Button type="primary" block onClick={() => createQuote(order.id)} loading={quoteLoading}>
                    <Icon type="file-pdf" /> <span className="gx-ml-2">Generate Quote</span>
                  </Button>
                </div>
              </div>
          }
        </Skeleton>
      </div>
    );
  }
}

const mapStateToProps = ({ordersData, quotesData}) => {
  const {order, orderLoading} = ordersData;
  const {quote, quoteLoading} = quotesData;
  return {order, orderLoading, quote, quoteLoading};
};

export default connect(mapStateToProps, {
  createQuote, 
})(Quote);
