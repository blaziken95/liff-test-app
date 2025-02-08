This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This project is a web application that integrates with the LINE Front-end Framework (LIFF) to provide user authentication and display user information. It includes the following features:

- **LIFF Environment Information**: Displays information about the LIFF environment, such as whether the app is running in the LINE client and if the user is logged in.
- **User Profile**: Shows the user's profile information, including user ID, display name, status message, and profile picture.
- **User Friendship Information**: Provides details about the user's friendship status with the LINE official account.
- **Login and Logout**: Allows users to log in and out using their LINE account.
- **Troubleshooting**: Offers guidance on resolving common issues, such as checking provider and channel permissions if a 400 error occurs after login.

The application is built using Next.js and styled with Tailwind CSS for a responsive and modern user interface.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
