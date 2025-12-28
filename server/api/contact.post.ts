/**
 * Contact Form API Endpoint
 * Handles contact form submissions and sends email notifications using Resend
 */

import { Resend } from 'resend'

/**
 * Generate HTML email template for contact form submissions
 */
function generateEmailTemplate(name: string, email: string, subject: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #D4A574; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #D4A574;">
          <p style="margin: 0 0 15px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 15px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #D4A574; text-decoration: none;">${escapeHtml(email)}</a></p>
          <p style="margin: 0 0 15px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #e0e0e0;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">Message:</h2>
          <p style="white-space: pre-wrap; color: #555;">${escapeHtml(message)}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0;">This email was sent from the contact form on heyjan.de</p>
          <p style="margin: 5px 0 0 0;">Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}</p>
        </div>
      </body>
    </html>
  `
}

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export default defineEventHandler(async (event) => {
  try {
    // Get request body
    const body = await readBody(event)

    // Validate required fields
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // Validate field lengths
    if (name.length < 2 || name.length > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name must be between 2 and 100 characters'
      })
    }

    if (subject.length < 3 || subject.length > 200) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Subject must be between 3 and 200 characters'
      })
    }

    if (message.length < 10 || message.length > 5000) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message must be between 10 and 5000 characters'
      })
    }

    // Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not set')
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service configuration error'
      })
    }

    const resend = new Resend(resendApiKey)

    // Get email configuration from environment variables
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'contact@heyjan.de'
    const toEmail = process.env.CONTACT_EMAIL || 'jan@heyjan.de'

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: generateEmailTemplate(name, email, subject, message),
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    })

    if (emailResult.error) {
      console.error('Resend API error:', emailResult.error)
      throw new Error(`Failed to send email: ${emailResult.error.message || 'Unknown error'}`)
    }

    if (!emailResult.data) {
      throw new Error('Failed to send email: No response data received')
    }

    // Log successful submission
    console.log('Contact form submission sent successfully:', {
      name,
      email,
      subject,
      messageId: emailResult.data.id,
      timestamp: new Date().toISOString()
    })

    // Return success response
    return {
      success: true,
      message: 'Your message has been received. We will get back to you soon!'
    }
  } catch (error) {
    console.error('Contact form error:', error)

    // If it's already a custom error, re-throw it
    if (error.statusCode) {
      throw error
    }

    // Handle Resend API errors
    if (error instanceof Error && (error.message.includes('Failed to send email') || error.message.includes('Resend'))) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send email. Please try again later.'
      })
    }

    // Otherwise, return a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while processing your request'
    })
  }
})
