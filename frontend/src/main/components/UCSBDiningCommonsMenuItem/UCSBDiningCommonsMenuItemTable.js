import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import OurTable, { ButtonColumn } from "main/components/OurTable";

// Utils
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/UCSBDiningCommonsMenuItemUtils"
import { hasRole } from "main/utils/currentUser";

export default function UCSBDiningCommonsMenuItemTable({
  items,
  currentUser,
  testIdPrefix = "UCSBDiningCommonsMenuItemTable"
}) {
  const navigate = useNavigate();
  const editCallback = (cell) => {
    navigate(`/UCSBDiningCommonsMenuItem/edit/${cell.row.values.id}`);
  }

  // Stryker disable all
  const deleteMutation = useBackendMutation(
    cellToAxiosParamsDelete,
    { onSuccess: onDeleteSuccess },
    ["/api/ucsbdates/all"]
  );
  // Stryker restore all

  // Stryker disable next-line all
  const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

  const columns = [
    {
      Header: 'id',
      accessor: 'id'
    },
    {
      Header: 'Dining Commons Code',
      accessor: 'diningCommonsCode'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Station',
      accessor: 'station'
    }
  ];

  // show editing buttons if admin
  if (hasRole(currentUser, "ROLE_ADMIN")) {
    columns.push(ButtonColumn(
      "Edit",
      "primary",
      editCallback,
      testIdPrefix
    ))

    columns.push(ButtonColumn(
      "Delete",
      "danger",
      deleteCallback,
      testIdPrefix
    ))
  }

  // render table
  return <OurTable
    data={items}
    columns={columns}
    testid={testIdPrefix}
  />;
}