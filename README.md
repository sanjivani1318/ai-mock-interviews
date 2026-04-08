# 🎤 PrepWise – AI-Powered Mock Interview Platform

## 🚀 Overview

PrepWise is a **voice-based AI mock interview platform** designed to simulate real-world interview experiences.
Unlike traditional text-based platforms, PrepWise uses **voice interaction** to help users practice communication, thinking, and confidence in real-time interviews.

The system integrates **Vapi AI (voice agent)** and **Google Gemini (AI intelligence)** to create a human-like conversational interview experience.

---

## ✨ Features

* 🔐 **Authentication**

  * Secure Sign Up / Sign In using Firebase Authentication

* 🎤 **Voice-Based AI Interviews**

  * Real-time interview interaction using Vapi AI voice agent

* 🧠 **AI Question & Feedback Generation**

  * Google Gemini generates interview questions and evaluates responses

* 📄 **Interview Sessions**

  * Stores complete transcripts and feedback for each session

* 📊 **Dashboard**

  * Manage and track all interview sessions easily

* 🎯 **Real-Time Feedback**

  * Get instant AI-based feedback during interviews

* 🎨 **Modern UI/UX**

  * Built with Tailwind CSS for a clean and responsive interface

* 📱 **Responsive Design**

  * Works seamlessly across desktop and mobile devices

---

## 🏗️ Tech Stack

### Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS

### Backend & Database

* Firebase (Authentication + Firestore)

### AI Integration

* Vapi AI (Voice Interaction)
* Google Gemini (Question generation & feedback)

---

## 🔁 How It Works

1. User signs in to the platform
2. Starts an interview session
3. Vapi AI asks questions using voice
4. User responds verbally
5. Speech is converted to text
6. Gemini processes the response
7. AI generates next question or feedback
8. Vapi converts response back to voice
9. Data is stored in Firebase

---

## 📂 Project Structure

```
/app          → Application routes (Next.js)
/components   → Reusable UI components
/firebase     → Firebase configuration
/lib          → Utility functions
/types        → TypeScript types
/public       → Static assets
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/prepwise.git

# Navigate to project folder
cd prepwise

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env.local` file and add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

VAPI_API_KEY=your_vapi_key
GEMINI_API_KEY=your_gemini_key
```

---

## 🚧 Challenges Faced

* Handling **latency in voice processing**
* Managing **real-time conversation flow**
* Integrating **Vapi (voice) + Gemini (AI logic)**
* Synchronizing frontend, AI, and database

---

## 🚀 Future Improvements

* AI-based performance scoring
* Multi-language support
* Advanced analytics dashboard
* Real-time emotion & confidence detection

---

## 💡 Learning Outcomes

* Real-time system design
* AI integration in full-stack applications
* Voice-based interaction handling
* API optimization and async processing

---

## 📌 Conclusion

PrepWise bridges the gap between **theoretical interview preparation and real-world experience** by providing a **voice-based AI-driven interview simulation platform**.

---

## 👩‍💻 Author

**Sanjivani Jadhav**

* GitHub: https://github.com/sanjivani1318
  

---

