const App = () => {
  // --- auth restore state (minimal, stays inside this file)
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const stored = typeof window !== 'undefined'
        ? localStorage.getItem('token') || localStorage.getItem('jwtToken') || ''
        : '';
      if (stored) {
        const payload = parseJwt(stored);
        setUser(payload || null);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.warn('Auth restore failed', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper used for root path decision
  function RootRedirect() {
    if (loading) return <div style={{padding:20}}>Loading...</div>;
    return user ? <Navigate to="/hero" replace /> : <Navigate to="/login" replace />;
  }

  return (
    <main>
      <Navbar />
      <Routes>
        {/* ← replace this unconditional redirect with RootRedirect */}
        <Route path="/" element={<RootRedirect />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hero" element={<Hero />} />

        {/* if you want these pages protected, you can keep them as-is or 
            later wrap with a simple check using `user` */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/clubmembers" element={<Clubmembers />} />

        <Route path="/profile" element={<MyProfileRedirect />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </main>
  );
};

export default App;
