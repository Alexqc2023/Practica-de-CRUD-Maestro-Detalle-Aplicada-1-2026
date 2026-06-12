import { supabase } from '../supabase/supabaseClient';
export async function getAddresses() {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .order('id', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAddressesByPersonId(personId) {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('person_id', personId)
    .order('id', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createAddress(address) {
  const { error } = await supabase
    .from('addresses')
    .insert(address);

  if (error) throw error;
}

export async function updateAddress(id, address) {
  const { error } = await supabase
    .from('addresses')
    .update(address)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteAddress(id) {
  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', id);

  if (error) throw error;
}