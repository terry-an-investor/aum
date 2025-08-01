class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [activeView, setActiveView] = React.useState('dashboard');
    const [funds, setFunds] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      // Load funds from Trickle database
      const loadFunds = async () => {
        try {
          const result = await trickleListObjects('fund', 100, true);
          const fundData = result.items.map(item => ({
            id: item.objectId,
            ...item.objectData,
            netValue: parseFloat(item.objectData.netValue) || 0,
            returnRate: parseFloat(item.objectData.returnRate) || 0,
            totalAssets: parseFloat(item.objectData.totalAssets) || 0
          }));
          setFunds(fundData);
        } catch (error) {
          console.error('Error loading funds:', error);
          // Fallback to sample data if database fails
          setFunds(getSampleFunds());
        } finally {
          setLoading(false);
        }
      };
      
      loadFunds();
    }, []);

    const renderContent = () => {
      switch(activeView) {
        case 'dashboard':
          return <Dashboard funds={funds} />;
        case 'funds':
          return <FundList funds={funds} setFunds={setFunds} />;
        case 'trading':
          return <TradingPanel funds={funds} />;
        case 'lifecycle':
          return <LifecycleManager funds={funds} setFunds={setFunds} />;
        default:
          return <Dashboard funds={funds} />;
      }
    };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="loading" data-file="app.js">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">加载基金管理系统...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="main-content">
          <Header />
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);