import React, { useState } from "react";
import { AlertTriangle, Terminal, RefreshCw } from "lucide-react";
import { useSharedHook } from "../../hooks/useSharedhook";

const Error = () => {
  const {navigate} = useSharedHook()
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b12] text-white flex items-center justify-center px-5 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="relative z-10 max-w-xl w-full text-center">

        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle size={38} className="text-red-500" />
          </div>
        </div>

        {/* Error Text */}
        <p className="text-red-500 font-mono text-sm tracking-[4px] mb-4">
          SYSTEM FAILURE // 500
        </p>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-5">
          Server Crashed<span className="text-red-500">!</span>
        </h1>

        <h2 className="text-xl font-semibold text-gray-300 mb-3">
         The Website is Down.
        </h2>

        <p className="text-gray-500 text-sm leading-6 max-w-md mx-auto">
          The system encountered an unexpected error and couldn't
          process your request. Our engineers have been notified.
        </p>

        {/* Terminal */}
        <div className="mt-10 bg-[#111827] border border-gray-800 rounded-xl p-5 text-left font-mono text-xs">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-gray-500 ml-2">system_log.exe</span>
          </div>

          <p className="text-green-400">root@system:~$ checking_status...</p>
          <p className="text-gray-400 mt-2">[ERROR] Connection interrupted</p>
          <p className="text-gray-400 mt-2">[ERROR] Unexpected system response</p>
          <p className="text-red-400 mt-2">[FAILED] Application crashed_</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            <RefreshCw size={16} />
            Try Again
          </button>

          {/* Secret Button */}
          <button
            onClick={() => setShowSecret(!showSecret)}
            className="px-6 py-3 rounded-xl border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 transition"
          >
            System Diagnostics
          </button>
        </div>

        {/* Hidden Chat Button */}
        {showSecret && (
          <button
            className="mt-5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition animate-pulse"
          >
            Enter Recovery Mode →
          </button>
        )}

        <p className="text-gray-700 text-xs mt-12">
          ERROR_CODE: 0x80004005 · ALL RIGHTS 
          <p onClick={()=>navigate("/login")}>
            RESERVED
         </p>
        </p>
      </div>
    </div>
  );
};

export default Error;
