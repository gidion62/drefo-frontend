import { useEffect, useState } from 'react';
import {
  getVolunteers,
  updateVolunteer,
  deleteVolunteer,
} from '@/lib/adminApi';
import type { Volunteer } from '@/lib/adminApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Trash2, Eye } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  reviewed: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  accepted: 'bg-green-100 text-green-800 hover:bg-green-100',
  declined: 'bg-red-100 text-red-700 hover:bg-red-100',
};

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Volunteer | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getVolunteers(filter === 'all' ? undefined : filter)
      .then((res) => setVolunteers(res.data))
      .catch((err) => toast.error(err.message || 'Failed to load applications'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const openDetail = (v: Volunteer) => {
    setSelected(v);
    setNotes(v.adminNotes || '');
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateVolunteer(id, { status });
      toast.success('Status updated');
      load();
      if (selected && selected._id === id) setSelected({ ...selected, status: status as Volunteer['status'] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateVolunteer(selected._id, { adminNotes: notes });
      toast.success('Notes saved');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save notes');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this application permanently?')) return;
    try {
      await deleteVolunteer(id);
      toast.success('Application deleted');
      setSelected(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-neutral-900">Volunteer Applications</h1>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Availability</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-neutral-500 py-8">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {!loading && volunteers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-neutral-500 py-8">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
            {volunteers.map((v) => (
              <TableRow key={v._id}>
                <TableCell>
                  <div>{v.fullName}</div>
                  <div className="text-xs text-neutral-500">{v.email}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{v.location}</TableCell>
                <TableCell className="hidden md:table-cell">{v.availability}</TableCell>
                <TableCell>
                  <Badge className={statusColors[v.status]}>{v.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDetail(v)} aria-label="View">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(v._id)} aria-label="Delete">
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.fullName}</DialogTitle>
              </DialogHeader>

              <div className="text-sm space-y-3">
                <p>
                  <span className="text-neutral-500">Contact:</span> {selected.email} · {selected.phone}
                </p>
                <p>
                  <span className="text-neutral-500">Location:</span> {selected.location}
                </p>
                <p>
                  <span className="text-neutral-500">Availability:</span> {selected.availability}
                </p>
                {selected.interests?.length > 0 && (
                  <p>
                    <span className="text-neutral-500">Interests:</span> {selected.interests.join(', ')}
                  </p>
                )}
                {selected.skills && (
                  <p>
                    <span className="text-neutral-500">Skills:</span> {selected.skills}
                  </p>
                )}
                {selected.message && (
                  <p className="whitespace-pre-wrap bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                    {selected.message}
                  </p>
                )}

                <div>
                  <label className="text-neutral-500 block mb-1">Status</label>
                  <Select
                    value={selected.status}
                    onValueChange={(v) => handleStatusChange(selected._id, v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-neutral-500 block mb-1">Admin notes</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Internal notes (not visible to the applicant)"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => handleDelete(selected._id)}>
                  Delete
                </Button>
                <Button onClick={handleSaveNotes} disabled={saving}>
                  {saving ? 'Saving...' : 'Save notes'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
