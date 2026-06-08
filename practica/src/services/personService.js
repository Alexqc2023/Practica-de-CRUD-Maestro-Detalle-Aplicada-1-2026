import { supabase } from '../supabase/supabaseClient';

export async function getPeople() {
  const { data, error } = await supabase
    .from('people')
    .select('*')
    .order('id', { ascending: false });

  if (error) throw error;

  return data;
}

export async function getPersonById(id) {
  const { data, error } = await supabase
    .from('people')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}

export async function createPerson(person) {
  const { error } = await supabase
    .from('people')
    .insert(person);

  if (error) throw error;
}

export async function updatePerson(id, person) {
  const { error } = await supabase
    .from('people')
    .update(person)
    .eq('id', id);

  if (error) throw error;
}

export async function deletePerson(id) {
  const { error } = await supabase
    .from('people')
    .delete()
    .eq('id', id);

  if (error) throw error;
}