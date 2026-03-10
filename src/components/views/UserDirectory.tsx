import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Eye, Edit2, Trash2 } from 'lucide-react';
import { User } from '../../types';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';

interface UserDirectoryProps {
  users: User[];
  onAdd: () => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserDirectory = ({ users, onAdd, onEdit, onDelete }: UserDirectoryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Team Members</h2>
          <p className="font-bold text-slate-500 mt-2 uppercase text-sm">Manage your organization's users and their access levels.</p>
        </div>
        <NeoButton variant="primary" className="px-6 py-3 flex items-center gap-2" onClick={onAdd}>
          <Plus size={18} /> Add User
        </NeoButton>
      </div>

      <NeoCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 dark:bg-primary/10 border-b-4 border-black dark:border-white">
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black dark:border-white">Name</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black dark:border-white">Role</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black dark:border-white">Status</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black dark:border-white">Last Active</th>
                <th className="p-4 font-black uppercase text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black dark:divide-white">
              {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="p-4 border-r-2 border-black dark:border-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 neo-border bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-sm uppercase">{user.name}</span>
                        <span className="text-[10px] font-bold text-slate-400">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black dark:border-white">
                    <span className={`neo-border px-3 py-1 font-black text-[10px] uppercase ${user.role === 'Admin' ? 'bg-primary/20 text-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 border-r-2 border-black dark:border-white">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase">
                      <span className={`w-3 h-3 neo-border ${user.status === 'Active' ? 'bg-green-500' : user.status === 'Inactive' ? 'bg-red-500' : 'bg-yellow-400'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 border-r-2 border-black dark:border-white font-bold text-xs uppercase text-slate-500 dark:text-slate-400">{user.lastActive}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <NeoButton 
                        onClick={() => alert(`Viewing profile for ${user.name}`)}
                        variant="secondary"
                        className="p-2 hover:bg-primary hover:text-white transition-all"
                        title="View Profile"
                      >
                        <Eye size={14} />
                      </NeoButton>
                      <NeoButton 
                        onClick={() => onEdit(user)}
                        variant="secondary"
                        className="p-2 hover:bg-neo-yellow transition-all"
                      >
                        <Edit2 size={14} />
                      </NeoButton>
                      <NeoButton 
                        onClick={() => onDelete(user.id)}
                        variant="secondary"
                        className="p-2 hover:bg-neo-pink hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                      </NeoButton>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center font-black uppercase text-slate-400">No users found matching your search</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </NeoCard>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <NeoButton 
            variant="secondary" 
            className="w-10 h-10 p-0 flex items-center justify-center disabled:opacity-50"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </NeoButton>
          {[...Array(totalPages)].map((_, i) => (
            <NeoButton 
              key={i}
              variant={currentPage === i + 1 ? 'primary' : 'secondary'} 
              className="w-10 h-10 p-0 flex items-center justify-center"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </NeoButton>
          ))}
          <NeoButton 
            variant="secondary" 
            className="w-10 h-10 p-0 flex items-center justify-center disabled:opacity-50"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </NeoButton>
        </div>
      )}
    </div>
  );
};
