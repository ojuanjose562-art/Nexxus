import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../data/leads.json');

async function ensureDataFile() {
  try {
    await readFile(DATA_FILE, 'utf8');
  } catch (err) {
    await writeFile(DATA_FILE, '[]', 'utf8');
  }
}

export async function createLead(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    await ensureDataFile();
    const text = await readFile(DATA_FILE, 'utf8');
    const arr = JSON.parse(text || '[]');
    const lead = { id: Date.now().toString(), name, email, message, createdAt: new Date().toISOString() };
    arr.push(lead);
    await writeFile(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');

    console.log('Lead saved (file):', lead);
    res.status(201).json({ success: true, lead });
  } catch (err) {
    console.error('createLead error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
