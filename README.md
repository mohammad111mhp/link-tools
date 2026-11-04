# QR Code Generator & URL Shortener

A full-stack web application that allows users to shorten long URLs, generate QR codes, and track link visits.

## Preview

![Link Tool Preview](./screenshots/Link%20Tool.png)

## Features

- **URL Shortening:** Convert long URLs into short, shareable links.
- **QR Code Generation:** Generate QR codes from URLs and other content.
- **QR Code Download:** Save generated QR codes as PNG images.
- **Visit Tracking:** Track clicks on shortened links.
- **QR Scan Tracking:** Keep track of QR code scans.
- **REST API:** Versioned backend API.
- **Responsive UI:** User interface built with React and Tailwind CSS.

## Tech Stack

### Frontend
- React 19
- Vite 8
- React Router
- Tailwind CSS 4
- daisyUI
- Axios

### Backend
- Node.js
- Express 5
- Prisma ORM 7
- SQLite
- better-sqlite3
- nanoid
- qrcode

## Project Structure

```text
link-shortener/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   ├── prisma.config.js
│   └── package.json
│
├── screenshots/
│   └── Link Tool.png
│
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### 1. Clone the repository

```bash
git clone https://github.com/mohammad111mhp/link-tools
cd link-shortener
```

### 2. Configure environment variables

Navigate to the server directory:

```bash
cd server
```

Create a `.env` file using the example configuration:

```bash
cp .env.example .env
```

Example environment variables:

```env
DATABASE_URL="file:./dev.db"
PORT=5000
BASE_URL="http://localhost:5000"
FRONTEND_URL="http://localhost:5173"
```

### 3. Install dependencies

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies in another terminal:

```bash
cd client
npm install
```

### 4. Set up the database

From the server directory, apply the existing Prisma migrations:

```bash
npx prisma migrate deploy
npx prisma generate
```

### 5. Run the application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Vite will display the frontend development URL in the terminal.

## API

The backend provides versioned REST API endpoints under:

```text
/api/v1/links
```

Generated QR code images are served from:

```text
/api/qrcode/<filename>.png
```

## Database

The application uses SQLite with Prisma ORM.

### Link

Stores shortened URLs and their visit statistics.

- `id`: Unique record identifier
- `originalUrl`: Original destination URL
- `shortCode`: Unique short URL identifier
- `clicks`: Number of visits
- `createdAt`: Creation timestamp

### Qrcode

Stores QR code information and scan statistics.

- `id`: Unique record identifier
- `content`: Encoded content
- `name`: Unique QR code image filename
- `scans`: Number of scans
- `createdAt`: Creation timestamp

## QR Code Generation

QR codes are generated as Data URLs for frontend previews and saved as PNG files on the server.

Unique filenames are used to avoid filename conflicts.

## License

This project is licensed under the ISC License.
