const fs = require('fs');
const path = 'src/app/(app)/admin/stats/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Update Interface
code = code.replace(
  'interface TopStudentData { id: string; name: string; score: number; activity: string }',
  'interface TopStudentData { id: string; name: string; score: number; activity: string; targetMajor?: string | null; targetUni?: string | null; }'
);

// 2. Add Filter States
const stateAnchor = 'const [advancedStats, setAdvancedStats] = useState<any>(null);';
const statesToAdd = `
  // Filter States
  const [universities, setUniversities] = useState<{id: string, name: string}[]>([]);
  const [majors, setMajors] = useState<{id: string, name: string}[]>([]);
  const [filterUni, setFilterUni] = useState<string>("");
  const [filterMajor, setFilterMajor] = useState<string>("");
`;
if(code.includes(stateAnchor)) {
    code = code.replace(stateAnchor, stateAnchor + '\n' + statesToAdd);
}

// 3. Remove fetch from initial Promise.all and create dedicated useEffect
const fetchAnchor1 = 'fetch("/api/admin/stats/top-students").then(r => r.json()).then(d => setTopStudents(d.data || [])).catch(() => {}),';
code = code.replace(fetchAnchor1, ''); // Remove it from Promise.all

// Add new useEffects
const initUseEffectAnchor = '}, [])';
const newUseEffects = `
  useEffect(() => {
    fetch("/api/universities").then(r => r.json()).then(d => setUniversities(d.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (filterUni) {
      fetch(\`/api/majors?uniId=\${filterUni}\`).then(r => r.json()).then(d => setMajors(d.data || [])).catch(() => {});
    } else {
      setMajors([]);
    }
  }, [filterUni]);

  useEffect(() => {
    let url = "/api/admin/stats/top-students";
    const params = new URLSearchParams();
    if (filterUni) params.append("universityId", filterUni);
    if (filterMajor) params.append("majorId", filterMajor);
    if (params.toString()) url += "?" + params.toString();
    
    fetch(url).then(r => r.json()).then(d => setTopStudents(d.data || [])).catch(() => {});
  }, [filterUni, filterMajor]);
`;
if (code.includes(initUseEffectAnchor)) {
    // Careful to only replace the first one which is the main initialization
    code = code.replace('  }, [])\n', '  }, [])\n' + newUseEffects + '\n');
}

// 4. Update UI for Leaderboard Table
const leaderboardHeaderAnchor = `              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard Siswa
                </h2>
              </div>`;

const newLeaderboardHeader = `              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard Siswa
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select 
                    value={filterUni} 
                    onChange={e => { setFilterUni(e.target.value); setFilterMajor(""); }}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[var(--accent)] text-slate-600"
                  >
                    <option value="">Semua Kampus</option>
                    {universities.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                  <select 
                    value={filterMajor} 
                    onChange={e => setFilterMajor(e.target.value)}
                    disabled={!filterUni}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[var(--accent)] text-slate-600 disabled:opacity-50"
                  >
                    <option value="">Semua Jurusan</option>
                    {majors.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>`;

code = code.replace(leaderboardHeaderAnchor, newLeaderboardHeader);

const thAnchor = `<th className="py-3 px-4">Nama Siswa</th>`;
const newTh = `<th className="py-3 px-4">Nama Siswa</th>\n                        <th className="py-3 px-4 hidden sm:table-cell">Target Kampus</th>`;
code = code.replace(thAnchor, newTh);

const tdAnchor = `<td className="py-3 px-4 text-slate-800 font-semibold">{student.name}</td>`;
const newTd = `<td className="py-3 px-4 text-slate-800 font-semibold">{student.name}</td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            {student.targetUni ? (
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700">{student.targetMajor}</span>
                                <span className="text-[10px] text-slate-500">{student.targetUni}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 italic">Belum diatur</span>
                            )}
                          </td>`;
code = code.replace(tdAnchor, newTd);

const colSpanAnchor = `<td colSpan={4} className="py-8 text-center text-slate-400">Belum ada leaderboard.</td>`;
const newColSpan = `<td colSpan={5} className="py-8 text-center text-slate-400">Belum ada leaderboard.</td>`;
code = code.replace(colSpanAnchor, newColSpan);

// 5. Add AI Log Data
const aiLogData = `
const DUMMY_AI_LOGS = [
  { id: 1, time: "10:45", date: "18 Jul", user: "asya arman", route: "/tryouts/snbt-2024/pengerjaan", action: "Penjelasan Socrates: Geometri", tokens: 845, feature: "Tutor AI" },
  { id: 2, time: "09:30", date: "18 Jul", user: "FIRDA", route: "/materi/penalaran-matematika", action: "Generate 5 Soal Tambahan Latihan", tokens: 1250, feature: "Generate Soal" },
  { id: 3, time: "08:15", date: "18 Jul", user: "addr", route: "/dashboard", action: "Analisis Rekomendasi Kampus Harian", tokens: 2100, feature: "Analisis Rapor" },
  { id: 4, time: "20:20", date: "17 Jul", user: "Cintia", route: "/tryouts/snbt-2024/pengerjaan", action: "Hint 1: Peluang Empiris", tokens: 320, feature: "Tutor AI" },
  { id: 5, time: "19:10", date: "17 Jul", user: "selfii", route: "/materi/literasi-indonesia", action: "Penjelasan Lengkap (Solution)", tokens: 1100, feature: "Tutor AI" },
];
`;
const importAnchor = `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'`;
code = code.replace(importAnchor, importAnchor + '\n' + aiLogData);


// 6. Add AI Log Table to AI Tab
const aiTabEndAnchor = `                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}`;

const newAiTable = `                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* AI Log Activity Table */}
            <motion.div variants={fadeUp} className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 mt-6 overflow-hidden">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[var(--accent)]" /> Log Aktivitas Token AI
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">Waktu</th>
                      <th className="py-3 px-4">Pengguna</th>
                      <th className="py-3 px-4">Lokasi (Route)</th>
                      <th className="py-3 px-4">Aktivitas</th>
                      <th className="py-3 px-4 text-right">Pemakaian Token</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-medium text-xs">
                    {DUMMY_AI_LOGS.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-700">{log.time}</span> <span className="text-[10px] text-slate-400">{log.date}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                              {log.user.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-slate-700 font-semibold">{log.user}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[10px] text-slate-500 bg-slate-50 rounded px-2">{log.route}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="text-slate-800">{log.action}</span>
                            <span className="text-[10px] text-slate-400">{log.feature}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-bold text-[var(--accent-dark)] bg-indigo-50 px-2 py-1 rounded-md">-{log.tokens}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
            
          </div>
        )}
      </div>
    </div>
  )
}`;

code = code.replace(aiTabEndAnchor, newAiTable);

fs.writeFileSync(path, code);
console.log("Stats page modified successfully!");
