import React, { useContext } from 'react'
import BootstrapTable, { ITableColumn } from "../BootstrapTable/BootstrapTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import uuid from 'uuid';
import { Store } from '../../store';
import { Button, Form } from 'react-bootstrap';
import moment from 'moment';
import DateEditor from '../DateEditor/DateEditor';
import ITrade from '../../Interfaces/ITrade';

interface ITradeTableProps {
  Trades: ITrade[]
}

const TradeTable: React.FC<ITradeTableProps> = (props: ITradeTableProps) => {
  const { dispatch, state } = useContext(Store);

  const dateChanged = (value: Date, row: ITrade, fieldName: string): void => {
    const rowTrade: ITrade = row;
    rowTrade[fieldName] = value;
    updateTrade(rowTrade)
  };

  const updateTextField = (value: string, row: ITrade, fieldName: string): void => {
    row[fieldName] = value;
    updateTrade(row);
  }

  const updateTrade = (trade: ITrade): void => {
    dispatch({ type: "UPDATETRADE", payload: trade });
  }

  const groupIdChanged = (value: string, row: ITrade): void => {
    row.GroupId = value;
    updateTrade(row);
  }

  const addTrade = (): void => {
    const trade: ITrade = {
      Id: uuid(),
      Underlying: "",
      TransactionDate: new Date(),
      TransactionType: "Sell To Open",
      Amount: 0,
      Instrument: "Option",
      Notes: ""
    }

    dispatch({ type: "ADDTRADE", payload: trade });
  }
  const columns: ITableColumn[] = [{
    dataField: "TransactionDate", text: "Date", sort: true,
    formatter: (cell: any) => moment(cell).format("MM/DD/YYYY"),
    editorRenderer: (editorProps: any, value: Date, row: ITrade) => (
      <DateEditor
        open={true}
        DateValue={value}
        handleChange={dateChanged}
        Row={row}
        FieldName="TransactionDate"
      />
    )
  }, {
    dataField: "Underlying", text: "Underlying", sort: true, editorRenderer: (editorProps: any, value: string, row: ITrade) => (
      <Form.Control type="text" value={row.Underlying} onChange={(e: any) => updateTextField(e.currentTarget.value, row, "Underlying")} />
    )
  }, {
    dataField: "GroupName", text: "Group", sort: true, editorRenderer: (editorProps: any, value: string, row: ITrade) => (
      <Form.Control
        onChange={(e: any) => groupIdChanged(e.currentTarget.value, row)}
        as="select">
        <option value={""}>{"(none)"}</option>
        {state.groups.map(p => (<option value={p.Id} key={p.Id}>{p.Name}</option>))}
      </Form.Control>
    )
  }];

  return (
    <>
      <BootstrapTable data={props.Trades} columns={columns} keyField="Id" />
      <Button onClick={addTrade}>New Trade</Button>
    </>)
}

export default TradeTable;