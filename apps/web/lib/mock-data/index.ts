import { Prompt, SmartFolder, ContextMemory } from '../types';

export const mockPrompts: Prompt[] = [
  {
    id: 'prompt-1',
    title: 'Blog Post Outline Generator',
    content: 'Create a detailed blog post outline about {{topic}}. The target audience is {{audience}}. Include an introduction, 5 main sections, and a conclusion.',
    variables: [
      { id: 'var-1', name: 'topic', defaultValue: 'technology trends' },
      { id: 'var-2', name: 'audience', defaultValue: 'beginners' }
    ],
    logicLevel: 'advanced',
    contextId: 'context-1',
    folderId: 'folder-1',
    tags: ['content', 'blog', 'writing'],
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
    isQuickSaved: false
  },
  {
    id: 'prompt-2',
    title: 'Instagram Caption Creator',
    content: 'Write an engaging Instagram caption for a photo of {{subject}}. Use a {{tone}} tone. Include 3 relevant hashtags.',
    variables: [
      { id: 'var-3', name: 'subject', defaultValue: 'sunset' },
      { id: 'var-4', name: 'tone', defaultValue: 'inspirational' }
    ],
    logicLevel: 'basic',
    contextId: null,
    folderId: 'folder-2',
    tags: ['social-media', 'instagram'],
    createdAt: new Date('2024-01-18T09:15:00Z'),
    updatedAt: new Date('2024-01-18T09:15:00Z'),
    isQuickSaved: true
  },
  {
    id: 'prompt-3',
    title: 'Code Refactoring Assistant',
    content: 'Refactor the following code to improve readability and performance: \n\n```{{language}}\n{{code}}\n```\n\nExplain the changes made.',
    variables: [
      { id: 'var-5', name: 'language', defaultValue: 'typescript' },
      { id: 'var-6', name: 'code', defaultValue: '// code here' }
    ],
    logicLevel: 'pro',
    contextId: null,
    folderId: null, // Uncategorized
    tags: ['coding', 'development'],
    createdAt: new Date('2024-01-22T16:45:00Z'),
    updatedAt: new Date('2024-01-22T16:45:00Z'),
    isQuickSaved: false
  },
  {
    id: 'prompt-4',
    title: 'Email Newsletter Intro',
    content: 'Draft an introduction for our weekly newsletter focusing on {{news_topic}}. Keep it under 100 words.',
    variables: [
      { id: 'var-7', name: 'news_topic', defaultValue: 'product launch' }
    ],
    logicLevel: 'basic',
    contextId: 'context-1',
    folderId: 'folder-1',
    tags: ['email', 'marketing'],
    createdAt: new Date('2024-01-25T11:20:00Z'),
    updatedAt: new Date('2024-01-25T11:20:00Z'),
    isQuickSaved: false
  },
  {
    id: 'prompt-5',
    title: 'Product Description v2',
    content: 'Write a compelling product description for {{product_name}}. Key features: {{features}}. Target demographic: {{demographic}}.',
    variables: [
      { id: 'var-8', name: 'product_name', defaultValue: 'Smart Watch' },
      { id: 'var-9', name: 'features', defaultValue: 'heart rate monitor, GPS' },
      { id: 'var-10', name: 'demographic', defaultValue: 'athletes' }
    ],
    logicLevel: 'advanced',
    contextId: 'context-2',
    folderId: 'folder-1',
    tags: ['product', 'copywriting'],
    createdAt: new Date('2024-01-28T13:00:00Z'),
    updatedAt: new Date('2024-01-29T09:00:00Z'),
    isQuickSaved: false
  }
];

export const mockFolders: SmartFolder[] = [
  {
    id: 'folder-1',
    name: 'Content Creation',
    icon: 'pen-tool',
    promptCount: 2,
    createdAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 'folder-2',
    name: 'Social Media Strategy',
    icon: 'share-2',
    promptCount: 1,
    createdAt: new Date('2024-01-05T00:00:00Z')
  },
  {
    id: 'folder-3',
    name: 'Email Marketing',
    icon: 'mail',
    promptCount: 0,
    createdAt: new Date('2024-01-10T00:00:00Z')
  },
  {
    id: 'folder-4',
    name: 'Development',
    icon: 'code',
    promptCount: 0,
    createdAt: new Date('2024-01-12T00:00:00Z')
  },
  {
    id: 'folder-5',
    name: 'Personal',
    icon: 'user',
    promptCount: 0,
    createdAt: new Date('2024-01-15T00:00:00Z')
  }
];

export const mockContexts: ContextMemory[] = [
  {
    id: 'context-1',
    name: 'Tech Startup Brand',
    description: 'Brand guidelines for our tech startup',
    content: 'We are an innovative tech startup focused on AI solutions. Our tone is professional yet approachable. We target enterprise clients but communicate in plain language.',
    type: 'brand-guideline',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-10T00:00:00Z')
  },
  {
    id: 'context-2',
    name: 'Project Alpha Requirements',
    description: 'Core requirements for the new mobile app',
    content: 'Project Alpha is a fitness tracking app. It needs to support offline mode, sync with wearables, and provide personalized workout plans.',
    type: 'project-background',
    createdAt: new Date('2024-01-05T00:00:00Z'),
    updatedAt: new Date('2024-01-12T00:00:00Z')
  },
  {
    id: 'context-3',
    name: 'Personal Writing Style',
    description: 'My personal writing preferences',
    content: 'I prefer concise sentences. Avoid jargon. Use analogies to explain complex concepts. Always end with a call to action.',
    type: 'custom',
    createdAt: new Date('2024-01-15T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z')
  }
];

// Simulated async operations with delay
export const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getMockPrompts = async (): Promise<Prompt[]> => {
  await mockDelay();
  return mockPrompts;
};

export const getMockFolders = async (): Promise<SmartFolder[]> => {
  await mockDelay();
  return mockFolders;
};

export const getMockContexts = async (): Promise<ContextMemory[]> => {
  await mockDelay();
  return mockContexts;
};
