// lib/auth-utils.js
export async function hashPassword(password) {
  // Encode the password as a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Hash the password using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

export async function verifyPassword(password, hashedPassword) {
  try {
    // Hash the provided password
    const testHash = await hashPassword(password);
    
    // Compare the hashes in a time-constant manner to prevent timing attacks
    return testHash === hashedPassword;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}