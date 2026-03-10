import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';

interface TeamsViewProps {
  teams: any[];
  onAdd: () => void;
  onEdit: (team: any) => void;
  onDelete: (id: string) => void;
}

export const TeamsView = ({ teams, onAdd, onEdit, onDelete }: TeamsViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter dark:text-white">Team <span className="text-primary">Structures</span></h2>
        <NeoButton variant="primary" onClick={onAdd}>+ Create Team</NeoButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team, i) => (
          <NeoCard key={i} title={team.name} className="dark:bg-slate-800 dark:text-white">
            <div className="flex justify-between items-center mt-2">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Team Lead</p>
                <p className="font-black uppercase">{team.lead}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 uppercase">Members</p>
                <p className="text-2xl font-black">{team.members}</p>
              </div>
            </div>
            <div className={`h-2 w-full mt-4 neo-border ${team.color}`}></div>
            <div className="flex gap-2 mt-4">
              <NeoButton variant="secondary" className="flex-1 text-[10px]" onClick={() => onEdit(team)}>Manage</NeoButton>
              <NeoButton variant="secondary" className="flex-1 text-[10px] hover:bg-neo-pink hover:text-white" onClick={() => onDelete(team.id)}>Delete</NeoButton>
            </div>
          </NeoCard>
        ))}
      </div>
    </div>
  );
};
