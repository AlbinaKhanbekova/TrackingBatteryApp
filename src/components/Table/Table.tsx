import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { red } from '@mui/material/colors';
import { School } from '../../types/battery';

const Row = ({ row }: { row: School }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.academyId}
        </TableCell>
        <TableCell align="right">{row.numberOfBatteryIssues}</TableCell>
        <TableCell align="right">{row.devices.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Device Serial Number</TableCell>
                    <TableCell>Consumption</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.devices.map((device) => (
                    <TableRow key={device.serialNumber}>
                      <TableCell component="th" scope="row">
                        {device.serialNumber}
                      </TableCell>
                      <TableCell style={device.isUnhealthy ? { background: red[300] } : {}}>
                        {Math.round(device.averageConsumption * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

interface ICollapsibleTable {
  data: School[];
}

export default function CollapsibleTable({ data }: ICollapsibleTable) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>School ID</TableCell>
            <TableCell align="right">Number of unhealthy devices</TableCell>
            <TableCell align="right">Total devices</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <Row key={d.academyId} row={d} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
