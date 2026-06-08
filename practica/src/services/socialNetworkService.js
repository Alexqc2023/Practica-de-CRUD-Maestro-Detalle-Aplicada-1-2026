import { supabase } from '../supabase/supabaseClient';

export async function getSocialNetworksByPersonId(personId) {
  const { data, error } = await supabase
    .from('social_networks')
    .select('*')
    .eq('person_id', personId)
    .order('id', { ascending: false });

  if (error) throw error;

  return data;
}

export async function createSocialNetwork(socialNetwork) {
  const { error } = await supabase
    .from('social_networks')
    .insert(socialNetwork);

  if (error) throw error;
}

export async function updateSocialNetwork(id, socialNetwork) {
  const { error } = await supabase
    .from('social_networks')
    .update(socialNetwork)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteSocialNetwork(id) {
  const { error } = await supabase
    .from('social_networks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}