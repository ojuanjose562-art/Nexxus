import Lead from '../models/Lead.js';

export async function createLead(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
    const lead = new Lead({ name, email, message });
    await lead.save();
    res.status(201).json({ success: true, lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
