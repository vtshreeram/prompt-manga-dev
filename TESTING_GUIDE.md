# Context Manager (Pro) - Testing & Verification Guide

## 🧪 Test: Verify Button Label Updates Correctly

This guide will help you verify that the Context Manager button label changes from "Context (Pro)" to the actual context name when a context is selected.

---

## ✅ Step-by-Step Test

### **Test 1: Initial State (No Context)**

**Expected Result:**
```
Button displays: [👑 Context (Pro)]
Color: Gray/Muted
Icon: Outline crown
```

**How to Verify:**
1. Open the app at `localhost:3000`
2. Look at the prompt builder input card
3. Find the button next to "Basic" dropdown
4. Confirm it says "Context (Pro)" in gray

✅ **PASS:** Button shows "Context (Pro)"  
❌ **FAIL:** Button shows something else

---

### **Test 2: Create First Context**

**Steps:**
1. Click the **[👑 Context (Pro)]** button
2. Modal opens → Shows "No contexts yet. Create your first one!"
3. Click **[+ Create New Context]** button
4. Fill in the form:
   - **Context Name:** `Marketing Voice`
   - **Context Instructions:** `Use professional, witty tone. Target Gen Z.`
5. Click **[Save Context]** button

**Expected Result:**
```
✅ Modal closes automatically
✅ Button now displays: [👑 Marketing Voice]
✅ Button color: ORANGE
✅ Icon: Filled crown (orange)
```

**How to Verify:**
- Look at the button in the prompt builder
- It should now say "Marketing Voice" (NOT "Context (Pro)")
- Button should have orange background/border
- Crown icon should be filled/solid

✅ **PASS:** Button shows "Marketing Voice" in orange  
❌ **FAIL:** Button still shows "Context (Pro)"

---

### **Test 3: Persistence After Refresh**

**Steps:**
1. With "Marketing Voice" context active (button shows the name)
2. Refresh the page (F5 or Cmd/Ctrl + R)
3. Wait for page to load

**Expected Result:**
```
✅ Button still displays: [👑 Marketing Voice]
✅ Button still orange
✅ Context persisted from localStorage
```

✅ **PASS:** Button shows "Marketing Voice" after refresh  
❌ **FAIL:** Button reverts to "Context (Pro)"

---

### **Test 4: Create Second Context and Switch**

**Steps:**
1. Click the active context button (shows "Marketing Voice")
2. Modal opens → Shows list with "Marketing Voice" (has ◉ radio selected)
3. Click **[+ Create New Context]**
4. Fill in:
   - **Context Name:** `Tech Docs`
   - **Context Instructions:** `Write clear, concise technical documentation.`
5. Click **[Save Context]**

**Expected Result:**
```
✅ Modal closes
✅ Button now displays: [👑 Tech Docs]
✅ Button still orange
✅ Context auto-switched to new one
```

✅ **PASS:** Button shows "Tech Docs"  
❌ **FAIL:** Button shows old context or "Context (Pro)"

---

### **Test 5: Switch Between Contexts**

**Steps:**
1. Click button (currently shows "Tech Docs")
2. Modal opens → Shows 2 contexts:
   - Marketing Voice (○ empty radio)
   - Tech Docs (◉ filled radio - currently active)
3. Click on **"Marketing Voice"** row
4. Modal closes

**Expected Result:**
```
✅ Button now displays: [👑 Marketing Voice]
✅ Button still orange
✅ Switched back to first context
```

✅ **PASS:** Button shows "Marketing Voice"  
❌ **FAIL:** Button doesn't change

---

### **Test 6: Prompt Generation with Context**

**Steps:**
1. Ensure a context is active (button shows context name in orange)
2. Type in textarea: `Write a product announcement`
3. Click **[Generate Prompt]** button
4. Check browser console (F12 → Console tab)

**Expected Console Output:**
```
Generating prompt with final content: Use professional, witty tone...

Write a product announcement

Active context: Marketing Voice
Primer mode: Basic
```

**Verify:**
- Context content is prepended
- Blank line separates context from user input
- Alert shows context name

✅ **PASS:** Context prepended correctly  
❌ **FAIL:** Context not in final prompt

---

## 🔍 Debugging Failed Tests

### If Button Always Shows "Context (Pro)"

**Check 1: Is `activeContext` state being set?**
```javascript
// Add this temporarily to prompt-builder.tsx (after state declarations)
console.log("Active Context:", activeContext);
```

**Expected:** After saving a context, you should see:
```
Active Context: { id: "ctx_1234567890", title: "Marketing Voice", content: "..." }
```

**Check 2: Is localStorage saving?**
```javascript
// In browser console, type:
localStorage.getItem('prompt-manager-active-context')
localStorage.getItem('prompt-manager-contexts')
```

**Expected:**
- First command returns: `"ctx_1234567890"` (the context ID)
- Second command returns: JSON array of contexts

**Check 3: Is the button rendering logic correct?**

Look at line ~198 in `prompt-builder.tsx`:
```jsx
{activeContext ? activeContext.title : "Context (Pro)"}
```

This line should exist and be exactly as shown.

---

