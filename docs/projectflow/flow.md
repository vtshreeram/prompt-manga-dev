# Screen-wise Flow

## Screen 1: The Central Dashboard

This is the **"Command Center"** where high-level preparation occurs.

### 1.1 Sidebar Navigation

- **Context Memory Manager**  
  A dedicated section to add and store project backgrounds and brand guidelines.

- **Smart Folders**  
  A list of user-created folders (e.g., *Social Media Strategy*) for prompt organization.

- **Library**  
  View all saved prompts, including those *Quick Saved* from the extension.

### 1.2 Prompt Builder (The "Super Prompt" Studio)

- **Input Area**  
  A text field for *half-baked* ideas or rough drafts.

- **Logic Level Selector**  
  Three toggle buttons or a dropdown:
  - Basic (Simple)
  - Advanced (Refined)
  - Pro (Complex)

- **Dynamic Variable Injector**  
  A tool to wrap text in double braces, such as `{{product_name}}`, to create placeholders.

- **Context Genie Selector**  
  A dropdown to choose which pre-saved project background should be injected into the current prompt.

- **Action Buttons**
  - **Generate / Optimize**  
    Transforms the draft into a structured *Super Prompt*.
  - **Save & Tag**  
    Opens a modal to select a Smart Folder and add custom tags.

---

## Screen 2: The Browser Extension Panel (Sidebar / Popup)

This is the **"Active Workspace"** that appears when navigating AI models like ChatGPT, Gemini, or Claude.

### 2.1 Extension Home View

- **Platform Detection Header**  
  Displays the icon of the currently active AI model.

- **Folder Navigation**  
  Displays the *Smart Folders* created in the Dashboard.

- **Search Bar**  
  Allows searching through the prompt library directly.

### 2.2 Prompt Selection & Customization

- **Prompt List**  
  Displays pre-saved prompts under each folder.

- **Variable Injection Popup**  
  When a prompt containing `{{variables}}` is selected, a small modal appears with input fields for each placeholder.

- **Action Button**
  - **Use Prompt**  
    Combines:
    - Context  
    - Enhanced Prompt  
    - Filled Variables  

    …and injects them directly into the AI model’s chat input.

---

## Screen 3: The In-Chat Overlay (On-Page Optimizer)

This UI layer sits directly on top of the AI model’s website interface.

### 3.1 Input Bar Integration

- **Genie Icon**  
  A small floating button located within or next to the ChatGPT/Gemini text input field.

- **Real-Time Feedback UI**  
  Displays indicators such as:
  - Prompt Evaluation
  - Super Prompt Score  
  as the user types.

### 3.2 Optimization Interaction

- **Enhancement Overlay**  
  Clicking the Genie Icon opens a preview window showing the *Optimized* version of the user’s typed text.

- **Replacement Trigger**  
  An **Apply** button replaces the user’s draft with the professional, structured prompt.

- **Quick Save Component**  
  A Save icon appears next to the injected text, allowing instant storage in the Dashboard Library.
