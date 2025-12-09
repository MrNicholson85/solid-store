# Audiophile E-Commerce Store

A modern, high-performance e-commerce platform for premium audio equipment built with SolidJS and Appwrite. Features a complete admin system for product management, user authentication, and dynamic product pages.

![SolidJS](https://img.shields.io/badge/SolidJS-v1.9.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1.13-38B2AC)
![Appwrite](https://img.shields.io/badge/Appwrite-v21.5.0-F02E65)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Live Demo

[View Live Site](#) <!-- Add your Vercel URL here -->

## ✨ Features

### Customer Features
- 🛍️ **Product Catalog**: Browse products by category (Headphones, Speakers, Earphones)
- 🔍 **Dynamic Product Pages**: Detailed product information with image galleries
- 🎨 **Responsive Design**: Mobile-first design with Tailwind CSS v4
- 📦 **Product Details**: Features, specifications, and "In The Box" contents
- 🖼️ **Image Galleries**: Multiple product images with Appwrite storage integration

### Admin Features
- 🔐 **Authentication System**: Secure login/signup with Appwrite
- ➕ **Product Creation**: Add new products with multiple images
- ✏️ **Product Management**: Edit and delete existing products
- 🔢 **Auto-incrementing IDs**: Automatic product ID generation
- 📊 **Admin Dashboard**: User profile with quick actions
- 🖼️ **Image Management**: Featured and additional image uploads
- 📝 **Dynamic Fields**: Flexible "In The Box" items with quantity

### Technical Features
- ⚡ **Fast Performance**: SolidJS reactive framework
- 🎯 **Client-side Routing**: @solidjs/router for seamless navigation
- 🗄️ **Backend as a Service**: Appwrite for database and storage
- 🔄 **Real-time Updates**: Reactive state management
- 🎨 **Modern UI**: Tailwind CSS v4 with custom theme
- 📱 **SPA Architecture**: Single Page Application with proper routing

## 🛠️ Tech Stack

### Frontend
- **Framework**: [SolidJS](https://solidjs.com) v1.9.9
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4.1.13
- **Routing**: [@solidjs/router](https://github.com/solidjs/solid-router) v0.15.4
- **Build Tool**: [Vite](https://vitejs.dev) v7.1.4
- **Dev Tools**: [solid-devtools](https://github.com/thetarnav/solid-devtools) v0.34.3

### Backend
- **BaaS**: [Appwrite](https://appwrite.io) v21.5.0
- **Database**: Appwrite Database
- **Storage**: Appwrite Storage
- **Authentication**: Appwrite Auth

### Deployment
- **Hosting**: [Vercel](https://vercel.com)
- **CI/CD**: Automatic deployments via Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or pnpm/yarn)
- **Appwrite Account**: [Sign up here](https://cloud.appwrite.io)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MrNicholson85/solid-store.git
cd solid-store
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set Up Appwrite Backend

#### Create Appwrite Project
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project
3. Note your **Project ID**

#### Configure Database
1. Create a new database (note the **Database ID**)
2. Create a collection named `products` (note the **Collection ID**)
3. Add the following attributes to the `products` collection:

| Attribute Name | Type | Size | Required |
|---------------|------|------|----------|
| productId | Integer | - | Yes |
| productName | String | 255 | Yes |
| description | String | 5000 | No |
| price | Float | - | Yes |
| stockQuantity | Integer | - | Yes |
| category | String | 100 | Yes |
| createdDate | String | 100 | No |
| featuredImage | String | 255 | No |
| additionalImages | String | 1000 | No |
| features | String | 5000 | No |
| inTheBox | String | 1000 | No |

#### Set Permissions
- **Read Access**: Any
- **Create Access**: Users
- **Update Access**: Users
- **Delete Access**: Users

#### Create Storage Bucket
1. Go to **Storage** in Appwrite Console
2. Create a bucket named `product-images`
3. Set permissions:
   - **Read Access**: Any
   - **Create/Update/Delete**: Users

#### Add Platform
1. Go to **Settings** → **Platforms**
2. Add Web App:
   - **Name**: Development
   - **Hostname**: `localhost`
3. Add another for production:
   - **Name**: Production
   - **Hostname**: `your-domain.vercel.app`

### 4. Configure Environment

Update `src/lib/appwrite.js` with your credentials:

```javascript
client
    .setEndpoint('https://sfo.cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('YOUR_PROJECT_ID'); // Your project ID

export const DATABASE_ID = 'YOUR_DATABASE_ID';
export const PRODUCTS_COLLECTION_ID = 'products';
export const BUCKET_ID = 'product-images';
```

### 5. Run Development Server

```bash
npm run dev
# or
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 6. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📁 Project Structure

```
solid-store/
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductDetail.jsx
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── admin/       # Admin pages
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── CreateProduct.jsx
│   │   │   ├── ManageProducts.jsx
│   │   │   └── EditProduct.jsx
│   │   ├── products/    # Product pages
│   │   │   └── DynamicProduct.jsx
│   │   ├── HeadphonesFromDB.jsx
│   │   ├── SpeakersFromDB.jsx
│   │   ├── EarphonesFromDB.jsx
│   │   └── Home.jsx
│   ├── lib/             # Utilities and configuration
│   │   ├── appwrite.js  # Appwrite configuration
│   │   ├── auth.js      # Authentication logic
│   │   └── products.js  # Product fetching utilities
│   ├── App.jsx          # Root component
│   ├── index.jsx        # App entry point
│   └── index.css        # Global styles (Tailwind)
├── public/              # Public assets
├── vercel.json          # Vercel deployment config
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🎨 Customization

### Theme Colors

Update theme colors in `src/index.css`:

```css
@theme {
  --color-theme-orange: #d87d4a;
  --color-theme-light-orange: #fbaf85;
  --color-theme-white: #fafafa;
  --color-theme-light-gray: #f1f1f1;
  --color-theme-gray: #979797;
  --color-theme-black: #101010;
}
```

### Fonts

The project uses the Manrope font family from Google Fonts, configured in `src/index.css`.

## 🚢 Deployment

### Deploy to Vercel

#### Via CLI:
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Via Dashboard:
1. Import your Git repository on [Vercel](https://vercel.com)
2. Vercel auto-detects Vite settings
3. Click Deploy

### Environment Variables (Optional)

For better security, use environment variables:

**In Vercel Dashboard:**
1. Go to Settings → Environment Variables
2. Add:
   - `VITE_APPWRITE_ENDPOINT`
   - `VITE_APPWRITE_PROJECT_ID`
   - `VITE_DATABASE_ID`
   - `VITE_PRODUCTS_COLLECTION_ID`
   - `VITE_BUCKET_ID`

**Update `src/lib/appwrite.js`:**
```javascript
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
```

## 📝 Usage

### Admin Access
1. Navigate to `/admin/signup` to create an account
2. Login at `/admin/login`
3. Access your profile at `/admin/profile`

### Creating Products
1. From profile, click "Create New Product"
2. Fill in product details
3. Upload featured and additional images
4. Add features and "In The Box" items
5. Submit to create product

### Managing Products
1. Click "Manage Products" from profile
2. View all products in table format
3. Edit or delete products as needed

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 MrNicholson85

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- [SolidJS](https://solidjs.com) - Reactive JavaScript framework
- [Appwrite](https://appwrite.io) - Open-source backend server
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Vercel](https://vercel.com) - Deployment platform

## 📧 Contact

**Developer**: MrNicholson85  
**Repository**: [github.com/MrNicholson85/solid-store](https://github.com/MrNicholson85/solid-store)

---

**Built with ❤️ using SolidJS and Appwrite**
