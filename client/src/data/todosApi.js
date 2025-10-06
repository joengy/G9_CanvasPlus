import { supabase } from '../lib/supabaseClient.js';

export async function listTodos(userId) {
  const { data, error } = await supabase
    .from('todos')
    .select('id,title,description,due_date,class,done,created_at,updated_at')
    .eq('user_id', userId)
    .order('done', { ascending: true })
    .order('due_date', { ascending: true, nullsFirst: true })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createTodo(userId, values) {
  const payload = { user_id: userId, ...values, done: !!values.done };
  const { data, error } = await supabase
    .from('todos')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTodo(id, patch) {
  const { data, error } = await supabase
    .from('todos')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function removeTodo(id) {
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) throw error;
}