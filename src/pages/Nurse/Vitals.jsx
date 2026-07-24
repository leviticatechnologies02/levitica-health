import React, { useState } from 'react';
import { Activity, Heart, Thermometer, Droplet, Plus, Save, ChevronRight, AlertTriangle } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';

const VitalsSchema = Yup.object().shape({
  heartRate: Yup.number().required('Required').min(0).max(300),
  bloodPressureSys: Yup.number().required('Required').min(0).max(300),
  bloodPressureDia: Yup.number().required('Required').min(0).max(200),
  temperature: Yup.number().required('Required').min(90).max(110),
  spo2: Yup.number().required('Required').min(0).max(100),
});

const RECENT_VITALS = Array.from({ length: 15 }, (_, i) => ({
  id: `VIT-${1000 + i}`,
  patientId: `PAT-${1000 + i}`,
  patient: `Patient ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5]}`,
  time: `${Math.floor(Math.random() * 12 + 1)}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`,
  hr: 60 + (i * 7) % 60,
  bp: `${110 + (i * 5) % 40}/${70 + (i * 3) % 25}`,
  temp: 97.0 + (i * 0.4) % 4.5,
  spo2: 92 + (i * 3) % 8,
}));

const Vitals = () => {
  const [searchParams] = useSearchParams();
  const prefillPatientId = searchParams.get('patientId');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const clearPatientFilter = () => {
    searchParams.delete('patientId');
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    window.location.reload();
  };

  const filteredVitals = prefillPatientId 
    ? RECENT_VITALS.filter(record => record.patientId === prefillPatientId)
    : RECENT_VITALS;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Vitals</h1>
          <p className="text-slate-500 text-sm mt-1">Record and monitor patient vital signs across your ward.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20"
        >
          <Plus className="w-4 h-4" /> <span className="whitespace-nowrap">Record Vitals</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Vitals Logged Today" value="45" icon={Activity} colorTheme="blue" />
        <StatCard title="Abnormal Readings" value="3" icon={AlertTriangle} colorTheme="red" />
        <StatCard title="Pending Checks" value="5" icon={Activity} colorTheme="orange" />
      </div>

      {prefillPatientId && (
        <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-900">Showing vitals history for Patient: <span className="font-bold">{prefillPatientId}</span></span>
          </div>
          <button onClick={clearPatientFilter} className="text-xs font-bold text-primary-700 bg-white border border-primary-200 px-3 py-1.5 rounded hover:bg-primary-50 transition-colors">
            Clear Filter
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-slate-800">Recent Recordings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest vital signs logged across the ward</p>
          </div>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/30">
          {filteredVitals.length === 0 ? (
            <div className="col-span-full p-8 text-center text-slate-500 text-sm">No recent vitals found for this patient.</div>
          ) : filteredVitals.map((record) => (
            <div key={record.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary-300 transition-all flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{record.patient}</h3>
                  <p className="text-xs font-medium text-slate-500">{record.patientId}</p>
                </div>
                <div className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  {record.time}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-2.5 rounded-lg flex items-center gap-3">
                  <div className={`p-1.5 rounded-md ${record.hr > 100 ? 'bg-red-100' : 'bg-white shadow-sm'}`}>
                    <Heart className={`w-4 h-4 ${record.hr > 100 ? 'text-red-500' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Heart Rate</p>
                    <p className={`text-sm font-bold ${record.hr > 100 ? 'text-red-600' : 'text-slate-900'}`}>{record.hr} bpm</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-white shadow-sm">
                    <Activity className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Blood Press.</p>
                    <p className="text-sm font-bold text-slate-900">{record.bp}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg flex items-center gap-3">
                  <div className={`p-1.5 rounded-md ${record.temp > 100 ? 'bg-orange-100' : 'bg-white shadow-sm'}`}>
                    <Thermometer className={`w-4 h-4 ${record.temp > 100 ? 'text-orange-500' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Temp (°F)</p>
                    <p className={`text-sm font-bold ${record.temp > 100 ? 'text-orange-600' : 'text-slate-900'}`}>{record.temp.toFixed(1)}°</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg flex items-center gap-3">
                  <div className={`p-1.5 rounded-md ${record.spo2 < 95 ? 'bg-blue-100' : 'bg-white shadow-sm'}`}>
                    <Droplet className={`w-4 h-4 ${record.spo2 < 95 ? 'text-blue-500' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">SpO2</p>
                    <p className={`text-sm font-bold ${record.spo2 < 95 ? 'text-blue-600' : 'text-slate-900'}`}>{record.spo2}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Log Patient Vitals" icon={Activity}>
        <Formik
          initialValues={{ patientId: prefillPatientId || '', heartRate: '', bloodPressureSys: '', bloodPressureDia: '', temperature: '', spo2: '' }}
          validationSchema={VitalsSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert('Vitals saved successfully!');
              setIsFormOpen(false);
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Patient ID *</label>
                <Field name="patientId" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" placeholder="e.g. PAT-1001" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500"/> Heart Rate (bpm)</label>
                  <Field type="number" name="heartRate" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                  <ErrorMessage name="heartRate" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-orange-500"/> Temperature (°F)</label>
                  <Field type="number" step="0.1" name="temperature" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                  <ErrorMessage name="temperature" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">BP Systolic</label>
                  <Field type="number" name="bloodPressureSys" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                  <ErrorMessage name="bloodPressureSys" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">BP Diastolic</label>
                  <Field type="number" name="bloodPressureDia" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                  <ErrorMessage name="bloodPressureDia" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1"><Droplet className="w-3.5 h-3.5 text-blue-500"/> SpO2 (%)</label>
                  <Field type="number" name="spo2" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                  <ErrorMessage name="spo2" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20 disabled:opacity-50 flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Vitals
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Vitals;
