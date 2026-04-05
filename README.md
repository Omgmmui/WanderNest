# WanderNest - Travel Booking Application

A full-stack travel booking application built with Next.js, Node.js, and nginx deployment.

## 🚀 Quick Start

### Local Development
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm start
```

### Production Deployment
```bash
# Build frontend
cd frontend
npm run build

# Deploy with PM2
pm2 start ecosystem.config.js
pm2 save
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: AWS EC2, PM2, nginx
- **SSL**: Let's Encrypt

## 📁 Project Structure

```
mmui/
├── frontend/          # Next.js frontend
│   ├── app/         # App routes (app directory)
│   │   ├── auth/    # Authentication page
│   │   ├── booking/ # Booking page
│   │   ├── contact/ # Contact page
│   │   ├── india/   # India attractions
│   │   ├── listing/ # Listing details
│   │   ├── search/  # Search results
│   │   ├── visa/    # Visa services
│   │   └── page.tsx # Home page
│   ├── components/  # React components
│   └── public/     # Static assets
├── backend/         # Express API server
└── docker-compose.yml
```

## 🌐 Deployment Steps

### 1. Server Setup (AWS EC2)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

### 2. Clone Repository
```bash
git clone https://github.com/Omgmmui/WanderNest.git
cd WanderNest
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run build
```

### 4. Setup Backend
```bash
cd ../backend
npm install
```

### 5. Configure PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. Configure nginx
```bash
sudo nano /etc/nginx/sites-available/default
```

nginx configuration:
```nginx
server {
    listen 80;
    server_name mmui.ddns.net;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name mmui.ddns.net;
    ssl_certificate /etc/letsencrypt/live/mmui.ddns.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mmui.ddns.net/privkey.pem;

    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 7. SSL Certificate
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d mmui.ddns.net
```

### 8. Restart Services
```bash
sudo systemctl restart nginx
pm2 restart all
```

## 📱 Features

### Implemented Pages
- **Home Page** (`/`): Hero section, search form, counters, deals
- **Search** (`/search`): Flights, Hotels, Tours, Deals with filters
- **India Attractions** (`/india`): Top Indian destinations by category
- **Visa Services** (`/visa`): Visa on Arrival, E-Visa, Sticker Visa
- **Contact** (`/contact`): Contact form with info
- **Auth** (`/auth`): Login/Register pages
- **Listing** (`/listing?id=`): Flight/Hotel/Tour details
- **Booking** (`/booking?id=`): Booking form

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/flights/search` - Search flights
- `POST /api/bookings` - Create booking

## 🔧 Environment Variables

```env
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/wandernest
JWT_SECRET=your_jwt_secret
PORT=5000

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📝 Features Added (Recent Updates)

1. **Navbar Updates** (2026-04-05)
   - Added highlighted navigation items: Flights, Hotels, Tours, Deals, India, Visa, Contact
   - All items now have yellow accent color with subtle background

2. **Search Page Enhancements**
   - Added Hotels section with 6 popular hotels (Grand Hyatt Dubai, Marriott Paris, etc.)
   - Added Tours section with 6 popular tours (Dubai City Tour, Paris Highlights, etc.)
   - Added Deals section with 8 hot deals
   - Added Flights section with 6 popular flights

3. **India Attractions Page** (`/india`)
   - Iconic Landmarks: Taj Mahal, Qutub Minar
   - Natural Wonders: Kerala Backwaters, Leh-Ladakh
   - Beaches: Goa
   - Spiritual: Varanasi, Golden Temple
   - Heritage: Jaipur
   - Hill Stations: Manali
   - Wildlife: Ranthambore National Park
   - Quick picks by interest (Romantic, Adventure, Chill, Spiritual, Culture)

4. **Visa Page** (`/visa`)
   - Visa on Arrival countries
   - E-Visa eligible countries
   - Sticker Visa countries
   - FAQ section
   - Offers and promotions

## 🎨 Design System

- **Primary Color**: #f59e0b (Amber)
- **Background**: #0a0e1a to #0f1e3d (Dark gradient)
- **Card**: rgba(30, 42, 64, 0.9)
- **Text**: #ffffff, rgba(255,255,255,0.6)

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👏 Credits

Built with ❤️ using Next.js and Express
