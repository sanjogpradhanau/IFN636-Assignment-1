import { useEffect, useState } from 'react';
import { apiGet, apiJSON } from '../api/client';

// Minimal CRUD UI for Course
export default function Courses(){
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', passingScore:60 });
  const [editing, setEditing] = useState(null);

  const load = async ()=> setItems(await apiGet('/courses'));
  useEffect(()=>{ load(); },[]);

  const create = async (e)=>{
    e.preventDefault();
    await apiJSON('/courses','POST', form);
    setForm({ title:'', description:'', passingScore:60 });
    load();
  };

  const beginEdit = (c)=>{ setEditing(c); setForm({ title:c.title, description:c.description||'', passingScore:c.passingScore||60 }); };
  const update = async (e)=>{
    e.preventDefault();
    await apiJSON(`/courses/${editing._id}`,'PUT', form);
    setEditing(null);
    setForm({ title:'', description:'', passingScore:60 });
    load();
  };

  const del = async (id)=>{ await apiJSON(`/courses/${id}`,'DELETE'); load(); };

  return (
    <div className="p-4" style={{maxWidth:720}}>
      <h2>Courses</h2>

      <form onSubmit={editing ? update : create} style={{display:'grid',gap:8,margin:'12px 0'}}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <input type="number" placeholder="Passing Score" value={form.passingScore} onChange={e=>setForm({...form,passingScore:Number(e.target.value)})}/>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={()=>{setEditing(null);setForm({title:'',description:'',passingScore:60});}}>Cancel</button>}
      </form>

      <table width="100%" border="1" cellPadding="8">
        <thead><tr><th>Title</th><th>Passing</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(c=>(
            <tr key={c._id}>
              <td>{c.title}</td>
              <td>{c.passingScore}</td>
              <td>
                <button onClick={()=>beginEdit(c)}>Edit</button>{' '}
                <button onClick={()=>del(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
