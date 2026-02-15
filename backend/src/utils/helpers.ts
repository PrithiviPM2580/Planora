import config from "@/config/env.config.js";

export const expiresAt = () => {
  return new Date(Date.now() + 60 * 60 * 1000);
};

export function verificationEmailTemplate(name = "User", verifyLink = "") {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Verify your email</title>
  <style>
    body { background:#f6f9fc; font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial; margin:0; padding:0; }
    .container { max-width:600px; margin:40px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.06); }
    .header { background:#0b5fff; color:#fff; padding:20px 24px; text-align:center; font-size:20px; }
    .content { padding:24px; color:#0f1724; line-height:1.5; }
    .btn { display:inline-block; background:#0b5fff; color:#fff; text-decoration:none; padding:12px 20px; border-radius:6px; font-weight:600; }
    .muted { color:#6b7280; font-size:13px; }
    .footer { padding:16px 24px; font-size:12px; color:#9ca3af; text-align:center; }
    .fallback { word-break:break-all; color:#0b5fff; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Planora</div>
    <div class="content">
      <p style="margin:0 0 16px 0;">Hi ${name},</p>
      <p style="margin:0 0 20px 0;">Thanks for creating an account. Please verify your email address by clicking the button below. This link will expire in 15 minutes.</p>
      <p style="text-align:center; margin:0 0 20px 0; color:#ffffff;">
        <a href="${config.FRONTEND_URL}/verify-email?token=${verifyLink}" class="btn" style="color:#ffffff;">Verify Email</a>
      </p>
      <p class="muted" style="margin:0 0 12px 0;">If the button doesn't work, copy and paste the URL below into your browser:</p>
      <p class="fallback" style="margin:0 0 18px 0;">${verifyLink}</p>
      <p class="muted" style="margin:0;">If you didn't request this, you can safely ignore this email.</p>
    </div>
    <div class="footer">© ${new Date().getFullYear()} Planora. All rights reserved.</div>
  </div>
</body>
</html>`;
}
