import React, { useState } from 'react'
import { Table } from 'react-bootstrap';

export interface ITableColumn {
  dataField: string;
  text: string;
  sort: boolean;
  formatter?: any;
  editorRenderer?: any;
  style?: any;
}

interface BootstrapTableProps {
  columns: ITableColumn[];
  data: any;
  keyField: string;
}

const BootstrapTable: React.FC<BootstrapTableProps> = (props: BootstrapTableProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editRow, setEditRow] = useState<number>(-1);
  const [editColumn, setEditColumn] = useState<number>(-1);

  const editStart = (rowIndex: number, colIndex: number): void => {
    // make sure this is an editable column.
    if (props.columns[colIndex].editorRenderer) {
      setEditing(true);
      setEditRow(rowIndex);
      setEditColumn(colIndex);
    } else {
      editStop();
    }
  }

  const editStop = (): void => {
    setEditing(false);
    setEditRow(-1);
    setEditColumn(-1);
  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr key="header">
            {props.columns.map(c => (
              <th key={c.text}>{c.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((data: any, dataIndex: number) => {
            return (<tr key={data[props.keyField]}>
              {props.columns.map((col: ITableColumn, colIndex: number) => {
                if (editing && editRow === dataIndex && editColumn === colIndex) {
                  // invoke edit mode.
                  return (<td onBlur={editStop} key={colIndex}>{col.editorRenderer("", data[col.dataField], data)}</td>)
                } else {
                  return col.formatter === undefined ? (<td key={colIndex} onClick={() => editStart(dataIndex, colIndex)}>{data[col.dataField]}</td>)
                    : (<td key={colIndex} onClick={() => editStart(dataIndex, colIndex)}>{col.formatter(data[col.dataField], data)}</td>)
                }
              })}
            </tr>)
          })}
        </tbody>
      </Table>
    </>)
}

export default BootstrapTable;