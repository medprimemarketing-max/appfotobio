interface SendEmailOptions {
  type: "verification" | "purchase_confirmation" | "subscription_expiry";
  to: string;
  data: Record<string, unknown>;
}

/**
 * Sends an email via Sinaptya's Resend-powered endpoint.
 * Non-blocking: logs errors but never throws exceptions.
 */
export async function sendEmailViaSinaptya(options: SendEmailOptions): Promise<boolean> {
  const apiUrl = process.env.SINAPTYA_EMAIL_API_URL;
  const apiKey = process.env.SINAPTYA_EMAIL_API_KEY;

  if (!apiUrl || !apiKey) {
    console.warn("[EmailService] SINAPTYA_EMAIL_API_URL or SINAPTYA_EMAIL_API_KEY not configured. Email not sent.");
    return false;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        type: options.type,
        to: options.to,
        data: options.data,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[EmailService] Sinaptya returned ${response.status}:`, errorBody);
      return false;
    }

    const result = await response.json() as { success: boolean };
    console.log(`[EmailService] Email sent (${options.type}) to ${options.to}`);
    return result.success;
  } catch (error) {
    console.error("[EmailService] Failed to send email:", error);
    return false;
  }
}
