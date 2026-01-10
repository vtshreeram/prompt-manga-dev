# Library Feature - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Create Your First Library (30 seconds)

1. Look at the **left sidebar**
2. Click the **"Create Library"** button
3. Enter a name: `My First Library`
4. Click **"Create Library"**

✅ **Done!** Your library appears in the sidebar instantly.

---

### Step 2: Generate a Prompt (30 seconds)

1. In the main area, type a prompt:
   ```
   Write a blog post about AI
   ```
2. Click **"Generate Prompt"** (or top "Generate" button)

✅ **Done!** Your generated prompt appears above the input.

---

### Step 3: Save the Prompt (30 seconds)

1. Look at the generated prompt card
2. Click the **💾 Save icon** (top-right of the card)
3. Modal opens with:
   - ✅ Title auto-filled
   - ☑ Select your library
4. Click **"Save Prompt"**

✅ **Done!** Prompt is now saved in your library!

---

## 🎯 Where Everything Is

### Sidebar (Left)
```
┌────────────────────────────┐
│ [+ New] [📁 Create Library]│  ← Create libraries here
│                            │
│ ▼ My Prompt Libraries      │
│   ▶ My First Library    1  │  ← Your libraries here
│                            │
└────────────────────────────┘
```

### Main Area (Center)
```
┌─────────────────────────────────┐
│ Generated Prompt           [🎯] │  ← Generated prompt appears here
│ ┌─────────────────────────────┐ │
│ │            [📋] [🔄] [💾]   │ │  ← Action icons
│ │ Your prompt content...      │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Type your prompt here...]      │  ← Input area
│                                 │
│      [Generate Prompt]          │  ← Generate button
└─────────────────────────────────┘
```

---

## 🎮 Action Icons Explained

### 📋 Copy
- Copies the generated prompt to clipboard
- Shows ✓ checkmark when copied
- Useful for pasting into ChatGPT, Claude, etc.

### 🔄 Regenerate
- Re-runs the generation with same inputs
- Useful if you want to try again

### 💾 Save
- Opens "Save Prompt" modal
- Lets you save to one or multiple libraries
- Adds tags if needed

---

## 💡 Pro Tips

### Tip 1: Create Multiple Libraries
```
✅ Work Projects
✅ Personal Prompts
✅ Marketing Copy
✅ Code Templates
```
Organize by project, type, or purpose!

### Tip 2: Save to Multiple Libraries
When saving a prompt, you can select **multiple libraries** at once:
```
☑ Work Projects
☑ Code Templates
```
Same prompt appears in both!

### Tip 3: Use Search
- Type in the sidebar search box
- Filters all libraries instantly
- Find prompts quickly

### Tip 4: Expand/Collapse
- Click library name to expand
- See all saved prompts inside
- Click again to collapse

---

## 📝 Complete Workflow Example

### Scenario: Save a Marketing Prompt

**Step 1: Create a Library**
```
Library Name: "Marketing Copy"
```

**Step 2: Generate a Prompt**
```
Input: "Write a product launch email for a SaaS tool"
Click: Generate Prompt
```

**Step 3: Review Generated Prompt**
```
The generated prompt appears above with action icons
Review the content
```

**Step 4: Save It**
```
Click: 💾 Save icon
Title: "SaaS Product Launch Email" (auto-filled)
Select: ☑ Marketing Copy
Tags: launch, saas, email (optional)
Click: Save Prompt
```

**Step 5: View in Sidebar**
```
▼ My Prompt Libraries
  ▼ Marketing Copy                1
    📄 SaaS Product Launch Email    ← Your saved prompt!
```

✅ **Success!** Prompt is saved and organized.

---

## 🔄 Your Data is Safe

- ✅ Everything saves to **localStorage** automatically
- ✅ **Survives** browser refresh and restart
- ✅ **No internet** required (works offline)
- ✅ **Private** - stays on your device

---

## ❓ Common Questions

### Q: Can I edit a library name?
**A:** Not yet - coming in future update. For now, create a new one.

### Q: Can I delete a library?
**A:** Not yet - coming soon. For now, clear localStorage if needed.

### Q: How many prompts can I save?
**A:** Unlimited! (Limited by your browser's localStorage, typically 5-10MB)

### Q: Can I export my libraries?
**A:** Not yet - import/export feature coming soon.

### Q: Can I share libraries with my team?
**A:** Not yet - requires backend (future feature).

---

## 🐛 Troubleshooting

### Problem: "Save Prompt" button is disabled
**Solution:** Create a library first!
```
1. Click "Create Library" in sidebar
2. Name it and create
3. Now you can save prompts
```

### Problem: Library not appearing
**Solution:** Check console for errors (F12)
```
If errors appear, try:
1. Refresh page
2. Clear localStorage (see below)
3. Try again
```

### Problem: Data disappeared
**Solution:** Check localStorage is enabled
```
1. Open browser console (F12)
2. Type: localStorage.getItem('prompt-manager-libraries')
3. If null, data is gone - browser might have cleared it
4. Re-create your libraries
```

### Clear and Start Fresh
```javascript
// Open browser console (F12) and run:
localStorage.clear()
location.reload()
```

---

## ⌨️ Keyboard Shortcuts

### Create Library Modal
- **Enter** - Submit form
- **Escape** - Close modal

### Save Prompt Modal
- **Enter** - Save prompt
- **Escape** - Close modal

### General
- **Tab** - Navigate between fields
- **Space** - Toggle checkboxes

---

## 🎨 Visual Guide

### Empty State (No Libraries)
```
┌────────────────────────────────┐
│ ▼ My Prompt Libraries       📚 │
│   No libraries yet.            │
│   Create one!                  │
└────────────────────────────────┘
```

### With Libraries
```
┌────────────────────────────────┐
│ ▼ My Prompt Libraries       📚 │
│   ▶ Marketing Copy         3  │
│   ▶ Code Templates         7  │
│   ▼ Work Projects          2  │
│     📄 Project proposal        │
│     📄 Meeting notes           │
└────────────────────────────────┘
```

### Generated Prompt Card
```
┌───────────────────────────────────┐
│               [📋] [🔄] [💾]      │
│                                   │
│  You are an expert at writing    │
│  compelling marketing copy...     │
│                                   │
│  [Full prompt content here]       │
│                                   │
└───────────────────────────────────┘
```

---

## 🎯 Next Steps

Now that you know the basics:

1. **Create 3-5 libraries** for your common use cases
2. **Generate and save** your first 10 prompts
3. **Organize** them into the right libraries
4. **Reuse** them whenever you need

---

## 📞 Need Help?

- **Check:** LIBRARY_FEATURE_IMPLEMENTATION.md (detailed docs)
- **Console:** Press F12 to see debug info
- **Issues:** Check for console errors (red text)

---

**🎉 Happy Prompting!**

**Quick Recap:**
1. Create Library (sidebar button)
2. Generate Prompt (type + click)
3. Save Prompt (💾 icon)
4. Find in Sidebar (expand library)

**That's it!** You're ready to organize your prompts like a pro.

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready