import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} overflow-hidden animate-in zoom-in-95 duration-200`}>
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="text-xl font-bold text-slate-900">
                            {title}
                        </h2>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-lg transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                )}
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