### If Context Not Persisting After Refresh

**Problem:** localStorage not working or being cleared

**Solution:**
1. Check browser settings → Allow localStorage
2. Make sure you're on `localhost:3000` (same domain)
3. Clear cache and try again
4. Check browser console for errors

---

### If Modal Not Closing After Save

**Problem:** Modal state not updating

**Check:** Look for this in `handleSaveContext`:
```javascript
setActiveContext(contextWithId); // This line must exist
```

---

## 📊 Quick Verification Checklist

Use this checklist to quickly verify the feature:

- [ ] No context → Button says "Context (Pro)" in gray
- [ ] Create context → Button changes to context name in orange
- [ ] Refresh page → Button still shows context name
- [ ] Create second context → Button auto-switches to new one
- [ ] Click button → Modal shows all contexts with active one highlighted
- [ ] Select different context → Button updates immediately
- [ ] Generate prompt → Context prepended in console log
- [ ] No console errors at any point

---

## 🎯 Expected Visual States

### State 1: No Context
```
┌────────────────────┐
│  👑 Context (Pro)  │  ← Gray, outline crown
└────────────────────┘
```

### State 2: Active Context
```
┌──────────────────────┐
│  👑 Marketing Voice  │  ← ORANGE, filled crown
└──────────────────────┘
```

### State 3: Modal with Active Context
```
┌─────────────────────────────┐
│  👑 Marketing Voice     ◉  │ ← Active (filled radio)
│  👑 Tech Docs           ○  │ ← Inactive (empty radio)
└─────────────────────────────┘
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Button doesn't change after creating context"

**Cause:** `handleSaveContext` not setting `activeContext`

**Fix:** Verify this code exists in `prompt-builder.tsx`:
```typescript
const handleSaveContext = (newContext: Omit<ContextItem, "id">) => {
  const contextWithId: ContextItem = {
    id: `ctx_${Date.now()}`,
    ...newContext,
  };
  setSavedContexts((prev) => [...prev, contextWithId]);
  setActiveContext(contextWithId); // ← This line is critical!
};
```

---

### Issue 2: "Button shows 'Context (Pro)' after refresh"

**Cause:** localStorage not loading on mount

**Fix:** Verify this useEffect exists:
```typescript
React.useEffect(() => {
  try {
    const savedContextsData = localStorage.getItem(STORAGE_KEY_CONTEXTS);
    const activeContextId = localStorage.getItem(STORAGE_KEY_ACTIVE_CONTEXT);
    
    if (activeContextId && savedContextsData) {
      const contexts = JSON.parse(savedContextsData) as ContextItem[];
      const active = contexts.find((c) => c.id === activeContextId);
      if (active) {
        setActiveContext(active); // ← This restores active context
      }
    }
  } catch (error) {
    console.error("Failed to load contexts:", error);
  }
}, []);
```

---

### Issue 3: "Button shows context name but in gray (not orange)"

**Cause:** Conditional className not working

**Fix:** Check button className logic:
```typescript
className={
  activeContext
    ? "h-9 px-3 text-orange-600 dark:text-orange-500 border-orange-600/30..."
    : "h-9 px-3 text-muted-foreground border-dashed..."
}
```

---

## 🎉 Success Criteria

**You know it's working when:**

1. ✅ Create a context → Button immediately shows context name in orange
2. ✅ Refresh page → Button still shows context name
3. ✅ Click button → Modal shows context as selected (◉)
4. ✅ Create another context → Button switches to new name
5. ✅ Select old context → Button changes back
6. ✅ Generate prompt → Context prepends in console

**All 6 criteria must pass!**

---

## 📞 Still Not Working?

### Debug Steps:

1. **Open browser console (F12)**
2. **Type these commands:**
   ```javascript
   // Check if contexts exist
   JSON.parse(localStorage.getItem('prompt-manager-contexts'))
   
   // Check active context ID
   localStorage.getItem('prompt-manager-active-context')
   
   // Clear everything and start fresh
   localStorage.clear()
   location.reload()
   ```

3. **Add console logs:**
   ```typescript
   // In handleSaveContext
   console.log('Saving context:', contextWithId);
   console.log('Setting active context:', contextWithId);
   
   // In handleSelectContext
   console.log('Selected context:', context);
   ```

4. **Check React DevTools:**
   - Install React DevTools extension
   - Find `PromptBuilder` component
   - Check `activeContext` state value
   - Should show object with id, title, content

---

## ✅ Final Test: End-to-End Flow

**Complete this flow in one go:**

1. Start with clean state (no contexts)
2. Button shows "Context (Pro)" ← ✓
3. Click button → Modal opens ← ✓
4. Click "+ Create New Context" ← ✓
5. Enter "Test Context" and instructions ← ✓
6. Click "Save Context" ← ✓
7. **Button now shows "Test Context"** ← ✓ (CRITICAL!)
8. Refresh page ← ✓
9. **Button still shows "Test Context"** ← ✓ (CRITICAL!)
10. Click button → Modal shows "Test Context" selected ← ✓

**If all 10 steps pass → Feature works perfectly! 🎉**

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Status:** Ready for Testing