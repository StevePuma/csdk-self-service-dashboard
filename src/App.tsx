import React, { useState, useRef } from "react";
import { Button, IconButton, Card, CardContent, CardActions } from "@mui/material";
import GridLayout, { WidthProvider, Layout } from "react-grid-layout";
import html2canvas from "html2canvas";
import DeleteIcon from "@mui/icons-material/Delete";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import "react-resizable/css/styles.css";

// Sisense Components
import { DashboardWidget } from "@sisense/sdk-ui";
import * as DM from "./sample-ecommerce";

// Libraries for Charts and Filters also containing Sisense components
import ChartLibrary from "./ChartLibrary";

const ResponsiveGridLayout = WidthProvider(GridLayout);

function App(): JSX.Element {
  const [isChartLibraryOpen, setIsChartLibraryOpen] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState<
    {
      widgetOid: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
    }[]
  >([]);
  const exportRef = useRef(null);

  const openChartLibrary = () => {
    setIsChartLibraryOpen(true);
  };

  const closeChartLibrary = () => {
    setIsChartLibraryOpen(false);
  };

  const handleSelectCharts = (selectedChartOids: string[]) => {
    const newCharts = selectedChartOids.map((widgetOid) => ({
      widgetOid,
      position: { x: 0, y: 0 },
      size: { width: 5, height: 7 },
    }));
    setSelectedCharts((prevSelectedCharts) => [...prevSelectedCharts, ...newCharts]);
    window.dispatchEvent(new Event("resize"));
  };

  const handleDeleteChart = (index: number) => {
    setSelectedCharts((prevSelectedCharts) => {
      const updatedCharts = [...prevSelectedCharts];
      updatedCharts.splice(index, 1);
      window.dispatchEvent(new Event("resize"));
      return updatedCharts;
    });
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    const updatedCharts = selectedCharts.map((chart, index) => ({
      ...chart,
      position: { x: newLayout[index].x, y: newLayout[index].y },
      size: { width: newLayout[index].w, height: newLayout[index].h },
    }));
    setSelectedCharts(updatedCharts);
    window.dispatchEvent(new Event("resize"));
  };

  const exportToPDF = () => {
    const dashboardContainer = document.getElementById("dashboard-container");

    if (dashboardContainer) {
      const originalBoxShadow = dashboardContainer.style.boxShadow;

      dashboardContainer.style.boxShadow = "none";

      html2canvas(dashboardContainer).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "dashboard-export.png";
            link.click();
          }
        });

        dashboardContainer.style.boxShadow = originalBoxShadow;
      });
    }
  };

  return (
    <div>
      <div>
        <Button
          onClick={openChartLibrary}
          variant="contained"
          color="info"
          style={{ color: "white", marginBottom: "16px" }}
        >
          Build Your Report
        </Button>
        <Button
          onClick={exportToPDF}
          variant="contained"
          color="info"
          style={{
            color: "white",
            marginLeft: "8px",
            marginBottom: "16px",
          }}
        >
          Export
        </Button>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ position: "relative", flex: 1, marginRight: "16px" }}>
          <div
            ref={exportRef}
            id="dashboard-container"
            style={{
              position: "relative",
              width: "100%",
              height: "calc(100vh - 230px)",
              overflow: "auto",
              backgroundColor: "white",
              border: "2px solid transparent",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ResponsiveGridLayout
              className="layout"
              layout={selectedCharts.map((chart, index) => ({
                i: index.toString(),
                x: chart.position.x,
                y: chart.position.y,
                w: chart.size.width,
                h: chart.size.height,
                static: false,
              }))}
              cols={12}
              rowHeight={30}
              width={1200}
              onLayoutChange={(layout) => handleLayoutChange(layout)}
              useCSSTransforms={true}
              preventCollision={false}
              draggableHandle=".drag-handle"
            >
              {selectedCharts.map((chart, index) => (
                <div
                  key={index}
                  data-grid={{
                    x: chart.position.x,
                    y: chart.position.y,
                    w: chart.size.width,
                    h: chart.size.height,
                  }}
                  style={{ overflow: "visible", position: "relative" }}
                >
                  <Card
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      className="drag-handle"
                      style={{
                        cursor: "move",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 10,
                        padding: "4px",
                      }}
                    >
                      <DragHandleIcon />
                    </div>
                    <CardContent style={{ flex: 1, position: "relative" }}>
                      <DashboardWidget
                        widgetOid={chart.widgetOid}
                        dashboardOid={"DashboardID"}
                        drilldownOptions={{
                          drilldownDimensions: [
                            DM.Commerce.Gender,
                            DM.Commerce.Condition,
                            DM.Commerce.DayOfWeek
                          ],
                        }}
                      />
                    </CardContent>
                    <CardActions
                      style={{
                        justifyContent: "flex-end",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                      }}
                    >
                      <IconButton
                        onClick={() => handleDeleteChart(index)}
                        style={{
                          color: "#888", // Off-grey color
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>

          {isChartLibraryOpen && (
            <ChartLibrary onSelectCharts={handleSelectCharts} onClose={closeChartLibrary} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
