'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FolderKanban, Plus, CheckCircle2, Clock, User, ArrowRight, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { Project, ProjectStage } from '@/lib/types';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';

export default function AdminProjectsPage() {
  const { mounted, authorized } = useAuthProtection();
  const [projects, setProjects] = useState<Project[]>(persistentDb.getProjects());
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [newProject, setNewProject] = useState({
    title: '',
    clientName: '',
    clientEmail: '',
    stage: 'planning' as ProjectStage,
    shootDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedLead: 'Pamela Asiedu',
    totalPhotosExpected: 250,
  });

  useEffect(() => {
    async function loadData() {
      await persistentDb.syncFromApi();
      setProjects(persistentDb.getProjects());
    }
    loadData();
  }, []);

  if (!mounted || !authorized) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="flex gap-4 overflow-x-auto pb-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-80 h-96 shrink-0 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const stages: { id: ProjectStage; label: string; color: string; next?: ProjectStage; prev?: ProjectStage }[] = [
    { id: 'booked', label: 'Booked', color: 'border-blue-600/40 text-blue-400', next: 'planning' },
    { id: 'planning', label: 'Planning', color: 'border-amber-600/40 text-amber-400', prev: 'booked', next: 'shooting' },
    { id: 'shooting', label: 'Shooting', color: 'border-purple-600/40 text-purple-400', prev: 'planning', next: 'editing' },
    { id: 'editing', label: 'Editing', color: 'border-champagne/40 text-champagne', prev: 'shooting', next: 'review' },
    { id: 'review', label: 'Review', color: 'border-indigo-600/40 text-indigo-400', prev: 'editing', next: 'gallery_ready' },
    { id: 'gallery_ready', label: 'Gallery Ready', color: 'border-emerald-600/40 text-emerald-400', prev: 'review', next: 'completed' },
    { id: 'completed', label: 'Completed', color: 'border-neutral-700 text-neutral-400', prev: 'gallery_ready' },
  ];

  const handleStageChange = async (projectId: string, newStage: ProjectStage) => {
    persistentDb.updateProjectStage(projectId, newStage);
    setProjects([...persistentDb.getProjects()]);
    setNotification(`Project stage updated to ${newStage.replace('_', ' ').toUpperCase()}`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    persistentDb.addProject(newProject);
    setProjects(persistentDb.getProjects());
    setShowModal(false);
    setNotification(`New project created for ${newProject.clientName}!`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-champagne text-obsidian px-6 py-3 rounded-lg font-bold shadow-2xl flex items-center gap-3 animate-fade-in text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

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

        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2">
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
                        <span className="text-[10px] text-neutral-400 font-mono">Due: {prj.dueDate}</span>
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
                          <span className="font-bold text-champagne font-mono">{prj.progressPercent}%</span>
                        </div>

                        <div className="w-full bg-obsidian-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-champagne h-full transition-all duration-300" style={{ width: `${prj.progressPercent}%` }} />
                        </div>
                      </div>

                      {/* Interactive Stage Transition Controls */}
                      <div className="pt-2 flex justify-between items-center border-t border-obsidian-800/80">
                        {stg.prev ? (
                          <Button
                            onClick={() => handleStageChange(prj.id, stg.prev!)}
                            variant="ghost"
                            size="sm"
                            className="h-7 text-[10px] text-neutral-400 hover:text-parchment px-2"
                          >
                            <ChevronLeft className="w-3 h-3" /> Back
                          </Button>
                        ) : <div />}

                        {stg.next && (
                          <Button
                            onClick={() => handleStageChange(prj.id, stg.next!)}
                            variant="outline"
                            size="sm"
                            className="h-7 text-[10px] border-champagne/40 text-champagne hover:bg-champagne/10 gap-1 px-2"
                          >
                            Move to {stg.next.replace('_', ' ')} <ChevronRight className="w-3 h-3" />
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

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <h3 className="font-serif text-2xl font-bold text-parchment">Create Production Project</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Project Title</label>
                <Input
                  required
                  placeholder="e.g. Kwame & Ama — Wedding Reception"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Client Name</label>
                  <Input
                    required
                    placeholder="Kwame Mensah"
                    value={newProject.clientName}
                    onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Client Email</label>
                  <Input
                    required
                    type="email"
                    placeholder="kwame@example.com"
                    value={newProject.clientEmail}
                    onChange={(e) => setNewProject({ ...newProject, clientEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Initial Stage</label>
                  <select
                    value={newProject.stage}
                    onChange={(e) => setNewProject({ ...newProject, stage: e.target.value as ProjectStage })}
                    className="w-full h-11 rounded-md border border-obsidian-700 bg-obsidian-900/80 px-4 text-xs text-parchment"
                  >
                    {stages.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Lead Photographer</label>
                  <Input
                    required
                    value={newProject.assignedLead}
                    onChange={(e) => setNewProject({ ...newProject, assignedLead: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Save Project to Workflow Board
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
