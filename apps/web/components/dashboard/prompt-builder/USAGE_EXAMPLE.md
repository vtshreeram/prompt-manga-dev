# Context Manager (Pro) - Usage Examples

## 🎯 Quick Start

The Context Manager feature is already integrated into the Prompt Builder. Here's how to use it:

## 📖 Basic Usage

### 1. Opening the Context Manager

Click the **"Context (Pro)"** button in the prompt builder toolbar:

```typescript
// The button is automatically rendered in prompt-builder.tsx
<Button
  variant="outline"
  onClick={() => setIsContextModalOpen(true)}
>
  <Crown className="mr-2 h-3 w-3" />
  Context (Pro)
</Button>
```

### 2. Creating Your First Context

**Example: Marketing Voice Context**

1. Click "Context (Pro)" button
2. Click "+ Create New Context"
3. Fill in the form:
   - **Context Name**: `Marketing Voice`
   - **Context Instructions**: 
     ```
     Use a professional, witty tone. Target Gen Z audience. 
     Avoid jargon. Focus on benefits over features. 
     Keep sentences short and punchy. Use emojis sparingly.
     ```
4. Click "Save Context"
5. The context is now active (button turns orange)

**Example: Developer Documentation Context**

```
Context Name: Technical Documentation
Context Instructions: Write clear, concise technical documentation. 
Use code examples where appropriate. Follow Google Developer Documentation style guide. 
Target audience: intermediate to advanced developers. Include error handling examples.
```

**Example: Startup Pitch Context**

```
Context Name: Startup Pitch
Context Instructions: Write compelling startup pitch content. 
Focus on problem-solution fit. Highlight unique value proposition. 
Use storytelling techniques. Be concise and impactful. 
Target: seed-stage investors.
```

### 3. Using a Context

Once a context is active:

1. Type your prompt in the textarea:
   ```
   Write a product announcement for our new AI chatbot
   ```

2. Click "Generate Prompt"

3. Behind the scenes, the system generates:
   ```
   Use a professional, witty tone. Target Gen Z audience. 
   Avoid jargon. Focus on benefits over features. 
   Keep sentences short and punchy. Use emojis sparingly.

   Write a product announcement for our new AI chatbot
   ```

4. The context is **silently prepended** - you don't see it in the UI!

### 4. Switching Contexts

1. Click the active context button (shows current context name in orange)
2. Search for another context or select from the list
3. Click on a different context
4. Modal closes and new context becomes active

### 5. Working Without Context

To work without any context:
- Simply don't select a context, or
- Create a "None" context by closing the modal without selecting anything
- The button will show "Context (Pro)" in neutral colors

## 🎨 Visual States

### No Context Active
```
Button: "Context (Pro)"
Color: Gray/Muted
Icon: Outline crown
```

### Context Active
```
Button: "Marketing Voice" (or your context name)
Color: Orange
Icon: Filled crown
Background: Orange tint
```

## 💡 Real-World Examples

### Example 1: Blog Post Writing

**Context Setup:**
```
Name: Blog Writing - Tech
Instructions: Write engaging blog posts for a tech-savvy audience. 
Use conversational tone. Include relevant examples. 
Break up text with subheadings. Target length: 800-1200 words. 
SEO-friendly but natural. Include a compelling hook in the first paragraph.
```

**User Prompt:**
```
Explain how AI transformers work
```

**What Gets Sent:**
```
Write engaging blog posts for a tech-savvy audience. 
Use conversational tone. Include relevant examples. 
Break up text with subheadings. Target length: 800-1200 words. 
SEO-friendly but natural. Include a compelling hook in the first paragraph.

Explain how AI transformers work
```

### Example 2: Code Review Comments

**Context Setup:**
```
Name: Code Review Style
Instructions: Write constructive code review comments. 
Be specific and actionable. Reference line numbers. 
Suggest improvements rather than just pointing out issues. 
Maintain a positive, collaborative tone. Include code examples when helpful.
```

**User Prompt:**
```
Review this React component for performance issues
```

### Example 3: Customer Support

**Context Setup:**
```
Name: Customer Support - Friendly
Instructions: Respond to customer inquiries with empathy and professionalism. 
Use simple language. Offer solutions, not excuses. 
End with a follow-up question. Sign off warmly. 
Brand voice: helpful, approachable, knowledgeable.
```

