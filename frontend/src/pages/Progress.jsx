import { useEffect, useState } from 'react';
import { apiGet } from '../api/client';

// Show user's progress logs
export default function Progress(){
  const [logs, setLogs] = useState([]);
  useEffect(()=>{ apiGet('/progress/mine').then(setLogs); },[]);
  return (
    <div className="p-4">
      <h2>My Progress</h2>
      <ul>
        {logs.map(l=>(
          <li key={l._id}>
            Module {l.moduleId} — {l.isCompleted ? 'Completed' : 'In Progress'} — {l.timeSpentMin} min
          </li>
        ))}
      </ul>
    </div>
  );
}
