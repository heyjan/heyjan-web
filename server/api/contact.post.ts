/**
 * Contact Form API Endpoint
 * Handles contact form submissions and sends email notifications
 */

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

    // TODO: Implement email sending logic here
    // You can use services like:
    // - Nodemailer
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend (for transactional emails)

    // Example with environment variables:
    // const emailService = useEmailService()
    // await emailService.send({
    //   to: process.env.CONTACT_EMAIL,
    //   from: email,
    //   subject: `New Contact Form Submission: ${subject}`,
    //   html: generateEmailTemplate(name, email, subject, message)
    // })

    // Log the contact submission (you might want to save to database)
    console.log('Contact form submission received:', {
      name,
      email,
      subject,
      message,
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

    // Otherwise, return a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while processing your request'
    })
  }
})
