# Salama Blue Lodge Node.js Website - NameCheap Deployment Guide

## Prerequisites
- Node.js installed on NameCheap server (check via cPanel)
- SSH access to your NameCheap account
- FTP access configured

## Step-by-Step Deployment Instructions

### 1. Upload Files via FTP
- Use FTP (credentials: paymentsystem@salamabluelodge.net)
- Upload all files to your public_html or desired directory
- **Important**: Exclude these folders:
  - `node_modules/` (will be installed on server)
  - `.git/`
  - `.env.local` (will be created on server)

### 2. SSH Into Your NameCheap Server
```bash
ssh paymentsystem@salamabluelodge.net@server350.web-hosting.com
cd public_html  # or your directory
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Environment Variables
Create a `.env` file on the server:
```bash
nano .env
```
Add these lines:
```
PORT=8080
EMAIL_USER=kfikreselassie@gmail.com
EMAIL_PASS=your-gmail-app-password
NODE_ENV=production
```

### 5. Test the Server Locally
```bash
node server.js
```
Should output: `Server running on http://localhost:8080`

### 6. Use PM2 for Process Management (Recommended)
Install PM2:
```bash
npm install -g pm2
```

Start the server with PM2:
```bash
pm2 start server.js --name "salama-website"
pm2 startup
pm2 save
```

Verify it's running:
```bash
pm2 list
```

### 7. Configure cPanel (if needed)
1. Go to cPanel > Node.js Manager
2. Create a new Node.js app pointing to your directory
3. Set the application startup file to `server.js`
4. Set Node.js version and environment variables

### 8. Access Your Website
- Visit: `http://salamabluelodge.net` or your domain
- The server will listen on the configured port

## Troubleshooting

**Issue: "Cannot find module..."**
- Run: `npm install` on the server

**Issue: Port already in use**
- Change PORT in .env file to 8080 or another available port

**Issue: Environment variables not loading**
- Ensure .env file exists in the same directory as server.js
- Check file permissions: `chmod 600 .env`

**Issue: Emails not sending**
- Verify EMAIL_USER and EMAIL_PASS in .env
- Check Gmail app password is generated correctly
- Enable "Less secure app access" if needed (not recommended)

## Important Links
- NameCheap cPanel: `https://cpanel.salamabluelodge.net`
- Node.js Documentation: `https://nodejs.org/docs`
- PM2 Documentation: `https://pm2.keymetrics.io`