export const Footer = () => {
  return (
    <footer className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="neo-border bg-white dark:bg-slate-800 p-4 neo-shadow-sm flex justify-between items-center">
        <span className="text-xs font-black uppercase tracking-widest">Total Users</span>
        <span className="text-2xl font-black">1,284</span>
      </div>
      <div className="neo-border bg-white dark:bg-slate-800 p-4 neo-shadow-sm flex justify-between items-center">
        <span className="text-xs font-black uppercase tracking-widest">Active Now</span>
        <span className="text-2xl font-black text-green-500 dark:text-neo-green">42</span>
      </div>
      <div className="neo-border bg-white dark:bg-slate-800 p-4 neo-shadow-sm flex justify-between items-center">
        <span className="text-xs font-black uppercase tracking-widest">Pending</span>
        <span className="text-2xl font-black text-yellow-500 dark:text-neo-yellow">18</span>
      </div>
      <div className="neo-border bg-primary text-white p-4 neo-shadow-sm flex justify-between items-center">
        <span className="text-xs font-black uppercase tracking-widest">System Status</span>
        <span className="text-sm font-black uppercase tracking-widest">Stable</span>
      </div>
    </footer>
  );
};
