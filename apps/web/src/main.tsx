import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider, Page, Card, Text } from '@shopify/polaris';

function App() {
  return (
    <AppProvider i18n={{}}>
      <Page title="WZ Dropshipping Shopify App">
        <Card>
          <Text as="p" variant="bodyMd">
            工程骨架已初始化。下一步将接入 Shopify OAuth、Webhook 与 ERP 接口。
          </Text>
        </Card>
      </Page>
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
