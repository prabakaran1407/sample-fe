import AgDataGrid from '../../../../components/AG-GRID/DataGrid/AgDataGrid';
import GetHeaderParams from '../../../../components/CustomCellAgGrid/CustomHeaderValue';
import CustomCellRenderValues from '../../../../components/CustomCellAgGrid/CustomCellRenderValues';
import {
  ActionConfirmation,
  ActionItems,
  ContainerBoxV2,
} from '../../../../components/MUI/mui.index';
import { ColDef } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import {
  deleteEnterprise,
  getAllEnterprise,
} from '../../../../../src/services/admin/mdm/policies.service';
import { ACTION_ICON_TYPES } from '../../../../../src/data/AppConst';
import React from 'react';
import mdmService from '../../../../../src/services/super-admin/mdm/mdmservice.tsx';

interface Organization {
  _id: string;
  organizationName: string;
}
const MappingTable = (props?: any) => {
  const [_enterprisesList, setEnterprisesList] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  async function getEnterprise() {
    const enterprises = await getAllEnterprise();
    setEnterprisesList(enterprises?.data?.enterprises);
  }
  const [orgList, setOrgList] = useState<Organization[]>([]);

  async function GetOrgList() {
    try {
      const response = await mdmService.getAllOrg();
      setOrgList(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching organization list', error);
    }
  }
  console.log(orgList, 'orgList');

  useEffect(() => {
    GetOrgList();
  }, []);

  async function handleDeleteEnterprise() {
    if (selectedRow?.name) {
      await deleteEnterprise(selectedRow?.name);
      setOpenConfirmation(false);
      getEnterprise();
    }
  }

  function handleDelete(e: any) {
    setSelectedRow(e);
    setOpenConfirmation(true);
  }

  useEffect(() => {
    getEnterprise();
  }, [props?.createFlag]);

  const columnDefs: ColDef[] = [
    {
      headerName: 'Enterprise Id',
      field: 'enterprise_id',
      filter: true,
      width: 400,
      cellStyle: { textTransform: 'capitalize' },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'enterprise_id',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Organization Name',
      field: 'organizationName',
      filter: true,
      width: 400,
      cellStyle: { textTransform: 'capitalize' },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'organizationName',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Actions',
      field: '',
      width: 200,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          // can_cancel: true,
          can_delete: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleDelete: handleDelete,
      },
      pinned: 'right',
      ...GetHeaderParams({
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }),
    },
  ];
  return (
    <>
      <ContainerBoxV2>
        <ActionConfirmation
          title={'Delete Enterprise'}
          open={openConfirmation}
          message={`Are you sure you want to delete ${selectedRow?.organizationName} Enterprise?`}
          confirmAction={() => {
            handleDeleteEnterprise();
          }}
          onClose={() => {
            setOpenConfirmation(false);
            setSelectedRow(null);
          }}
          children={<></>}
        />
        <AgDataGrid
          rowData={orgList}
          columnDefs={columnDefs}
          TableHeight={60}
          rowHeight={50}
          handleCellClick={undefined}
          loading={false}
          disableClickSelectionRenderers={false}
          serverSidePagination={false}
          noDataTxt='No Records Found'
        />
      </ContainerBoxV2>
    </>
  );
};

export default React.memo(MappingTable);
