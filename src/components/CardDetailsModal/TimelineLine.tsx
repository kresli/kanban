import { blueGrey } from "@mui/material/colors";

export function TimelineLine() {
  return (
    <div
      className="TimelineLine"
      style={{
        position: "absolute",
        top: 100,
        bottom: 20,
        left: 54,
        width: 2,
        backgroundColor: blueGrey[50],
        zIndex: 0,
      }}
    />
  );
}
