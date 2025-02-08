import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router";
import { Navbar } from "src/components/Navbar";

export function Page() {
  return (
    <Box
      position="fixed"
      width="100vw"
      height="100vh"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      boxSizing="border-box"
    >
      {/* <Mainbar /> */}
      <Stack direction="row" flexGrow={1} height="100%" overflow="auto">
        <Navbar />
        <Box flexGrow={1} height="100%" overflow={"visible"}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
}
