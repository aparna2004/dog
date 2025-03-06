# dog

[WeatherStack API](https://weatherstack.com/documentation).  
[public api's](https://github.com/public-apis/public-apis)

---
### **Install ShadCN Components**
```sh
npx shadcn@latest init
```
- Select **Slate** as the base color  
- Choose **"Use --force"** if prompted for React 19  
- Then, add UI components:
```sh
npx shadcn@latest add button card input skeleton
```

---

### **8️⃣ Setup the App**


#### **🛠️ Environment Variables**
Create a `.env` file in the project root and add your **WeatherStack API Key**:
```
VITE_WEATHERSTACK_API_KEY=your_api_key_here
```
**⚠️ Note:** Restart your server after adding `.env` variables.

---
