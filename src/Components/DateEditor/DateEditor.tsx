import React from "react";

import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  DateValue: Date;
  Row: any;
  FieldName: string;
  handleChange(date: Date, row: any, fieldName: string): void;
  open: boolean;
}

export default class DateEditor extends React.Component<IProps, {}> {
  public render() {
    return (
      <DatePicker
        startOpen={this.props.open}
        value={moment(this.props.DateValue).format("MM/DD/YYYY")}
        selected={this.props.DateValue}
        onChange={(value: Date) =>
          this.props.handleChange(moment(value).startOf('day').toDate(), this.props.Row, this.props.FieldName)
        }
      />
    );
  }
}
