/**
 * A simple function for generate a random id.
 * @return {string}
 */
export default function randomId():string {
  let result = '';
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charLength = char.length;
  for ( let i = 0; i < charLength; i++ ) {
    result += char.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}
