import { Paper, Stack } from "@mui/material";
import ControlSection from "./ControlSection";
import TendersTable from "./Table";

function TendersData() {
  return (
    <Stack>
      <Paper>
        <ControlSection />
        <TendersTable />
        {/*   - tender statuses   */}
        {/*   - tenders table   */}
        {/* end paper */}
      </Paper>
    </Stack>
  );
}

export default TendersData;
