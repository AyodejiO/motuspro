/*jshint esversion: 9 */
import React from "react";
import { Button, Card } from 'antd';

class Quote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onChange(evt) {
    const { form } = this.props;
    const note = evt.editor.getData();
    form.setFieldsValue({
      note,
    });
  }

  componentDidMount() {
    const {note} = this.props.order;
    this.setState({
      note,
    });
  }

  componentDidUpdate() {
    const { form, order } = this.props;
    const {note} = order;
    const tempNote = this.state.note;
    const formNote = form.getFieldValue('note');
    if(note !== tempNote) {
      console.log(this.state.note, formNote, this.props.order.note);
      this.setState({
        note,
      });
      form.setFieldsValue({
        note,
      }, () => {
        console.log("form updated");
        console.log(form.getFieldValue('note'));
      });
    }
  }
  
  render() {
    const {loading, order} = this.props;
    if(!loading && !order) return null;
    return (
      <div>
        <Skeleton loading={loading}>
          
        </Skeleton>
      </div>
    );
  }
}

export default Quote;