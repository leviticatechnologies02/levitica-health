import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 z-0 flex flex-col">
        <div
          className="h-[50%] w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/login/login_top.png')" }}
        ></div>
        <div
          className="h-[50%] w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/login/login_bottom.png')" }}
        ></div>
      </div>

      <div className="relative z-10 flex w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden h-full max-h-[600px] animate-in fade-in zoom-in duration-700">

        <div className="hidden md:flex md:w-5/12 relative bg-secondary-900 flex-col justify-end p-8 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
            alt="Doctor"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90"
          />

          <div className="relative z-10 text-white animate-in slide-in-from-left duration-1000 delay-300">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
              <h2 className="text-sm font-light text-gray-200 mb-1">Welcome to</h2>
              <h1 className="text-2xl font-bold mb-3">Levitica <span className="text-primary-500">Medi</span>Sphere</h1>
              <p className="text-gray-300 leading-relaxed text-xs">
                Smarter Hospital Management System with secure and intelligent healthcare solutions. Experience the future of care.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 bg-white p-6 md:p-10 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-sm w-full mx-auto animate-in slide-in-from-right duration-1000 delay-150">
            <div className="text-center mb-6">
              <img
                src="/levitica_health.png"
                alt="Levitica Health"
                className="w-40 mx-auto mb-4 object-contain"
              />
              <h2 className="text-2xl font-bold text-secondary-900 mb-1">Login</h2>
              <p className="text-gray-500 text-xs">
                Enter your credentials to access your account
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="doctor@levitica.com"
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 cursor-pointer" />
                  <span className="ml-2 text-xs text-gray-600 group-hover:text-secondary-900 transition-colors">Remember Me</span>
                </label>
                <a href="#" className="text-xs font-medium text-primary-500 hover:text-primary-700 transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-sm py-2.5 rounded-lg hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
