import React, { useMemo, useState } from "react";
import { Users, Clock, CheckCircle, Stethoscope, Search } from "lucide-react";
import StatCard from "../../components/common/StatCard";
import Table from "../../components/common/Table";
export default function PatientQueue() {
    const [queue, setQueue] = useState([
        { token: "T-001", uhid: "LEV1001", name: "Ramesh Kumar", doctor: "Dr Ravi Kumar", department: "General Medicine", status: "Waiting" },
        { token: "T-002", uhid: "LEV1002", name: "Suresh Kumar", doctor: "Dr Prasad", department: "Cardiology", status: "Waiting" },
        { token: "T-003", uhid: "LEV1003", name: "Anil Kumar", doctor: "Dr Mahesh", department: "Orthopedics", status: "Consultation Started" },
        { token: "T-004", uhid: "LEV1004", name: "Priya", doctor: "Dr Ravi Kumar", department: "Dermatology", status: "Completed" },
    ]);
    const [search, setSearch] = useState("");
    const filtered = useMemo(() => queue.filter(p => Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase())), [queue, search]);
    const counts = {
        total: queue.length,
        waiting: queue.filter(x => x.status === "Waiting").length,
        consult: queue.filter(x => x.status === "Consultation Started").length,
        completed: queue.filter(x => x.status === "Completed").length
    };
    const update = (i, s) => setQueue(q => q.map((x, idx) => idx === i ? { ...x, status: s } : x));
    const badge = s => ({ Waiting: "bg-yellow-100 text-yellow-700", "Consultation Started": "bg-blue-100 text-blue-700", Completed: "bg-green-100 text-green-700" }[s]);
    const columns = [
        { header: "Token", accessor: "token" },
        { header: "UHID", accessor: "uhid" },
        { header: "Patient", accessor: "name" },
        { header: "Doctor", accessor: "doctor" },
        { header: "Department", accessor: "department" },
        { header: "Status", render: r => <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(r.status)}`}>{r.status}</span> },
        { header: "Action", render: r => { const idx = queue.findIndex(x => x.token === r.token); return <div className="flex gap-2"><button onClick={() => update(idx, "Consultation Started")} className="px-3 py-2 rounded-lg bg-[#f95e09] text-white text-xs">Call</button><button onClick={() => update(idx, "Completed")} className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs">Complete</button></div> } }
    ];
    return <div className="min-h-screen space-y-6">
        <div><h1 className="text-3xl font-bold text-slate-800">Patient Queue Management</h1><p className="text-slate-500">Monitor and manage patient flow.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard title="Total Patients" value={counts.total} icon={Users} colorTheme="blue" />
            <StatCard title="Waiting" value={counts.waiting} icon={Clock} colorTheme="orange" />
            <StatCard title="In Consultation" value={counts.consult} icon={Stethoscope} colorTheme="purple" />
            <StatCard title="Completed" value={counts.completed} icon={CheckCircle} colorTheme="green" />
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 border">
            <div className="relative max-w-md"><Search className="absolute left-3 top-3 text-slate-400" size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Token, UHID, Patient..." className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f95e09]" /></div>
        </div>
        <Table columns={columns} data={filtered} />
    </div>
}