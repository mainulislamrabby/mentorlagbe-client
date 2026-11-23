# MentorLagbe – Smart Tuition & Mentorship Platform

MentorLagbe is a full-stack tuition management and mentorship platform that connects students with qualified tutors. Students can discover tuition opportunities, apply for their preferred tuition posts, and manage their applications. Tutors can publish tuition listings, manage applicants, and upgrade to a Pro subscription. Admins can manage users, moderate tuition listings, and monitor platform transactions.

## Live Demo

- **Live Website:** https://mentorlagbe-gamma.vercel.app/
- **Client Repository:** https://github.com/mainulislamrabby/mentorlagbe-client
- **Server Repository:** https://github.com/mainulislamrabby/mentorlagbe-server

## Admin Credentials

Use the following credentials to explore the admin dashboard:

- **Email:** nusrat.jahan@example.com
- **Password:** Test@12345

## Test Accounts

**Tutor Account**
- **Email:** karim.hasan@example.com
- **Password:** Test@12345

**Student Account**
- Register a new account using the Student role.

## Features

### Authentication & User Management
- Secure authentication using Better Auth.
- Role-based registration for Students and Tutors.
- JWT-based authentication and API authorization.
- Three user roles: Student, Tutor, and Admin.
- Profile management with image upload.
- Protected dashboard routes and role-based access.

### Student Features
- Browse approved and active tuition listings.
- Search tuition posts by title or subject.
- Filter by subject, class level, and learning mode.
- View detailed tuition information and tutor profiles.
- Apply for tuition opportunities.
- Prevent duplicate applications.
- Track application statuses.
- Cancel pending applications.
- Upgrade to the Pro plan using Stripe.

### Tutor Features
- Create tuition listings with banner image uploads.
- Manage personal tuition listings.
- Edit, delete, and activate/deactivate tuition posts.
- View application statistics.
- Manage student applications.
- Accept or reject applications.
- Free plan supports up to two tuition posts.
- Pro plan supports unlimited tuition posts.

### Admin Features
- View platform statistics.
- Manage registered users and user roles.
- Approve or reject tuition listings.
- View all tuition posts.
- Monitor Stripe subscription transactions.

### Payment System
- Stripe-hosted Checkout integration.
- Separate Pro subscription plans for Students and Tutors.
- Stripe webhook integration.
- Automatic subscription plan updates after successful payment.
- Transaction records stored in MongoDB.

### Additional Features
- Responsive design for mobile, tablet, and desktop.
- ImgBB image upload integration.
- Loading and error states.
- Custom 404 Not Found page.
- Toast notifications for user feedback.
- Dynamic dashboard statistics.
- Server-side tuition search and filtering.

## Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React
- Better Auth Client
- Sonner
- Swiper

### Backend
- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- Better Auth
- JOSE (JWT verification)
- Stripe

### Third-Party Services
- **Better Auth:** Authentication and session management.
- **MongoDB Atlas:** Database hosting.
- **Stripe:** Subscription payments and webhooks.
- **ImgBB:** Image hosting and uploads.

## Database Architecture

MentorLagbe uses four MongoDB collections:

| Collection | Purpose |
|---|---|
| `users` | Stores user accounts, roles, profiles, and subscription plans. |
| `tuitions` | Stores tutor-created tuition listings and approval statuses. |
| `applications` | Stores student applications and tutor decisions. |
| `payments` | Stores subscription payment and transaction records. |

## Project Structure

```text
MentorLagbe/
├── mentorlagbe-client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   ├── .env.local
│   └── package.json
│
└── mentorlagbe-server/
    ├── index.js
    ├── .env
    └── package.json
```

## Environment Variables

### Frontend – `.env.local`

Create a `.env.local` file inside the `mentorlagbe-client` directory.

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
BETTER_AUTH_URL=your_better_auth_url
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

### Backend – `.env`

Create a `.env` file inside the `mentorlagbe-server` directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string
DB_NAME=mentorlagbe

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=your_better_auth_url
NEXT_PUBLIC_CLIENT_URL=your_frontend_url

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_STUDENT_PRICE_ID=your_student_price_id
STRIPE_TUTOR_PRICE_ID=your_tutor_price_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

**Important:** Never commit `.env` or `.env.local` files to GitHub. Keep all private credentials secure.

## Installation & Setup

### 1. Clone the repositories

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
git clone YOUR_SERVER_REPOSITORY_URL
```

### 2. Setup the Backend

```bash
cd mentorlagbe-server
npm install
```

Configure the backend `.env` file and start the server:

```bash
npm run dev
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd mentorlagbe-client
npm install
```

Configure the frontend `.env.local` file and start the development server:

```bash
npm run dev
```

### 4. Open the Application

Visit:

```text
http://localhost:3000
```

The backend runs on:

```text
http://localhost:5000
```

## Stripe Webhook Setup

For local Stripe webhook testing, install and configure the Stripe CLI.

Run:

```bash
stripe listen --events checkout.session.completed --forward-to localhost:5000/stripe/webhook
```

Copy the generated webhook signing secret into the backend `.env` file:

```env
STRIPE_WEBHOOK_SECRET=your_webhook_signing_secret
```

Restart the backend server after updating the environment variables.

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Backend

```bash
npm run dev
npm start
```

*Available scripts depend on the respective `package.json` configuration.*

## Security

- JWT verification for protected backend endpoints.
- Role-based authorization using custom Express middleware.
- Server-side ownership verification for protected resources.
- Environment variables for private credentials.
- Stripe webhook signature verification.
- Protected dashboard routes.
- Server-side validation for sensitive operations.

## Developer

**MD Mainul Islam Rabby**

Full-Stack Web Developer

**Project:** MentorLagbe – Smart Tuition & Mentorship Platform

---

*MentorLagbe – Connecting Students with the Right Tutors.*