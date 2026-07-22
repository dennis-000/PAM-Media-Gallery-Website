'use client';

import { useState } from 'react';
import { FolderKanban, Plus, CheckCircle2, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';
import { Project, ProjectStage } from '@/lib/types';
import { updateProjectStageAction } from '@/lib/actions/admin-actions';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(persistentDb.getProjects());

  const stages: { id: ProjectStage; label: string; color: string }[] = [
    { id: 'booked', label: 'Booked', color: 'border-blue-600/40 text-blue-400' },
    { id: 'planning', label: 'Planning', color: 'border-amber-600/40 text-amber-400' },
    { id: 'shooting', label: 'Shooting', color: 'border-purple-600/40 text-purple-400' },
    { id: 'editing', label: 'Editing', color: 'border-champagne/40 text-champagne' },
    { id: 'review', label: 'Review', color: 'border-indigo-600/40 text-indigo-400' },
    { id: 'gallery_ready', label: 'Gallery Ready', color: 'border-emerald-600/40 text-emerald-400' },
    { id: 'completed', label: 'Completed', color: 'border-neutral-700 text-neutral-400' },
  ];

  const handleStageChange = async (projectId: string, newStage: ProjectStage) => {
    const updatedPrj = persistentDb.updateProjectStage(projectId, newStage);
    setProjects([...persistentDb.getProjects()]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Linear-Grade Production Pipeline
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Projects Workflow Board
          </h1>
        </div>

        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Project
        </Button>
      </div>

      {/* Kanban Board Layout */}
      <div className="flex gap-4 overflow-x-auto pb-6 select-none">
        {stages.map((stg) => {
          const colProjects = projects.filter((p) => p.stage === stg.id);

          return (
            <div key={stg.id} className="w-80 shrink-0 bg-obsidian-900/60 border border-obsidian-800 rounded-xl p-4 space-y-4">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-obsidian-800">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${stg.color.split(' ')[1].replace('text', 'bg')}`} />
                  <span className="font-serif font-bold text-sm text-parchment">{stg.label}</span>
                </div>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  {colProjects.length}
                </Badge>
              </div>

              {/* Cards in Column */}
              <div className="space-y-3 min-h-[450px]">
                {colProjects.length === 0 ? (
                  <div className="text-center py-10 text-xs text-neutral-600 border border-dashed border-obsidian-800 rounded-lg">
                    No active projects in {stg.label}
                  </div>
                ) : (
                  colProjects.map((prj) => (
                    <Card key={prj.id} className="p-4 bg-obsidian-900 border-obsidian-700/80 hover:border-champagne/40 transition-all space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-champagne">{prj.projectNumber}</span>
                        <span className="text-[10px] text-neutral-400">Due: {prj.dueDate}</span>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-parchment text-sm leading-snug">{prj.title}</h4>
                        <p className="text-[11px] text-neutral-400">{prj.clientName}</p>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-obsidian-800 text-[11px]">
                        <div className="flex items-center justify-between text-neutral-400">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-champagne" /> {prj.assignedLead.split(' ')[0]}
                          </span>
                          <span className="font-bold text-champagne">{prj.progressPercent}%</span>
                        </div>

                        <div className="w-full bg-obsidian-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-champagne h-full transition-all" style={{ width: `${prj.progressPercent}%` }} />
                        </div>
                      </div>

                      {/* Transition Controls */}
                      <div className="pt-2 flex justify-end gap-1">
                        {stg.id === 'editing' && (
                          <Button
                            onClick={() => handleStageChange(prj.id, 'review')}
                            variant="outline"
                            size="sm"
                            className="h-7 text-[10px] border-champagne/30 text-champagne gap-1"
                          >
                            Move to Review <ArrowRight className="w-3 h-3" />
                          </Button>
                        )}
                        {stg.id === 'review' && (
                          <Button
                            onClick={() => handleStageChange(prj.id, 'gallery_ready')}
                            size="sm"
                            className="h-7 text-[10px] bg-emerald-700 hover:bg-emerald-600 text-white gap-1"
                          >
                            Gallery Ready <CheckCircle2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
