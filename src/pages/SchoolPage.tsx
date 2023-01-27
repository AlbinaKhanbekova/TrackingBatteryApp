import { Box, CircularProgress, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import Table from '../components/Table/Table';
import { School } from '../types/battery';
import { ResponseError } from '../types/error';

interface ISchoolPage {
  data: School[] | null;
  error: ResponseError | null;
}

export const SchoolPage = ({ data, error }: ISchoolPage) => {
  if (error === null && data === null) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" height={400}>
        <Typography variant="h6" color={red[800]}>
          Oops! Something went wrong. Please refresh the page.
        </Typography>
        {error?.message && <Typography variant="caption">{error?.message}</Typography>}
      </Box>
    );
  }

  return (
    <div>
      <Typography sx={{ py: 3 }}>
        This table contains information about devices from schools. You can find tablet batteries in need of replacement
        at the top of the table.
      </Typography>
      {data && <Table data={data} />}
    </div>
  );
};
