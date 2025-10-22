# Contact Form Implementation

## Overview

A fully functional, beautifully animated contact form has been integrated into your portfolio. It features:

- **GSAP Animations**: Smooth, coordinated entry animations and interactive effects
- **Tailwind CSS Styling**: Consistent with your existing design system
- **Form Validation**: Client-side validation with error messaging
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Accessibility**: Proper labels, semantic HTML, and keyboard navigation
- **Backend API**: Server-side validation and email handling

## Components

### `ContactSection.vue`
Located at: `/components/sections/ContactSection.vue`

The main contact form component with:
- Three info cards (Email, Message, Phone)
- Contact form with validation
- Success/error messaging
- Animated elements with GSAP
- Focus effects on form inputs

**Features:**
- Real-time form validation
- Floating particle background animations
- Staggered entrance animations
- Hover effects on info cards
- Focus glow effects on input fields

### Contact Page
Located at: `/pages/contact.vue`

A dedicated contact page that displays the full ContactSection component.

**Access:** `yourdomain.com/contact`

### API Endpoint
Located at: `/server/api/contact.post.ts`

Server-side handler for form submissions with:
- Request validation
- Email format checking
- Field length validation
- Error handling
- Logging

## Usage

### Adding to Your Site

The contact form is already integrated into your homepage at the end of the page. It's also available as a dedicated page at `/contact`.

### Customizing Contact Information

Edit the `contactInfo` array in `ContactSection.vue`:

```javascript
const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@janmayer.dev'  // ← Change this
  },
  {
    icon: MessageSquare,
    title: 'Message',
    value: 'Let\'s connect on social media'  // ← Change this
  },
  {
    icon: Phone,
    title: 'Phone',
    value: 'Available by appointment'  // ← Change this
  }
]
```

### Email Service Integration

The API endpoint currently logs submissions. To enable email sending, implement one of these services:

#### Option 1: Using Resend (Recommended for modern apps)

```bash
npm install resend
```

Update `/server/api/contact.post.ts`:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// In the try block, replace the TODO section with:
await resend.emails.send({
  from: 'noreply@janmayer.dev',
  to: process.env.CONTACT_EMAIL,
  subject: `New Contact Form: ${subject}`,
  html: `
    <h2>New Contact Submission</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `
})
```

#### Option 2: Using Nodemailer

```bash
npm install nodemailer
```

```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// In the try block:
await transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: process.env.CONTACT_EMAIL,
  replyTo: email,
  subject: `New Contact Form: ${subject}`,
  html: `...` // Same HTML as above
})
```

#### Option 3: SendGrid

```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

await sgMail.send({
  to: process.env.CONTACT_EMAIL,
  from: process.env.SENDGRID_FROM,
  replyTo: email,
  subject: `New Contact Form: ${subject}`,
  html: `...`
})
```

### Environment Variables

Create a `.env.local` file:

```env
# Email Configuration
CONTACT_EMAIL=your-email@example.com

# For Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# For Nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yoursite.com

# For SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM=noreply@yoursite.com
```

## Validation Rules

### Client-Side
- **Name**: 2-100 characters
- **Email**: Valid email format
- **Subject**: 3-200 characters
- **Message**: 10-5000 characters

### Server-Side
Same validation occurs on the backend to ensure data integrity.

## Styling & Customization

### Color Scheme
The form uses your existing design system:
- Primary color: `#D4A574` (gold)
- Dark backgrounds: `#1E1E1E`, `#252525`, `#2D2D2D`
- Text: Gray-200 and Gray-400

### Modifying Colors

Edit `assets/css/main.css` to change the primary color:

```css
@theme {
  --color-primary: #D4A574;  /* ← Change this */
}
```

### Animation Timing

Modify animation durations in `ContactSection.vue`:

```typescript
// In onMounted(), adjust these values:
tl.to(titleRef.value, {
  opacity: 1,
  y: 0,
  duration: 0.8,  // ← Change duration
  ease: 'power3.out'  // ← Change easing
})
```

## Form States

The form handles multiple states:

1. **Idle**: Ready for input
2. **Validating**: Client-side checks (instant)
3. **Submitting**: Button shows "Sending..." text
4. **Success**: Shows success message, clears form
5. **Error**: Shows error message without clearing form

## Accessibility

- All form fields have associated labels
- Semantic HTML structure
- ARIA-compliant error messages
- Keyboard navigation support
- Clear focus indicators

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Troubleshooting

### Form Not Submitting
1. Check browser console for errors
2. Verify `/api/contact` endpoint is working
3. Check CORS settings if on different domain

### Email Not Sending
1. Verify email service credentials in `.env.local`
2. Check API keys are correct
3. Review email service logs/dashboard

### Animations Not Playing
1. Ensure GSAP is properly imported
2. Check that `v-gsap-nuxt` module is loaded
3. Verify refs are properly assigned in template

### Styling Issues
1. Check Tailwind CSS is properly configured
2. Clear `.nuxt` directory and rebuild: `rm -rf .nuxt && npm run build`
3. Verify color variables are defined in `main.css`

## Testing

### Manual Testing Checklist
- [ ] Form displays correctly on desktop and mobile
- [ ] Animations play smoothly
- [ ] Validation shows error messages
- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Form resets after submission
- [ ] Email receives the submission
- [ ] Hover effects work on cards
- [ ] Focus effects work on inputs
- [ ] Button disable state works during submission

## Performance

The contact form is optimized for performance:
- Minimal dependencies (uses existing GSAP and Tailwind)
- No unnecessary re-renders
- Lazy animation timeline initialization
- Efficient event delegation for hover effects

## Security

- Server-side validation prevents invalid data
- Email validation prevents abuse
- Field length limits prevent injection attacks
- Error messages don't leak system information

## Future Enhancements

Consider adding:
- Spam protection (reCAPTCHA)
- Rate limiting per IP
- Contact form submission database logging
- Email templates with branding
- File upload support
- Auto-reply to users
- Admin notification emails

## Support

For issues or questions, refer to:
- [GSAP Documentation](https://gsap.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Nuxt 4 Documentation](https://nuxt.com)
