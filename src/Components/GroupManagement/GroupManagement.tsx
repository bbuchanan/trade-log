import React, { useContext } from 'react'
import BootstrapTable, { ITableColumn } from "../BootstrapTable/BootstrapTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ITradeGroup from '../../Interfaces/ITradeGroup';
import uuid from 'uuid';
import { Store } from '../../store';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface IGroupManagementProps {
}

const GroupManagement: React.FC<IGroupManagementProps> = (props: IGroupManagementProps) => {
  const { dispatch, state } = useContext(Store);

  const addGroup = (): ITradeGroup => {
    const group: ITradeGroup = {
      Id: uuid(),
      Name: "New Group",
      Active: true
    }

    dispatch({ type: "ADDGROUP", payload: group });
    return group;
  }

  const deleteGroup = (id: string): void => {
  }

  const editGroup = (id: string): void => {
  }

  const newGroup = () => {
    editGroup(addGroup().Id);
  }

  const deleteButton = (cell: any, row: any) => {
    return (
      <Button onClick={() => deleteGroup(row.Id)}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    );
  };

  const textFieldChanged = (value: string, row: ITradeGroup, fieldName: string): void => {
    const group: ITradeGroup = row;
    group[fieldName] = value;
    dispatch({ type: "UPDATEGROUP", payload: group });
  }

  const updateActive = (value: boolean, row: any): void => {
    const group: ITradeGroup = row;
    group.Active = value;
    dispatch({ type: "UPDATEGROUP", payload: group });
  }

  const columns: ITableColumn[] = [
    {
      dataField: "Name", text: "Name", sort: true,
      editorRenderer: (editorProps: any, value: string, row: ITradeGroup) => (
        <Form.Control
          type="text"
          value={row.Name}
          onChange={(e: any) =>
            textFieldChanged(e.currentTarget.value, row, "Name")
          }
        />
      )
    },
    {
      dataField: "Active", text: "Active", sort: true, formatter: (val: boolean) => val ? "Yes" : "No",
      editorRenderer: (editorProps: any, value: boolean, row: ITradeGroup) => (
        <InputGroup.Checkbox checked={row.Active} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateActive(e.currentTarget.checked, row)}>
        </InputGroup.Checkbox>
      )
    },
    {
      dataField: "Delete",
      text: "X",
      sort: false,
      formatter: deleteButton
    }
  ];

  return (
    <>
      <BootstrapTable
        keyField="Id"
        data={state.groups}
        columns={columns}
      />
      <Button onClick={() => newGroup()}>Add Group</Button>
    </>
  )
}

export default GroupManagement;