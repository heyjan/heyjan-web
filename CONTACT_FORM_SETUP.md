# Contact Form Quick Setup

## ✅ What's Been Done

Your contact form is now **fully functional** and integrated into your portfolio:

1. **ContactSection Component** (`/components/sections/ContactSection.vue`)
   - Beautiful, animated form with validation
   - Three info cards with icons
   - Success/error messaging
   - GSAP animations and hover effects

2. **Dedicated Contact Page** (`/pages/contact.vue`)
   - Accessible at `/contact` route
   - Full page layout with header and footer

3. **API Endpoint** (`/server/api/contact.post.ts`)
   - Server-side validation
   - Error handling
   - Ready for email integration

4. **Homepage Integration**
   - Contact section added to your main index page
   - Appears as the last section before footer

## 🚀 Next Steps

### Step 1: Test Locally
```bash
npm run dev
```

Then visit:
- `http://localhost:3000` - See form on homepage
- `http://localhost:3000/contact` - Dedicated contact page

### Step 2: Configure Contact Info

Edit `/components/sections/ContactSection.vue` and update the `contactInfo` array with your actual contact details:

```javascript
const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'your.email@example.com'  // 👈 Update this
  },
  {
    icon: MessageSquare,
    title: 'Message',
    value: 'Your social media or messaging info'  // 👈 Update this
  },
  {
    icon: Phone,
    title: 'Phone',
    value: 'Your contact info'  // 👈 Update this
  }
]
```

### Step 3: Set Up Email Sending (Optional but Recommended)

Currently, form submissions are only logged to the server console. To receive emails:

#### Quick Option: Use Resend
```bash
npm install resend
```

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Create `.env.local`:
```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your-email@example.com
```

4. Update `/server/api/contact.post.ts` - replace the TODO section with:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Inside the try block:
await resend.emails.send({
  from: 'noreply@janmayer.dev',
  to: process.env.CONTACT_EMAIL,
  subject: `New Contact: ${subject}`,
  html: `
    <h2>New Contact Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `
})
```

## 📋 Features Included

✨ **Visual & UX**
- Smooth GSAP animations on load
- Hover effects on info cards
- Focus glow effects on inputs
- Responsive mobile design
- Matches your gold (#D4A574) color scheme

🔒 **Validation**
- Client-side validation (instant feedback)
- Server-side validation (security)
- Field length limits
- Email format checking
- Descriptive error messages

🎨 **Design**
- Consistent with your portfolio aesthetic
- Floating particle background
- Gradient orbs
- Dark theme with gold accents
- Professional layout

⚡ **Performance**
- Optimized animations
- No unnecessary dependencies
- Efficient event handling
- Minimal bundle impact

## 🧪 Testing the Form

1. Visit `/contact` or scroll to contact section on homepage
2. Try submitting with empty fields - see validation errors
3. Enter valid data and submit
4. See success message and form reset
5. Check server console for submission log

## 📝 Form Field Validation

**All fields are required and validated:**
- **Name**: 2-100 characters
- **Email**: Valid email format
- **Subject**: 3-200 characters  
- **Message**: 10-5000 characters

## 🎯 Common Customizations

### Change Button Text
In `ContactSection.vue`, find the button element and modify:
```html
<span v-if="!isSubmitting">Send Message</span>
<!-- Change "Send Message" to your preferred text -->
```

### Change Form Title/Description
In `ContactSection.vue`, find:
```html
<h2 class="text-4xl md:text-5xl font-serif text-white mb-4">Get In Touch</h2>
<p class="text-gray-400 text-lg">Let's discuss your project or just say hello</p>
```

### Adjust Animation Speed
In `ContactSection.vue` `onMounted()`, modify duration values:
```typescript
tl.to(titleRef.value, {
  opacity: 1,
  y: 0,
  duration: 0.8,  // ← Reduce for faster, increase for slower
  ease: 'power3.out'
})
```

### Change Primary Color
In `assets/css/main.css`:
```css
@theme {
  --color-primary: #D4A574;  /* ← Change this hex code */
}
```

## 🐛 Troubleshooting

**Form not showing?**
- Clear `.nuxt` directory: `rm -rf .nuxt`
- Rebuild: `npm run build`

**Animations not playing?**
- Check browser console for errors
- Ensure GSAP is loaded: `npm install gsap`

**Email not working?**
- Check `.env.local` has correct API key
- Verify email service account is active
- Check server console for error messages

**Styling looks off?**
- Clear cache: `Ctrl+Shift+R` (or `Cmd+Shift+R`)
- Rebuild Tailwind: `npm run dev`

## 📚 Full Documentation

For detailed information on customization, email services, accessibility, and more, see:
- [CONTACT_FORM_README.md](./CONTACT_FORM_README.md)

## ✨ You're All Set!

Your contact form is ready to use. Users can now easily reach out to you from your portfolio!

**Questions?** Check the comprehensive README or review the component code - it's well-commented.
