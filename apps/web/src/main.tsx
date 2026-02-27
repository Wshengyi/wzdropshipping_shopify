import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider, Banner, Button, Checkbox, Link, TextField } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import './tokens.css';
import './styles.css';

const API_BASE = 'https://shopify.firstdemo.cn/api';

function TermsPage() {
  return (
    <div className="policy-page">
      <div className="policy-card">
        <h1>用户协议</h1>
        <p className="policy-meta">生效日期：2026-02-27</p>
        <p>欢迎使用本服务。您在注册或使用本服务前，请仔细阅读本协议。您完成注册或实际使用，即视为已同意本协议全部内容。</p>
        <h3>1. 服务内容</h3>
        <p>本服务为 Shopify 商家提供订单同步、商品管理、搜品、履约处理等功能。具体功能以系统实际开放为准。</p>
        <h3>2. 账户责任</h3>
        <p>您应妥善保管账号和密码，并对账户下的一切操作负责。如发现异常使用，应立即通知我们。</p>
        <h3>3. 合法使用</h3>
        <p>您承诺不利用本服务从事违法违规行为，不上传或传播违法、有害、侵权内容，不干扰系统正常运行。</p>
        <h3>4. 服务变更与中断</h3>
        <p>我们可基于业务需要对功能进行调整、升级或维护。对于必要的停机维护，我们将尽可能提前通知。</p>
        <h3>5. 免责与责任限制</h3>
        <p>在法律允许范围内，我们不对因不可抗力、第三方平台故障（包括 Shopify 或物流服务）导致的间接损失承担责任。</p>
        <h3>6. 协议更新</h3>
        <p>我们有权更新本协议。更新后在页面公布并生效。您继续使用即视为接受更新条款。</p>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="policy-page">
      <div className="policy-card">
        <h1>隐私协议</h1>
        <p className="policy-meta">生效日期：2026-02-27</p>
        <p>我们重视您的隐私。本协议说明我们如何收集、使用、存储和保护您的个人信息。</p>
        <h3>1. 收集的信息</h3>
        <p>我们可能收集：账户信息（邮箱、密码摘要）、店铺信息、订单与物流信息、操作日志等与服务相关的数据。</p>
        <h3>2. 使用目的</h3>
        <p>用于提供和优化服务、身份验证、安全风控、客户支持、合规审计及系统运营。</p>
        <h3>3. 信息共享</h3>
        <p>除法律法规要求或履约所必需（如与 Shopify、ERP、物流服务商对接）外，我们不会向无关第三方出售您的个人信息。</p>
        <h3>4. 数据安全</h3>
        <p>我们采取访问控制、传输加密、日志审计等措施保障数据安全，但无法承诺互联网环境的绝对安全。</p>
        <h3>5. 数据留存与删除</h3>
        <p>我们仅在实现服务目的所需期间保留数据。若您申请注销账户，在满足法律和审计要求后我们将删除或匿名化处理相关数据。</p>
        <h3>6. 联系方式</h3>
        <p>如您对隐私保护有疑问，请通过运营支持渠道联系我们。</p>
      </div>
    </div>
  );
}

function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeAgreements, setAgreeAgreements] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    if (!email || password.length < 6) return false;
    return true;
  }, [email, password]);

  const submit = async () => {
    setMessage('');
    setIsError(false);

    if (mode === 'register' && !agreeAgreements) {
      setIsError(true);
      setMessage('注册前请先勾选并同意《用户协议》和《隐私协议》');
      return;
    }

    setLoading(true);

    try {
      const endpoint = mode === 'register' ? 'auth/register' : 'auth/login';
      const payload =
        mode === 'register'
          ? { email, password, agreementsAccepted: agreeAgreements }
          : { email, password };

      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(Array.isArray(data?.message) ? data.message[0] : data?.message || '请求失败');

      if (data?.accessToken) localStorage.setItem('accessToken', data.accessToken);

      setMessage(mode === 'register' ? '注册成功，请登录。' : '登录成功。');
      if (mode === 'register') {
        setMode('login');
        setPassword('');
        setAgreeAgreements(false);
      }
    } catch (e) {
      setIsError(true);
      setMessage((e as Error).message || '请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="hero-panel">
        <div className="brand">
          <img src="/logo.jpg" alt="WZSHOP" className="brand-logo" />
          <span>WZ Dropshipping</span>
        </div>
        <h1>
          Start dropshipping smoothly <span>from day one</span>
        </h1>
        <p>连接 Shopify、搜品、下单与履约，帮助你快速搭建稳定的代发业务流程。</p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Find & quote products</h3>
            <p>同步店铺商品，发起搜品并获取报价。</p>
          </div>
          <div className="feature-card">
            <h3>Automations</h3>
            <p>订单自动同步，履约状态自动回传。</p>
          </div>
          <div className="feature-card">
            <h3>Support & growth</h3>
            <p>为后续支付、物流预警和售后扩展预留能力。</p>
          </div>
        </div>
      </section>

      <section className="form-panel">
        <div className="auth-card">
          <div className="auth-logo-wrap">
            <img src="/logo.jpg" alt="WZSHOP" className="auth-logo" />
          </div>

          <div className="tabs">
            <button className={mode === 'login' ? 'tab active' : 'tab'} onClick={() => setMode('login')}>
              登录
            </button>
            <button className={mode === 'register' ? 'tab active' : 'tab'} onClick={() => setMode('register')}>
              注册
            </button>
          </div>

          {message ? (
            <div className="banner-wrap">
              <Banner title={isError ? '操作失败' : '操作成功'} tone={isError ? 'critical' : 'success'}>
                <p>{message}</p>
              </Banner>
            </div>
          ) : null}

          <div className="field-wrap">
            <TextField
              label="邮箱"
              labelHidden
              type="email"
              autoComplete="email"
              value={email}
              onChange={setEmail}
              placeholder="E-mail address"
            />
          </div>

          <div className="field-wrap">
            <TextField
              label="密码"
              labelHidden
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={setPassword}
              placeholder="Password"
            />
          </div>

          <div className="agree-wrap">
            {mode === 'register' ? (
              <Checkbox
                label={
                  <span>
                    我已阅读并同意 <Link url="/terms" target="_blank">《用户协议》</Link> 和 <Link url="/privacy" target="_blank">《隐私协议》</Link>
                  </span>
                }
                checked={agreeAgreements}
                onChange={setAgreeAgreements}
              />
            ) : (
              <span>
                登录即表示你同意 <Link url="/terms" target="_blank">《用户协议》</Link> 和 <Link url="/privacy" target="_blank">《隐私协议》</Link>
              </span>
            )}
          </div>

          <Button fullWidth size="large" variant="primary" loading={loading} onClick={submit} disabled={!canSubmit}>
            {mode === 'login' ? 'Log in' : 'Sign up'}
          </Button>
        </div>
      </section>
    </div>
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
