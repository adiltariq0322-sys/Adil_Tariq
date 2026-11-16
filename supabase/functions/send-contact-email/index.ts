import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';
const TO_EMAIL = 'adiltariq0327@gmail.com';

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { name, email, subject, message } = parsed.data;

    const html = `
      <div style="background:#f4f4f7;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <div style="background:linear-gradient(135deg,#047857,#065f46);padding:28px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Portfolio Inquiry</h1>
            <p style="margin:6px 0 0;color:#d1fae5;font-size:13px;">Sent from adiltariq.com contact form</p>
          </div>
          <div style="padding:28px 32px;color:#1f2937;">
            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">You've received a new message from a potential client.</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:10px 0;color:#6b7280;width:90px;border-bottom:1px solid #f3f4f6;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;border-bottom:1px solid #f3f4f6;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><a href="mailto:${escapeHtml(email)}" style="color:#047857;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;border-bottom:1px solid #f3f4f6;">Subject</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${escapeHtml(subject)}</td></tr>
            </table>
            <div style="margin-top:24px;">
              <p style="margin:0 0 10px;color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
              <div style="background:#f9fafb;border-left:3px solid #047857;padding:16px 18px;border-radius:6px;white-space:pre-wrap;line-height:1.6;color:#111827;">${escapeHtml(message)}</div>
            </div>
            <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f3f4f6;">
              <a href="mailto:${escapeHtml(email)}?subject=Re:%20${encodeURIComponent(subject)}" style="display:inline-block;background:#047857;color:#ffffff;padding:11px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Reply to ${escapeHtml(name)}</a>
            </div>
          </div>
          <div style="background:#f9fafb;padding:18px 32px;text-align:center;color:#9ca3af;font-size:12px;">
            Adil Tariq · AI Engineer & Automation Expert
          </div>
        </div>
      </div>`;

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'Adil Tariq <onboarding@resend.dev>',
        to: [TO_EMAIL],
        reply_to: [email, TO_EMAIL],
        subject: `New Portfolio Inquiry: ${subject}`,
        html,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error('Resend error:', resp.status, data);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: data }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-contact-email error:', err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
