export function WithdrawalRequestEmail({
  interviewerName,
  interviewerEmail,
  credits,
  platformFee,
  netAmount,
  paymentMethod,
  paymentDetail,
  reviewUrl,
}) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Withdrawal Request</title>
    </head>

    <body style="margin:0;padding:40px 16px;background:#f9fafb;font-family:Arial,sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e5e7eb;">

        <h1 style="margin:0;color:#111827;font-size:28px;">
          PrepHire
        </h1>

        <p style="color:#6b7280;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin-top:6px;">
          Withdrawal Request
        </p>

        <p style="font-size:15px;color:#374151;line-height:24px;margin-top:28px;">
          <strong>${interviewerName}</strong> (${interviewerEmail})
          has submitted a withdrawal request.
        </p>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

        <p><strong>Credits:</strong> ${credits}</p>

        <p>
          <strong>Platform Fee (20%):</strong>
          - $${platformFee.toFixed(2)}
        </p>

        <p>
          <strong>Net Payout:</strong>
          <span style="color:#7c3aed;font-weight:bold;">
            $${netAmount.toFixed(2)}
          </span>
        </p>

        <p><strong>Payment Method:</strong> ${paymentMethod}</p>

        <p><strong>Send To:</strong> ${paymentDetail}</p>

        <div style="margin-top:32px;text-align:center;">
          <a
            href="${reviewUrl}"
            style="
              background:#7c3aed;
              color:#ffffff;
              padding:14px 28px;
              border-radius:10px;
              text-decoration:none;
              font-weight:bold;
              display:inline-block;
            "
          >
            Review & Approve
          </a>
        </div>

        <p style="margin-top:40px;font-size:12px;color:#9ca3af;text-align:center;">
          This email was generated automatically by PrepHire.
        </p>

      </div>
    </body>
  </html>
  `;
}

export default WithdrawalRequestEmail;