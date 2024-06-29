import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { useGetDashboardModel, DashboardWidget } from "@sisense/sdk-ui";

interface ChartLibraryProps {
  onSelectCharts: (selectedChartOids: string[]) => void;
  onClose: () => void;
}

const ChartLibrary: React.FC<ChartLibraryProps> = ({
  onSelectCharts,
  onClose,
}) => {
  const [selectedChartOids, setSelectedChartOids] = useState<string[]>([]);

  const { dashboard, isLoading, isError, error } = useGetDashboardModel({
    dashboardOid: "DashboardID",
    includeWidgets: true,
  });

  const handleToggleChart = (chartOid: string) => {
    setSelectedChartOids((prevSelectedChartOids) => {
      if (prevSelectedChartOids.includes(chartOid)) {
        return prevSelectedChartOids.filter((oid) => oid !== chartOid);
      } else {
        return [...prevSelectedChartOids, chartOid];
      }
    });
  };

  const handleAddToDashboard = () => {
    onSelectCharts(selectedChartOids);
    onClose();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (dashboard) {
    return (
      <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth={"md"}>
        <DialogTitle>Choose a Chart</DialogTitle>
        <DialogContent
          dividers={true}
          sx={{
            display: "inline-grid",
            gridTemplateColumns: "minmax(100px, 1fr) 15px",
            gridAutoRows: "minmax(300px, auto)",
            gap: "10px",
            overflow: "auto",
          }}
        >
          {dashboard.widgets?.map((widget) => (
            <React.Fragment key={widget.oid}>
              <div style={{ boxSizing: "border-box" }}>
                <Divider />
                <DashboardWidget
                  widgetOid={widget.oid}
                  dashboardOid={dashboard.oid}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <Checkbox
                  checked={selectedChartOids.includes(widget.oid)}
                  onChange={() => handleToggleChart(widget.oid)}
                />
              </div>
            </React.Fragment>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAddToDashboard} color="primary">
            Add to Dashboard
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return null;
};

export default ChartLibrary;