**User Prompt:**
```
Customer asking why their order is delayed
```

## 🔄 Workflow Patterns

### Pattern 1: Project-Based Contexts

Create contexts for different projects:
- `Project Alpha - Brand Voice`
- `Project Beta - Technical Specs`
- `Client XYZ - Communication Style`

Switch contexts based on which project you're working on.

### Pattern 2: Task-Based Contexts

Create contexts for different types of tasks:
- `Writing - Blog Posts`
- `Writing - Social Media`
- `Writing - Email Copy`
- `Coding - Python Best Practices`
- `Coding - React Patterns`

### Pattern 3: Audience-Based Contexts

Create contexts for different audiences:
- `B2B Enterprise`
- `B2C Consumers`
- `Internal Team`
- `Technical Stakeholders`
- `Non-Technical Stakeholders`

## 🎓 Best Practices

### DO ✅

1. **Be Specific**: Include concrete guidelines in your context
   ```
   Good: "Use active voice. Max 20 words per sentence. Target 8th grade reading level."
   Bad: "Write well."
   ```

2. **Include Examples**: Show the tone you want
   ```
   "Example tone: 'Our AI helps you save time' not 'Our AI solution leverages advanced algorithms'"
   ```

3. **Set Constraints**: Define boundaries
   ```
   "Max 280 characters. No hashtags. Professional tone."
   ```

4. **Define Audience**: Be clear about who you're writing for
   ```
   "Target: CTOs at Series B+ startups"
   ```

### DON'T ❌

1. **Don't Be Vague**: Avoid generic instructions
   ```
   Bad: "Be creative"
   Good: "Use metaphors and analogies. Include surprising statistics."
   ```

2. **Don't Overload**: Keep contexts focused
   ```
   Bad: One context with 50 different rules
   Good: Multiple focused contexts (one for blog, one for social, etc.)
   ```

3. **Don't Hardcode Content**: Contexts are guidelines, not templates
   ```
   Bad: "Always start with 'Hey there!'"
   Good: "Use casual, friendly greetings"
   ```

## 📊 Advanced Usage

### Layered Context Strategy

While the system only supports one active context at a time, you can create "layered" contexts:

**Base Context: Company Voice**
```
Name: Acme Corp Voice
Instructions: [Company-wide guidelines]
Professional yet approachable. Focus on customer success. 
Use "we" language. Avoid industry jargon.
```

**Specialized Context: Acme Corp Voice + Blog**
```
Name: Acme Corp - Blog Posts
Instructions: [Includes company voice + blog-specific rules]
Professional yet approachable. Focus on customer success. 
Use "we" language. Avoid industry jargon.

Blog-specific: 800-1200 words. Include examples. 
Use subheadings. Add a CTA at the end.
```

### Context Naming Convention

Use a consistent naming scheme:
```
[Category] - [Specific Use Case]

Examples:
Writing - Blog Posts
Writing - Social Media
Code - React Components
Support - Email Responses
Sales - Cold Outreach
```

## 🔍 Troubleshooting

### Context Not Applying?

1. Check that the button shows the context name in orange
2. Verify in browser console: `localStorage.getItem('prompt-manager-active-context')`
3. Try refreshing the page

### Context Lost After Refresh?

- Contexts are stored in localStorage
- Check browser settings allow localStorage
- Verify you're on the same domain/port

### Can't Find a Context?

- Use the search bar in the context list
- Search works on both title and content
- Search is case-insensitive

## 📱 Keyboard Shortcuts (Future)

Currently not implemented, but consider these UX improvements:
- `Cmd/Ctrl + K` - Open context manager
- `Cmd/Ctrl + Shift + C` - Clear active context
- `Escape` - Close modal

## 🎉 Success Stories

### Before Context Manager
```
User types: "Write a blog post about AI"
Result: Generic, inconsistent output
```

### After Context Manager
```
Context: "Tech Blog - Engaging Style"
User types: "Write a blog post about AI"
Result: Consistent, on-brand content that matches your style guide every time
```

## 🚀 Next Steps

1. Create 3-5 contexts for your most common use cases
2. Test them with real prompts
3. Refine based on results
4. Build a library of reusable contexts
5. Share with your team (feature coming soon!)

---

**Happy Context Managing! 🎯**