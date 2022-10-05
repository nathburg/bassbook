import { checkError, client } from './Client';










export async function getPostDetail(id) {
  const resp = await client.from('posts').select('*').match({ id }).single();
  return checkError(resp);
}


export async function updatePost(id, title, description) {
  const resp = await client.from('posts').update({ id, title, description }).match({ id });
  return checkError(resp);
}