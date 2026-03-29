export const verificationEmailTemplate = (verificationUrl) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:30px;">
            
            <tr>
              <td align="center" style="font-size:24px;font-weight:bold;">
                Verify Your Email
              </td>
            </tr>

            <tr>
              <td style="padding:20px 0;font-size:16px;color:#555;">
                Thanks for signing up! Please click the button below to verify your email address.
              </td>
            </tr>

            <tr>
              <td align="center">
                <a href="${verificationUrl}" 
                   style="background:#007bff;color:#ffffff;padding:12px 20px;
                          text-decoration:none;border-radius:5px;display:inline-block;">
                  Verify Email
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 0;font-size:14px;color:#999;">
                If the button doesn't work, copy and paste this link into your browser:
                <br />
                <a href="${verificationUrl}" style="color:#007bff;">
                  ${verificationUrl}
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding-top:20px;font-size:12px;color:#aaa;text-align:center;">
                If you didn’t create an account, you can safely ignore this email.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
