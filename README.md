# 🌊 NeatFlow

**Automated file organization for a cleaner workspace.**

NeatFlow is a Node.js-based utility that monitors a specific directory (like your Downloads folder) and instantly moves incoming files into categorized subfolders based on their file extensions. No more messy downloads—just clean, organized folders.

---

## 🚀 Key Features

* **Real-time Monitoring:** Uses `Chokidar` to watch for new files instantly.
* **Smart Categorization:** Automatically sorts files into `Images`, `Videos`, `Documents`, `Code`, and more.
* **Download Safety:** Implements a configurable delay to ensure files are fully downloaded before being moved.
* **Professional Logging:** Keeps a local history of every file moved in `logs/activity.log`.
* **Developer Ready:** Modular ES6+ architecture, easy to extend with new file types.

---

## 🛠️ How to Run This on Your System

Follow these steps to get NeatFlow running on your local machine:

### 1. Prerequisites
Make sure you have **Node.js** (v18 or higher) installed on your system.

### 2. Clone the Repository
```bash
git clone [https://github.com/ayushnegi/neatflow.git](https://github.com/ayushnegi/neatflow.git)
cd neatflow
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configuration
NeatFlow is built to be **Environment Agnostic**. It automatically detects your system's Home directory and watches your `Downloads` folder by default.

If you want to watch a custom folder, open `src/config.js` and modify the `WATCH_DIR`:
```javascript
import os from 'os';
import path from 'path';

// To watch a different folder, just change this string:
export const WATCH_DIR = path.join(os.homedir(), 'Desktop/MyFolder');
```

### 5. Start Organizing
To run the service temporarily in your terminal:
```bash
npm start
```

### 6. Run as a Background Service (Recommended)
To keep NeatFlow running even after you close your terminal, use **PM2**:
```bash
# Install PM2 globally
npm install -g pm2

# Start NeatFlow
pm2 start src/index.js --name neatflow

# Ensure it starts on system reboot
pm2 startup
pm2 save
```

---

## 🧪 Testing

Before deploying, you can run the built-in integration test to verify that the sorting logic works correctly on your OS:
```bash
npm test
```

---

## 📂 Project Structure

```text
neatflow/
├── logs/               # Activity history (auto-generated)
├── src/
│   ├── index.js        # Entry point
│   ├── config.js       # Environment settings
│   ├── constants.js    # Extension mappings
│   ├── fileService.js  # Move logic
│   ├── logs.js         # Logging service
│   └── utils.js        # Helper functions
├── tests/              # Integration testing
└── package.json        # Project metadata
```

---

## 🛠️ Developer Setup (Git)

If you are cloning this to contribute or modify, make sure your `.gitignore` file includes the following to keep the repository clean:

```text
node_modules/
logs/*.log
tests/test-sandbox/
watch/
.DS_Store
```

---

**Developed with 💻 by [Ayush Negi]**