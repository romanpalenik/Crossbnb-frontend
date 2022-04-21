import { createStyles, Navbar, Text } from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";

interface NavbarProps {
  opened: boolean;
}

export const AppNavbar = ({ opened }: NavbarProps) => {
  const useStyles = createStyles((theme) => ({
    navbar: {
      [theme.fn.largerThan("sm")]: {
        display: "none",
      },
    },
  }));

  const { classes } = useStyles();
  return (
    <Navbar
      className={classes.navbar}
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ base: "75%", sm: 0 }}
    >
      <Text>Application navbar</Text>
    </Navbar>
  );
};
