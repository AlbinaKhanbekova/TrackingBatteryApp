import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from 'react';
import { SchoolPage } from './pages/SchoolPage';
import { getBatteryData } from './service/api/battery.service';
import { getSchoolsWithUnhealthyDevices } from './service/calculations/battery';
import { School } from './types/battery';
import { ResponseError } from './types/error';
import Typography from '@mui/material/Typography';
import { Container, Box, AppBar, Toolbar } from '@mui/material';

function App() {
  const [schoolData, setSchoolData] = useState<School[] | null>(null);
  const [error, setError] = useState<ResponseError | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error: err } = await getBatteryData();

      if (err) {
        setError(err);
      }

      if (data) {
        const schools = getSchoolsWithUnhealthyDevices(data);

        setSchoolData(schools);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="h1" gutterBottom>
            Battery Tracking
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <SchoolPage data={schoolData} error={error} />
        </Box>
      </Container>
    </>
  );
}

export default App;
