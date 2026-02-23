import fs from 'fs';
import path from 'path';

const userDataPath = path.resolve('data/user-data.json');

export function saveUserToJson(user: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) {
  fs.mkdirSync(path.dirname(userDataPath), { recursive: true });

  let users: typeof user[] = [];
  if (fs.existsSync(userDataPath)) {
    const raw = fs.readFileSync(userDataPath, 'utf-8');
    const parsed = JSON.parse(raw);

    // Handle both cases: existing array or single object
    if (Array.isArray(parsed)) {
      users = parsed;
    } else if (parsed && typeof parsed === 'object') {
      users = [parsed]; // Wrap single object in array
    }
  }

  users.push(user);
  fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
}

export function readTestUser() {
  if (!fs.existsSync(userDataPath)) {
    throw new Error(`❌ user-data.json not found. Run register test first.`);
  }

  const raw = fs.readFileSync(userDataPath, 'utf-8');
  const users = JSON.parse(raw);

  if (!Array.isArray(users) || users.length === 0) {
    throw new Error(`❌ No users found in user-data.json.`);
  }

  // Return the most recently added user (last in array)
  return users[users.length - 1];
}

// Optional: Helper to get all users if needed
export function readAllTestUsers() {
  if (!fs.existsSync(userDataPath)) {
    throw new Error(`❌ user-data.json not found. Run register test first.`);
  }

  const raw = fs.readFileSync(userDataPath, 'utf-8');
  const users = JSON.parse(raw);

  if (!Array.isArray(users)) {
    throw new Error(`❌ Invalid user-data.json format. Expected an array.`);
  }

  return users;
}
