/*jshint esversion: 6 */
import React, {Component} from "react";
import {Card} from "antd";


class SingleOrder extends Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
    componentDidMount() {
      const {slug} = this.props.match.params;
      console.log(slug);
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
  
    render() {
      return (
        <Card className="gx-card" title="Order">
          
        </Card>
      );
    }
  }

  
export default SingleOrder;

