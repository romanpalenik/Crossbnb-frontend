import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { AppShell, Center, Footer, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { AppFooter } from "../components/partials/footer/footer";
import AppHeader from "../components/partials/header/header";
import { AppNavbar } from "../components/partials/navbar/navbar";
import { DAppProvider } from "@usedapp/core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }: AppProps) {
  const [opened, setOpened] = useState(false);

  const supportedChainIds = [80001, 4];

  const connectors = {
    injected: {},
  };

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
      {/*  provider for web 3 */}
      <DAppProvider config={{}}>
        <ThirdwebWeb3Provider
          supportedChainIds={supportedChainIds}
          connectors={connectors}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AppShell
              navbarOffsetBreakpoint="sm"
              navbar={<AppNavbar opened={opened}></AppNavbar>}
              header={
                <AppHeader opened={opened} setOpened={setOpened}></AppHeader>
              }
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
        </ThirdwebWeb3Provider>
      </DAppProvider>
    </MantineProvider>
  );
}

export default MyApp;
