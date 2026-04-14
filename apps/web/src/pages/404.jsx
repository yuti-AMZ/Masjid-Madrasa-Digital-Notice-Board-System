const NotFound = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-[#E6F7F1] p-12 rounded-full mb-8 text-[#00B67A]">
        <Search size={80} strokeWidth={1.5} />
      </div>
      <h1 className="text-4xl font-black text-slate-800 mb-2">404 - Not Found</h1>
      <p className="text-slate-400 font-medium mb-8 max-w-sm">Oops! It looks like this section is still under development or doesn't exist.</p>
      <button 
        onClick={() => navigate('/')}
        className="px-10 py-4 bg-[#00B67A] text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:scale-105 transition-transform"
      >
        Back to Dashboard
      </button>
    </motion.div>
  );
};