import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import SendIcon from '@mui/icons-material/Send';
import MuiAlert from '@mui/material/Alert';
const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

function UserPage({data,rows,setRows,columns}) {    

  return (
    <>   
        <div style={{ height: 600, width: '100%' }}>          
          <DataGrid
              rows={rows}
              columns={columns}
              components={{
              Toolbar: GridToolbar,
              }}
          />
        </div>
    </>
  )
}

export default UserPage
