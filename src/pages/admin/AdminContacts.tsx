import { useEffect, useState } from 'react';
import {
  getContacts,
  updateContact,
  deleteContact,
} from '@/lib/adminApi';
import type { Contact } from '@/lib/adminApi';
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
  unread: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  read: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  replied: 'bg-green-100 text-green-800 hover:bg-green-100',
  archived: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-100',
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Contact | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getContacts(filter === 'all' ? undefined : filter)
      .then((res) => setContacts(res.data))
      .catch((err) => toast.error(err.message || 'Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const openDetail = (contact: Contact) => {
    setSelected(contact);
    setNotes(contact.adminNotes || '');
    // Mark as read automatically when opened, if currently unread
    if (contact.status === 'unread') {
      updateContact(contact._id, { status: 'read' }).then(() => load());
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateContact(id, { status });
      toast.success('Status updated');
      load();
      if (selected && selected._id === id) setSelected({ ...selected, status: status as Contact['status'] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateContact(selected._id, { adminNotes: notes });
      toast.success('Notes saved');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save notes');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;
    try {
      await deleteContact(id);
      toast.success('Message deleted');
      setSelected(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-neutral-900">Contact Messages</h1>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Subject</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
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
            {!loading && contacts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-neutral-500 py-8">
                  No messages found.
                </TableCell>
              </TableRow>
            )}
            {contacts.map((c) => (
              <TableRow key={c._id} className={c.status === 'unread' ? 'font-medium' : ''}>
                <TableCell>
                  <div>{c.name}</div>
                  <div className="text-xs text-neutral-500">{c.email}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{c.subject}</TableCell>
                <TableCell className="hidden md:table-cell text-neutral-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[c.status]}>{c.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDetail(c)} aria-label="View">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(c._id)} aria-label="Delete">
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
                <DialogTitle>{selected.subject}</DialogTitle>
              </DialogHeader>

              <div className="text-sm space-y-3">
                <p>
                  <span className="text-neutral-500">From:</span> {selected.name} ({selected.email})
                </p>
                <p>
                  <span className="text-neutral-500">Received:</span>{' '}
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
                <p className="whitespace-pre-wrap bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                  {selected.message}
                </p>

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
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-neutral-500 block mb-1">Admin notes</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Internal notes (not visible to the sender)"
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
