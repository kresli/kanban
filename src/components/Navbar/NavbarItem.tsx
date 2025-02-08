import { Box, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { NavLink } from "react-router";

interface Props {
  to: string;
  title: string;
  actions?: React.ReactNode;
}

export function NavbarItem(props: Props) {
  return (
    <NavLink to={props.to} style={{ textDecoration: "none", width: "100%" }}>
      {({ isActive }) => (
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            borderRadius: 1,
            flex: 1,
            justifyItems: "space-between",
            px: 2,
            py: 1,
            color: blueGrey[900],
            bgcolor: isActive ? blueGrey[300] : "transparent",
            ":hover": {
              bgcolor: blueGrey[300],
              "& .actions": {
                visibility: "visible",
              },
            },
          }}
        >
          <Typography variant="body1" style={{ flex: 1 }}>
            {props.title}
          </Typography>
          <Box
            className="actions"
            sx={{ visibility: "hidden" }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {props.actions}
          </Box>
        </Box>
      )}
    </NavLink>
  );
}
