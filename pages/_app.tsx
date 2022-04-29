import type { AppProps } from "next/app";
import { AppShell, MantineProvider } from "@mantine/core";
import { useState } from "react";
import AppHeader from "../components/partials/header/header";
import { AppNavbar } from "../components/partials/navbar/navbar";
// Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }: AppProps) {
  const [opened, setOpened] = useState(false);

  return (
    // provider to use components
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#e47271",
            "#e47271",
            "#e47271",
            "#e47271",
            "#e47271",
            "#e47271",
            "#e47271",
            "#e47271",
            "#e47271",
            "#e47271",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AppShell
          navbarOffsetBreakpoint="sm"
          navbar={<AppNavbar opened={opened}></AppNavbar>}
          header={<AppHeader opened={opened} setOpened={setOpened}></AppHeader>}
          fixed
          style={{
            width: "90%",
          }}
        >
          <div>
            <Component {...pageProps} />
          </div>
        </AppShell>
      </div>
    </MantineProvider>
  );
}

export default MyApp;
