import React, { useState } from 'react';
import { Plus, Megaphone, Edit2, Trash2, Calendar, Users, Eye, Pin, Check } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../components/common/Modal';

const AnnouncementFormModal = ({ initialData, onSubmit, onCancel }) => {
  const isEditing = !!initialData;

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || '',
      message: initialData?.message || '',
      audience: initialData?.audience || 'All Hospitals',
      status: initialData?.status || 'Published',
      isPinned: initialData?.isPinned || false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required').min(5, 'Minimum 5 characters'),
      message: Yup.string().required('Message content is required').min(10, 'Minimum 10 characters'),
      audience: Yup.string().required('Audience is required'),
    }),
    onSubmit: (values) => {
      onSubmit({
        ...values,
        id: initialData?.id || Date.now(),
        date: initialData?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
  });

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={isEditing ? 'Edit Announcement' : 'New Announcement'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Announcement Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Scheduled System Maintenance"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all ${formik.touched.title && formik.errors.title ? 'border-danger-300 focus:border-danger-500' : 'border-slate-200 focus:border-primary-500'}`}
          />
          {formik.touched.title && formik.errors.title && <p className="text-danger-500 text-xs mt-1.5">{formik.errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message Content</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Write your announcement details here..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={`w-full px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all ${formik.touched.message && formik.errors.message ? 'border-danger-300 focus:border-danger-500' : 'border-slate-200 focus:border-primary-500'}`}
          ></textarea>
          {formik.touched.message && formik.errors.message && <p className="text-danger-500 text-xs mt-1.5">{formik.errors.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Audience</label>
            <select
              name="audience"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.audience}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
            >
              <option value="All Hospitals">All Hospitals</option>
              <option value="Enterprise Plans Only">Enterprise Plans Only</option>
              <option value="Pro Plans Only">Pro Plans Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
            <select
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
            >
              <option value="Published">Publish Now</option>
              <option value="Draft">Save as Draft</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formik.values.isPinned ? 'bg-primary-500 border-primary-500' : 'border-slate-300 bg-white group-hover:border-primary-400'}`}>
              {formik.values.isPinned && <Check size={14} className="text-white" />}
            </div>
            <input
              type="checkbox"
              name="isPinned"
              checked={formik.values.isPinned}
              onChange={formik.handleChange}
              className="hidden"
            />
            <span className="text-sm font-medium text-slate-700">Pin to top of hospital dashboards</span>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors text-sm">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5">
            {isEditing ? 'Save Changes' : 'Post Announcement'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const Announcments = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Platform Maintenance Scheduled',
      message: 'Please be advised that Levitica Health will undergo scheduled maintenance this Sunday from 2:00 AM to 4:00 AM EST. During this time, the portal may experience brief interruptions.',
      audience: 'All Hospitals',
      date: 'Oct 12, 2024',
      status: 'Published',
      isPinned: true
    },
    {
      id: 2,
      title: 'New Enterprise Analytics Dashboard is Live!',
      message: 'We are thrilled to announce that the new Advanced Analytics Dashboard is now available for all Enterprise customers. Navigate to the Reports tab to explore the new features.',
      audience: 'Enterprise Plans Only',
      date: 'Oct 05, 2024',
      status: 'Published',
      isPinned: false
    },
    {
      id: 3,
      title: 'Upcoming Feature: Patient SMS Reminders',
      message: 'We are currently testing automated SMS reminders for patient appointments. This feature will be rolled out globally next month.',
      audience: 'All Hospitals',
      date: 'Oct 01, 2024',
      status: 'Draft',
      isPinned: false
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const handleCreate = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingAnnouncement(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const handleSave = (data) => {
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(a => a.id === data.id ? data : a));
    } else {
      setAnnouncements([data, ...announcements]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 mx-auto pb-10 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Announcements</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Broadcast messages and updates to hospital administrators.</p>
        </div>
        <button onClick={handleCreate} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-bold text-sm">
          <Plus size={18} />
          New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Megaphone className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Announcements</h3>
            <p className="text-slate-500 text-sm">You haven't posted any announcements yet.</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement.id} className={`bg-white rounded-2xl shadow-sm border ${announcement.isPinned ? 'border-primary-200 shadow-primary-500/5' : 'border-slate-100'} p-6 transition-all hover:shadow-md relative overflow-hidden`}>

              {announcement.isPinned && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary-50 text-primary-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg border-b border-l border-primary-100 flex items-center gap-1">
                    <Pin size={10} className="fill-primary-600" />
                    Pinned
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{announcement.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${announcement.status === 'Published' ? 'bg-success-50 text-success-600 border border-success-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                      {announcement.status}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-3xl">
                    {announcement.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <Calendar size={14} className="text-slate-400" />
                      {announcement.date}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <Users size={14} className="text-slate-400" />
                      {announcement.audience}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <Eye size={14} className="text-slate-400" />
                      {Math.floor(Math.random() * 500) + 50} Views
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:mt-0 mt-4 self-end md:self-start">
                  <button onClick={() => handleEdit(announcement)} className="p-2 text-slate-400 hover:text-secondary-500 hover:bg-secondary-100 rounded-xl transition-colors border border-transparent hover:border-secondary-100" title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(announcement.id)} className="p-2 text-slate-400 hover:text-danger-500 hover:bg-danger-50 rounded-xl transition-colors border border-transparent hover:border-danger-100" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <AnnouncementFormModal
          initialData={editingAnnouncement}
          onSubmit={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Announcments;