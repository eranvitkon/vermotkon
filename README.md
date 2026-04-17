# ורמוטקון 🍸

ערב קוקטיילים של משפחת ויתקון — אפליקציית הזמנות בזמן אמת.

## קישורים
- **אורחים:** `https://YOUR-APP.onrender.com/`
- **ברמן:** `https://YOUR-APP.onrender.com/barman.html`

## הקמה ב-Render

1. העלה את הקוד ל-GitHub (repository חדש: `vermotkon`)
2. כנס ל-[render.com](https://render.com) ולחץ **New → Web Service**
3. חבר את ה-repository מ-GitHub
4. הגדרות:
   - **Name:** vermotkon
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. לחץ **Deploy** — תוך כמה דקות האפליקציה חיה!

## הדפסת QR Code
אחרי שיש URL אמיתי, צור QR ב-[qr-code-generator.com](https://www.qr-code-generator.com/) עם הכתובת של האפליקציה, הדפס והנח על השולחן.

## מבנה הקבצים
```
vermotkon/
├── server.js          # שרת Node.js + WebSocket
├── package.json
└── public/
    ├── index.html     # מסך אורחים (מובייל)
    └── barman.html    # מסך ברמן
```
