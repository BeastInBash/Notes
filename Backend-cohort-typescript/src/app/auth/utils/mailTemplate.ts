export const verifyEmailTemplate = (otp: string) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Email Verification</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:20px 0;">
        <tr>
          <td align="center">
            
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background:#111827;color:#ffffff;padding:16px;text-align:center;font-size:20px;font-weight:bold;">
                  Your App
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding:24px;color:#333;font-size:16px;line-height:1.6;text-align:center;">
                  
                  <p style="margin-bottom:20px;">Your verification code is:</p>
                  
                  <div style="
                    display:inline-block;
                    padding:12px 24px;
                    font-size:24px;
                    font-weight:bold;
                    letter-spacing:4px;
                    background:#f3f4f6;
                    border-radius:6px;
                    color:#111827;
                  ">
                    ${otp}
                  </div>

                  <p style="margin-top:20px;font-size:14px;color:#666;">
                    This code will expire in 5 minutes.
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:12px;text-align:center;font-size:12px;color:#777;background:#f9fafb;">
                  © ${new Date().getFullYear()} Your App. All rights reserved.
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
