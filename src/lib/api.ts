import type { InsertInquiry } from './inquirySchema';

export async function submitInquiry(data: InsertInquiry) {
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to submit inquiry');
  }
}
