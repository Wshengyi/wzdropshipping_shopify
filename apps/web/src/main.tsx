import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  AppProvider,
  Page,
  Card,
  Text,
  TextField,
  Button,
  BlockStack,
  InlineStack,
  Banner,
  Checkbox,
  Link,
} from '@shopify/polaris';

const API_BASE = 'https://shopify.firstdemo.cn/api';

function TermsPage() {
  return (
    <Page title="用户协议">
      <Card>
        <BlockStack gap="300">
          <Text as="h2" variant="headingMd">WZ Dropshipping Shopify App 用户协议</Text>
          <Text as="p" variant="bodyMd">生效日期：2026-02-27</Text>
          <Text as="p" variant="bodyMd">欢迎使用本服务。您在注册或使用本服务前，请仔细阅读本协议。您完成注册或实际使用，即视为已同意本协议全部内容。</Text>
          <Text as="h3" variant="headingSm">1. 服务内容</Text>
          <Text as="p" variant="bodyMd">本服务为 Shopify 商家提供订单同步、商品管理、搜品、履约处理等功能。具体功能以系统实际开放为准。</Text>
          <Text as="h3" variant="headingSm">2. 账户责任</Text>
          <Text as="p" variant="bodyMd">您应妥善保管账号和密码，并对账户下的一切操作负责。如发现异常使用，应立即通知我们。</Text>
          <Text as="h3" variant="headingSm">3. 合法使用</Text>
          <Text as="p" variant="bodyMd">您承诺不利用本服务从事违法违规行为，不上传或传播违法、有害、侵权内容，不干扰系统正常运行。</Text>
          <Text as="h3" variant="headingSm">4. 服务变更与中断</Text>
          <Text as="p" variant="bodyMd">我们可基于业务需要对功能进行调整、升级或维护。对于必要的停机维护，我们将尽可能提前通知。</Text>
          <Text as="h3" variant="headingSm">5. 免责与责任限制</Text>
          <Text as="p" variant="bodyMd">在法律允许范围内，我们不对因不可抗力、第三方平台故障（包括 Shopify 或物流服务）导致的间接损失承担责任。</Text>
          <Text as="h3" variant="headingSm">6. 协议更新</Text>
          <Text as="p" variant="bodyMd">我们有权更新本协议。更新后在页面公布并生效。您继续使用即视为接受更新条款。</Text>
        </BlockStack>
      </Card>
    </Page>
  );
}

function PrivacyPage() {
  return (
    <Page title="隐私协议">
      <Card>
        <BlockStack gap="300">
          <Text as="h2" variant="headingMd">WZ Dropshipping Shopify App 隐私协议</Text>
          <Text as="p" variant="bodyMd">生效日期：2026-02-27</Text>
          <Text as="p" variant="bodyMd">我们重视您的隐私。本协议说明我们如何收集、使用、存储和保护您的个人信息。</Text>
          <Text as="h3" variant="headingSm">1. 收集的信息</Text>
          <Text as="p" variant="bodyMd">我们可能收集：账户信息（邮箱、密码摘要）、店铺信息、订单与物流信息、操作日志等与服务相关的数据。</Text>
          <Text as="h3" variant="headingSm">2. 使用目的</Text>
          <Text as="p" variant="bodyMd">用于提供和优化服务、身份验证、安全风控、客户支持、合规审计及系统运营。</Text>
          <Text as="h3" variant="headingSm">3. 信息共享</Text>
          <Text as="p" variant="bodyMd">除法律法规要求或履约所必需（如与 Shopify、ERP、物流服务商对接）外，我们不会向无关第三方出售您的个人信息。</Text>
          <Text as="h3" variant="headingSm">4. 数据安全</Text>
          <Text as="p" variant="bodyMd">我们采取访问控制、传输加密、日志审计等措施保障数据安全，但无法承诺互联网环境的绝对安全。</Text>
          <Text as="h3" variant="headingSm">5. 数据留存与删除</Text>
          <Text as="p" variant="bodyMd">我们仅在实现服务目的所需期间保留数据。若您申请注销账户，在满足法律和审计要求后我们将删除或匿名化处理相关数据。</Text>
          <Text as="h3" variant="headingSm">6. 联系方式</Text>
          <Text as="p" variant="bodyMd">如您对隐私保护有疑问，请通过运营支持渠道联系我们。</Text>
        </BlockStack>
      </Card>
    </Page>
  );
}

function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    if (!email || password.length < 6) return false;
    if (mode === 'register') return agreeTerms && agreePrivacy;
    return true;
  }, [email, password, mode, agreeTerms, agreePrivacy]);

  const submit = async () => {
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const endpoint = mode === 'register' ? 'auth/register' : 'auth/login';
      const payload =
        mode === 'register'
          ? { email, password, termsAccepted: agreeTerms, privacyAccepted: agreePrivacy }
          : { email, password };

      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(Array.isArray(data?.message) ? data.message[0] : data?.message || '请求失败');

      if (data?.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }

      setMessage(mode === 'register' ? '注册成功，请登录。' : '登录成功。');
      if (mode === 'register') {
        setMode('login');
        setPassword('');
        setAgreeTerms(false);
        setAgreePrivacy(false);
      }
    } catch (e) {
      setIsError(true);
      setMessage((e as Error).message || '请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="WZ Dropshipping Shopify App">
      <Card>
        <BlockStack gap="400">
          <Text as="h2" variant="headingMd">{mode === 'login' ? '邮箱登录' : '邮箱注册'}</Text>

          <InlineStack gap="200">
            <Button pressed={mode === 'login'} onClick={() => setMode('login')}>登录</Button>
            <Button pressed={mode === 'register'} onClick={() => setMode('register')}>注册</Button>
          </InlineStack>

          {message ? (
            <Banner title={isError ? '操作失败' : '操作成功'} tone={isError ? 'critical' : 'success'}>
              <p>{message}</p>
            </Banner>
          ) : null}

          <TextField label="邮箱" type="email" autoComplete="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <TextField label="密码" type="password" autoComplete="current-password" value={password} onChange={setPassword} placeholder="至少 6 位" />

          {mode === 'register' ? (
            <BlockStack gap="200">
              <Checkbox
                label={
                  <Text as="span" variant="bodyMd">
                    我已阅读并同意 <Link url="/terms" target="_blank">《用户协议》</Link>
                  </Text>
                }
                checked={agreeTerms}
                onChange={setAgreeTerms}
              />
              <Checkbox
                label={
                  <Text as="span" variant="bodyMd">
                    我已阅读并同意 <Link url="/privacy" target="_blank">《隐私协议》</Link>
                  </Text>
                }
                checked={agreePrivacy}
                onChange={setAgreePrivacy}
              />
            </BlockStack>
          ) : null}

          <Button variant="primary" loading={loading} onClick={submit} disabled={!canSubmit}>
            {mode === 'login' ? '登录' : '注册'}
          </Button>
        </BlockStack>
      </Card>
    </Page>
  );
}

function App() {
  const path = window.location.pathname;
  if (path === '/terms') return <TermsPage />;
  if (path === '/privacy') return <PrivacyPage />;
  return <AuthPage />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider i18n={{}}>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
