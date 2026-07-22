import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, Tag, CreditCard } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Plans = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic Plan', price: 5000, billingCycle: 'Monthly', features: ['Up to 500 Patients', 'Basic Analytics', 'Email Support'], status: 'Active' },
    { id: 2, name: 'Pro Plan', price: 10000, billingCycle: 'Monthly', features: ['Up to 2000 Patients', 'Advanced Analytics', 'Priority Support', 'Custom Branding'], status: 'Active' },
    { id: 3, name: 'Enterprise Plan', price: 25000, billingCycle: 'Monthly', features: ['Unlimited Patients', 'Dedicated Account Manager', '24/7 Phone Support', 'Custom API Access'], status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleCreate = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subscription plan?')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const handleSave = (planData) => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === planData.id ? planData : p));
    } else {
      setPlans([...plans, planData]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto pb-10 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Subscription Plans</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage pricing tiers and features for hospitals.</p>
        </div>
        <button onClick={handleCreate} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-bold text-sm">
          <Plus size={18} />
          Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Tag className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Plans Created</h3>
            <p className="text-slate-500 text-sm">You haven't set up any subscription plans yet.</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">

              <div className="p-6 border-b border-slate-100 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${plan.status === 'Active' ? 'bg-success-50 text-success-600' : 'bg-slate-100 text-slate-600'}`}>
                    {plan.status}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(plan)} className="p-1.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors" title="Edit Plan">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(plan.id)} className="p-1.5 text-slate-400 hover:text-danger-500 hover:bg-danger-50 rounded-lg transition-colors" title="Delete Plan">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">₹{plan.price.toLocaleString()}</span>
                  <span className="text-sm font-medium text-slate-500">/{plan.billingCycle.toLowerCase()}</span>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-success-100 text-success-600 p-0.5 shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-center text-slate-500 font-medium flex items-center justify-center gap-1.5">
                  <CreditCard size={14} /> Available for hospital enrollment
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <PlanFormModal
          initialData={editingPlan}
          onSubmit={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const PlanFormModal = ({ initialData, onSubmit, onCancel }) => {
  const isEditing = !!initialData;

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      price: initialData?.price || '',
      billingCycle: initialData?.billingCycle || 'Monthly',
      features: initialData?.features ? initialData.features.join('\n') : '',
      status: initialData?.status || 'Active',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Plan name is required'),
      price: Yup.number().required('Price is required').min(0, 'Cannot be negative'),
      billingCycle: Yup.string().required('Required'),
      features: Yup.string().required('At least one feature is required'),
    }),
    onSubmit: (values) => {
      onSubmit({
        ...values,
        id: initialData?.id || Date.now(),
        features: values.features.split('\n').map(f => f.trim()).filter(f => f)
      });
    }
  });

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={isEditing ? 'Edit Subscription Plan' : 'Create New Plan'}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Plan Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Pro Plan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all ${formik.touched.name && formik.errors.name ? 'border-danger-300 focus:border-danger-500' : 'border-slate-200 focus:border-primary-500'}`}
          />
          {formik.touched.name && formik.errors.name && <p className="text-danger-500 text-xs mt-1.5">{formik.errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="0"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all ${formik.touched.price && formik.errors.price ? 'border-danger-300 focus:border-danger-500' : 'border-slate-200 focus:border-primary-500'}`}
            />
            {formik.touched.price && formik.errors.price && <p className="text-danger-500 text-xs mt-1.5">{formik.errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Billing Cycle</label>
            <select
              name="billingCycle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.billingCycle}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
            >
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Features (One per line)</label>
          <textarea
            name="features"
            rows="4"
            placeholder="Analytics Dashboard&#10;Unlimited Patients&#10;24/7 Support"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.features}
            className={`w-full px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all ${formik.touched.features && formik.errors.features ? 'border-danger-300 focus:border-danger-500' : 'border-slate-200 focus:border-primary-500'}`}
          ></textarea>
          {formik.touched.features && formik.errors.features && <p className="text-danger-500 text-xs mt-1.5">{formik.errors.features}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="status" value="Active" checked={formik.values.status === 'Active'} onChange={formik.handleChange} className="text-primary-500 focus:ring-primary-500" />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="status" value="Draft" checked={formik.values.status === 'Draft'} onChange={formik.handleChange} className="text-primary-500 focus:ring-primary-500" />
              Draft
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors text-sm">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5">
            {isEditing ? 'Save Changes' : 'Create Plan'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Plans;