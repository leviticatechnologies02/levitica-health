import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatCard = ({ title, value, trend, trendLabel, icon: Icon, colorTheme = 'primary' }) => {
    const isPositive = trend?.startsWith('+');
    const isNegative = trend?.startsWith('-');
    const isNeutral = !isPositive && !isNegative;

    const colorVariants = {
        primary: 'bg-primary-50 text-primary-600 border-primary-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        orange: 'bg-orange-50 text-orange-600 border-orange-200',
        rose: 'bg-rose-50 text-rose-600 border-rose-200',
    };

    const themeClasses = colorVariants[colorTheme] || colorVariants.primary;
    const bgClass = themeClasses.split(' ')[0];
    const textClass = themeClasses.split(' ')[1];
    const borderClass = themeClasses.split(' ')[2];

    return (
        <div
            className={`group relative bg-cover bg-center rounded-3xl p-6 border-3 ${borderClass}  shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden cursor-default`}
            style={{ backgroundImage: "url('/assets/kpi_background.jpg')" }}
        >
            <div className="absolute inset-0 bg-white/85 group-hover:bg-white/75 transition-colors duration-500 z-0"></div>

            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-40 blur-2xl group-hover:opacity-70 transition-opacity duration-500 z-0 ${bgClass}`}></div>

            <div className="flex items-center justify-between mb-5 relative z-10">
                <h3 className="text-slate-500 text-lg font-bold tracking-wider">{title}</h3>
                {Icon && (
                    <div className={`p-2.5 rounded-xl ${bgClass} ${textClass} shadow-sm`}>
                        <Icon size={22} strokeWidth={2.5} />
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-slate-800 ">{value}</span>
                </div>

                {trend && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-md ${isPositive ? 'bg-emerald-50 text-emerald-700' :
                            isNegative ? 'bg-rose-50 text-rose-700' :
                                'bg-slate-100 text-slate-700'
                            }`}>
                            {isPositive && <TrendingUp size={14} className="mr-1" />}
                            {isNegative && <TrendingDown size={14} className="mr-1" />}
                            {isNeutral && <Minus size={14} className="mr-1" />}
                            {trend}
                        </span>
                        {trendLabel && (
                            <span className="text-xs text-slate-400 font-semibold">
                                {trendLabel}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
