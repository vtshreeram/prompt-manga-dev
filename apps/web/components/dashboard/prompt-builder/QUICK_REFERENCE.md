# Context Manager (Pro) - Quick Reference Card

## 🚀 Quick Start (30 seconds)

1. Click **[👑 Context (Pro)]** button
2. Click **[+ Create New Context]**
3. Enter name and instructions
4. Click **[Save Context]**
5. Done! Context is now active (button turns orange)

---

## 🎯 What It Does

**Silently adds context to every prompt you generate.**

### Example:
- **Your Context:** "Use professional tone. Target Gen Z."
- **Your Prompt:** "Write a product email"
- **What AI Gets:** "Use professional tone. Target Gen Z.\n\nWrite a product email"

---

## 🎨 Button States

```
Default:  [👑 Context (Pro)]        ← Gray
Active:   [👑 Marketing Voice]      ← Orange
```

**Orange = Context Active!**

---

## 📋 Modal Views

### List View (Default)
- Search bar at top
- Scrollable context list
- Click any row to select
- **[+ Create New Context]** at bottom

### Create View
- **← Back** button (return to list)
- Context Name field
- Context Instructions textarea
- **[Cancel]** and **[Save Context]** buttons

---

## ⌨️ Common Actions

### Create New Context
1. Open modal
2. Click **[+ Create New Context]**
3. Fill form
4. Click **[Save Context]**

### Switch Context
1. Click active context button (orange)
2. Select different context from list
3. Modal closes, button updates

### Search Contexts
- Type in search bar
- Filters title AND content
- Real-time results

### Generate with Context
- Type prompt as usual
- Click **[Generate Prompt]**
- Context prepends automatically (invisible)

---

## 💾 Persistence

- **Contexts saved:** localStorage
- **Survives:** Page refresh, browser restart
- **Keys:** 
  - `prompt-manager-contexts`
  - `prompt-manager-active-context`

---

## 💡 Best Practices

### ✅ DO
- Be specific: "Max 20 words per sentence"
- Include examples: "Say 'we help' not 'we leverage'"
- Set constraints: "280 characters max"
- Define audience: "Target: CTOs at startups"

### ❌ DON'T
- Be vague: "Be creative"
- Overload: 50 rules in one context
- Hardcode: "Always start with 'Hey there!'"

---

## 🎨 Visual Indicators

### Context Active
- ✅ Button shows context name
- ✅ Button is **orange**
- ✅ Crown icon is **filled**
- ✅ Orange background tint

### Context Selected in List
- ✅ Orange border around row
- ✅ Filled radio button (◉)
- ✅ Orange icon

### Error State
- ✅ Red error message
- ✅ Shows below field
- ✅ Field has red outline

---

## 📝 Sample Contexts

### Marketing Voice
```
Name: Marketing Voice
Instructions: Professional, witty tone. Target Gen Z. 
Avoid jargon. Focus on benefits. Short, punchy sentences.
```

### Tech Docs
```
Name: Technical Documentation
Instructions: Clear, concise. Use code examples. 
Follow Google style guide. Target: intermediate developers.
```

### Customer Support
```
Name: Support - Friendly
Instructions: Empathetic, professional. Simple language. 
Offer solutions. End with follow-up question. Warm sign-off.
```

---

## 🔍 Troubleshooting

### Context Not Applying?
- Check button is orange
- Verify context name shows on button
- Try refreshing page

### Context Lost?
- Check localStorage is enabled
- Verify same domain/port
- Check browser console for errors

### Can't Find Context?
- Use search bar (searches title + content)
- Search is case-insensitive
- Try partial words

---

## 📊 File Locations

```
prompt-builder/
├── context-manager-modal.tsx    ← Modal component
├── prompt-builder.tsx            ← Main integration
├── CONTEXT_MANAGER_README.md     ← Technical docs
├── USAGE_EXAMPLE.md              ← Usage guide
├── VISUAL_GUIDE.md               ← UI reference
└── QUICK_REFERENCE.md            ← This file
```

---

## 🎓 Example Workflow

```
1. Morning: Create "Daily Standup" context
   → "Keep under 50 words. Format: Yesterday, Today, Blockers"

2. Use for all standup notes:
   - "Worked on authentication"
   - "Fixed bug in checkout"
   - "Reviewed PR #123"

3. All get formatted consistently! 🎉
```

---

## 🔑 Keyboard Shortcuts

**Current:** None (click-based)

**Future:** 
- `Cmd/Ctrl + K` → Open modal
- `Esc` → Close modal

---

## 📞 Need More Help?

- **Full Docs:** `CONTEXT_MANAGER_README.md`
- **Examples:** `USAGE_EXAMPLE.md`
- **Visual Guide:** `VISUAL_GUIDE.md`

---

## ✨ Pro Tips

1. **Create 3-5 base contexts** for common tasks
2. **Use naming convention:** `[Category] - [Use Case]`
3. **Test and refine** based on results
4. **Search is your friend** for large libraries
5. **Context is invisible** to user (feature, not bug!)

---

**🎉 You're Ready! Start Creating Contexts!**

**Quick Recap:**
- Orange button = Active context
- Context adds to prompts silently
- Search works on title + content
- Everything persists automatically

**One-Liner:** *Reusable context memories that make your prompts consistent every time.*

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready