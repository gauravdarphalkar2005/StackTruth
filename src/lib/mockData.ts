import type { User, Question, Answer, Tag, Notification, AdminMetrics } from '@/types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'alex_dev',
    email: 'alex@example.com',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=alex&backgroundColor=dcfce7',
    bio: 'Full-stack engineer passionate about TypeScript and distributed systems. Open source contributor.',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/alex_dev',
    portfolioUrl: 'https://alexdev.io',
    reputation: 4820,
    role: 'expert',
    joinedAt: '2023-01-15',
    questionsCount: 34,
    answersCount: 187,
    acceptedAnswers: 89,
  },
  {
    id: 'u2',
    username: 'sarah_codes',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=sarah&backgroundColor=dbeafe',
    bio: 'Backend engineer specializing in Rust and systems programming. Building high-performance APIs.',
    skills: ['Rust', 'Go', 'Python', 'Redis', 'gRPC'],
    githubUrl: 'https://github.com/sarah_codes',
    portfolioUrl: '',
    reputation: 7350,
    role: 'expert',
    joinedAt: '2022-08-20',
    questionsCount: 12,
    answersCount: 423,
    acceptedAnswers: 201,
  },
  {
    id: 'u3',
    username: 'dev_marcus',
    email: 'marcus@example.com',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=marcus&backgroundColor=fef9c3',
    bio: 'Frontend architect with 8 years of experience. React, Vue, and performance optimization enthusiast.',
    skills: ['React', 'Vue', 'Webpack', 'CSS', 'Performance'],
    githubUrl: 'https://github.com/dev_marcus',
    portfolioUrl: 'https://marcus.dev',
    reputation: 3210,
    role: 'user',
    joinedAt: '2023-03-10',
    questionsCount: 56,
    answersCount: 142,
    acceptedAnswers: 67,
  },
  {
    id: 'u4',
    username: 'kiran_ml',
    email: 'kiran@example.com',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=kiran&backgroundColor=fce7f3',
    bio: 'ML engineer working on LLMs and neural architectures. Python and PyTorch all day.',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'CUDA', 'MLOps'],
    githubUrl: 'https://github.com/kiran_ml',
    portfolioUrl: '',
    reputation: 5640,
    role: 'expert',
    joinedAt: '2022-11-05',
    questionsCount: 28,
    answersCount: 298,
    acceptedAnswers: 134,
  },
  {
    id: 'u5',
    username: 'admin_root',
    email: 'admin@stacktruth.dev',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=admin&backgroundColor=f3e8ff',
    bio: 'StackTruth platform administrator.',
    skills: ['DevOps', 'Security', 'Platform Engineering'],
    githubUrl: '',
    portfolioUrl: '',
    reputation: 9999,
    role: 'admin',
    joinedAt: '2022-01-01',
    questionsCount: 0,
    answersCount: 0,
    acceptedAnswers: 0,
  },
];

export const MOCK_TAGS: Tag[] = [
  { id: 't1', name: 'typescript', description: 'TypeScript typed JavaScript', count: 1240, color: '#3178C6' },
  { id: 't2', name: 'react', description: 'React UI library', count: 2140, color: '#61DAFB' },
  { id: 't3', name: 'nodejs', description: 'Node.js server-side JavaScript', count: 890, color: '#339933' },
  { id: 't4', name: 'python', description: 'Python programming language', count: 1870, color: '#3776AB' },
  { id: 't5', name: 'rust', description: 'Rust systems language', count: 430, color: '#CE422B' },
  { id: 't6', name: 'docker', description: 'Docker containerization', count: 670, color: '#2496ED' },
  { id: 't7', name: 'postgresql', description: 'PostgreSQL database', count: 560, color: '#4169E1' },
  { id: 't8', name: 'kubernetes', description: 'K8s orchestration', count: 340, color: '#326CE5' },
  { id: 't9', name: 'graphql', description: 'GraphQL query language', count: 480, color: '#E10098' },
  { id: 't10', name: 'nextjs', description: 'Next.js React framework', count: 920, color: '#FFFFFF' },
  { id: 't11', name: 'go', description: 'Go programming language', count: 380, color: '#00ADD8' },
  { id: 't12', name: 'aws', description: 'Amazon Web Services', count: 720, color: '#FF9900' },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    title: 'How to properly handle async/await with TypeScript generics in complex scenarios?',
    body: `I'm building a generic data fetcher utility and running into type inference issues. When I try to combine async functions with generic type parameters, TypeScript sometimes can't infer the return type correctly.\n\nHere's my current approach — I want \`fetchData<T>\` to properly infer \`T\` from the response, but I'm getting \`unknown\` instead of the expected type.`,
    code: `async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  const data = await response.json();
  return data as T; // Is this the right approach?
}

// Usage
interface User {
  id: number;
  name: string;
}

// This works but feels wrong
const user = await fetchData<User>('/api/users/1');`,
    language: 'typescript',
    authorId: 'u3',
    author: MOCK_USERS[2],
    tags: ['typescript', 'async', 'generics'],
    votes: 47,
    answersCount: 5,
    views: 1240,
    isAnswered: true,
    acceptedAnswerId: 'a1',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:00:00Z',
  },
  {
    id: 'q2',
    title: 'React useEffect infinite loop with object dependencies — best patterns to avoid it?',
    body: `I keep running into infinite re-render loops when using objects or arrays in useEffect dependencies. I know the root cause is reference equality, but I want to understand the best production patterns to solve this elegantly.\n\nWhat are the recommended approaches in 2024? I've seen suggestions about useRef, useMemo, JSON.stringify, and custom hooks — which one should I use?`,
    code: `function UserProfile({ userId }: { userId: string }) {
  const [config, setConfig] = useState({ theme: 'dark', lang: 'en' });
  
  useEffect(() => {
    // This causes infinite loop!
    fetchUserData(userId, config);
  }, [userId, config]); // config changes every render

  return <div>...</div>;
}`,
    language: 'typescript',
    authorId: 'u3',
    author: MOCK_USERS[2],
    tags: ['react', 'hooks', 'typescript'],
    votes: 89,
    answersCount: 8,
    views: 3420,
    isAnswered: true,
    createdAt: '2024-01-14T08:15:00Z',
    updatedAt: '2024-01-14T16:30:00Z',
  },
  {
    id: 'q3',
    title: 'Rust ownership confusion: why does moving into closure break lifetime constraints?',
    body: `I'm implementing a concurrent task queue in Rust and hitting lifetime issues when moving values into async closures. The error says "cannot move out of X because it is borrowed" but I thought the move keyword would transfer ownership.\n\nI've read the Rust book's chapter on closures and ownership but this specific interaction with async is confusing me.`,
    code: `use tokio::sync::mpsc;

async fn process_tasks(mut receiver: mpsc::Receiver<String>) {
    let processor = TaskProcessor::new();
    
    while let Some(task) = receiver.recv().await {
        let proc = &processor; // borrow
        tokio::spawn(async move {
            proc.process(task).await; // error: cannot move out
        });
    }
}`,
    language: 'rust',
    authorId: 'u1',
    author: MOCK_USERS[0],
    tags: ['rust', 'async', 'ownership'],
    votes: 34,
    answersCount: 3,
    views: 890,
    isAnswered: false,
    createdAt: '2024-01-13T11:45:00Z',
    updatedAt: '2024-01-13T11:45:00Z',
  },
  {
    id: 'q4',
    title: 'PostgreSQL query optimization: slow JOIN on large tables with proper indexes',
    body: `I have two tables: orders (~50M rows) and customers (~2M rows). Even with indexes on the JOIN columns, a specific query takes 12+ seconds. EXPLAIN ANALYZE shows a sequential scan happening despite the index existing.\n\nWhat are the common reasons PostgreSQL ignores indexes on JOIN queries and how do I fix this?`,
    code: `-- This query takes 12+ seconds
SELECT 
  c.id, c.name, c.email,
  COUNT(o.id) as order_count,
  SUM(o.total) as lifetime_value
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE c.created_at > '2023-01-01'
  AND o.status = 'completed'
GROUP BY c.id, c.name, c.email
HAVING COUNT(o.id) > 5
ORDER BY lifetime_value DESC
LIMIT 100;

-- Index exists:
-- CREATE INDEX idx_orders_customer ON orders(customer_id);
-- CREATE INDEX idx_customers_created ON customers(created_at);`,
    language: 'sql',
    authorId: 'u1',
    author: MOCK_USERS[0],
    tags: ['postgresql', 'performance', 'sql'],
    votes: 56,
    answersCount: 6,
    views: 2100,
    isAnswered: true,
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T20:15:00Z',
  },
  {
    id: 'q5',
    title: 'Docker multi-stage build not caching layers correctly in CI/CD pipeline',
    body: `My Docker multi-stage build works perfectly locally but in GitHub Actions CI, the layer cache is never used — every build installs all npm dependencies from scratch even when package.json hasn't changed.\n\nI'm using GitHub Actions cache with docker/build-push-action. Here's my setup.`,
    code: `# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder  
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
    language: 'dockerfile',
    authorId: 'u4',
    author: MOCK_USERS[3],
    tags: ['docker', 'cicd', 'nodejs'],
    votes: 23,
    answersCount: 4,
    views: 760,
    isAnswered: false,
    createdAt: '2024-01-11T09:00:00Z',
    updatedAt: '2024-01-11T09:00:00Z',
  },
  {
    id: 'q6',
    title: 'PyTorch custom loss function not backpropagating gradients correctly',
    body: `I wrote a custom loss function combining cross-entropy with a distance penalty, but when I check .grad on my parameters after loss.backward(), some layers show None gradients. The network trains but doesn't converge.\n\nI suspect the issue is in how I'm combining tensors but I can't identify where the gradient flow breaks.`,
    code: `class CustomLoss(nn.Module):
    def __init__(self, alpha=0.5):
        super().__init__()
        self.alpha = alpha
        self.ce = nn.CrossEntropyLoss()
    
    def forward(self, predictions, targets, embeddings):
        ce_loss = self.ce(predictions, targets)
        
        # Distance penalty - is this breaking gradients?
        distances = torch.cdist(embeddings, embeddings)
        margin = 1.0
        dist_loss = torch.clamp(margin - distances, min=0).mean()
        
        return self.alpha * ce_loss + (1 - self.alpha) * dist_loss`,
    language: 'python',
    authorId: 'u4',
    author: MOCK_USERS[3],
    tags: ['python', 'pytorch', 'machine-learning'],
    votes: 41,
    answersCount: 2,
    views: 1340,
    isAnswered: false,
    createdAt: '2024-01-10T16:30:00Z',
    updatedAt: '2024-01-10T16:30:00Z',
  },
];

export const MOCK_ANSWERS: Answer[] = [
  {
    id: 'a1',
    questionId: 'q1',
    body: `The \`as T\` cast is actually fine for this pattern — TypeScript's type system can't validate runtime JSON shapes at compile time, so a type assertion is the idiomatic approach.\n\nHowever, for production code I'd recommend adding runtime validation with **Zod** or **io-ts** to ensure the actual response matches your expected type. Here's a better pattern:`,
    code: `import { z } from 'zod';

// Define your schema with validation
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;

async function fetchData<T>(
  url: string,
  schema: z.ZodType<T>
): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }
  
  const raw = await response.json();
  return schema.parse(raw); // throws ZodError if invalid
}

// Usage — fully type-safe!
const user = await fetchData('/api/users/1', UserSchema);
// user is typed as User, validated at runtime`,
    language: 'typescript',
    authorId: 'u1',
    author: MOCK_USERS[0],
    votes: 67,
    isAccepted: true,
    createdAt: '2024-01-15T12:00:00Z',
  },
  {
    id: 'a2',
    questionId: 'q1',
    body: `Another approach is to use type predicates to add type narrowing without a full validation library:`,
    code: `function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    typeof (data as any).id === 'number' &&
    typeof (data as any).name === 'string'
  );
}

async function fetchUser(url: string): Promise<User> {
  const data: unknown = await fetch(url).then(r => r.json());
  if (!isUser(data)) throw new Error('Invalid user data');
  return data;
}`,
    language: 'typescript',
    authorId: 'u2',
    author: MOCK_USERS[1],
    votes: 23,
    isAccepted: false,
    createdAt: '2024-01-15T13:30:00Z',
  },
  {
    id: 'a3',
    questionId: 'q2',
    body: `The cleanest pattern is to use \`useRef\` to store stable references or break the config into primitive dependencies. Here are three battle-tested approaches:\n\n**Option 1: Stable refs** (best for functions/objects you don't need to react to changes)\n**Option 2: Primitive dependencies** (best when you only care about specific fields)\n**Option 3: useCallback with proper deps** (best when you need the callback pattern)`,
    code: `// Option 1: useRef for stable callback
function UserProfile({ userId }: { userId: string }) {
  const [config, setConfig] = useState({ theme: 'dark', lang: 'en' });
  const configRef = useRef(config);
  
  useLayoutEffect(() => {
    configRef.current = config;
  });
  
  useEffect(() => {
    fetchUserData(userId, configRef.current); // stable ref
  }, [userId]); // only re-run when userId changes
}

// Option 2: Destructure to primitives
function UserProfile({ userId }: { userId: string }) {
  const [config, setConfig] = useState({ theme: 'dark', lang: 'en' });
  const { theme, lang } = config;
  
  useEffect(() => {
    fetchUserData(userId, { theme, lang });
  }, [userId, theme, lang]); // primitives — stable equality
}`,
    language: 'typescript',
    authorId: 'u1',
    author: MOCK_USERS[0],
    votes: 112,
    isAccepted: true,
    createdAt: '2024-01-14T10:00:00Z',
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'accepted',
    title: 'Answer Accepted!',
    message: 'dev_marcus accepted your answer on "TypeScript generics with async/await"',
    isRead: false,
    link: '/questions/q1',
    createdAt: '2024-01-15T14:00:00Z',
    fromUser: MOCK_USERS[2],
  },
  {
    id: 'n2',
    type: 'vote',
    title: 'Your answer was upvoted',
    message: 'Someone upvoted your answer on "React useEffect infinite loop patterns"',
    isRead: false,
    link: '/questions/q2',
    createdAt: '2024-01-15T11:20:00Z',
  },
  {
    id: 'n3',
    type: 'answer',
    title: 'New answer on your question',
    message: 'sarah_codes answered "PostgreSQL query optimization: slow JOIN on large tables"',
    isRead: false,
    link: '/questions/q4',
    fromUser: MOCK_USERS[1],
    createdAt: '2024-01-15T09:45:00Z',
  },
  {
    id: 'n4',
    type: 'mention',
    title: 'You were mentioned',
    message: 'kiran_ml mentioned you in a comment on "PyTorch custom loss function"',
    isRead: true,
    link: '/questions/q6',
    fromUser: MOCK_USERS[3],
    createdAt: '2024-01-14T17:30:00Z',
  },
  {
    id: 'n5',
    type: 'badge',
    title: 'Badge Earned: Expert Answerer',
    message: "You've earned the Expert Answerer badge for 50 accepted answers!",
    isRead: true,
    link: '/profile/alex_dev',
    createdAt: '2024-01-13T08:00:00Z',
  },
];

export const ADMIN_METRICS: AdminMetrics = {
  totalUsers: 8420,
  totalQuestions: 24680,
  totalAnswers: 87340,
  activeToday: 1240,
  newUsersThisWeek: 380,
  questionsThisWeek: 892,
  topTags: [
    { name: 'typescript', count: 1240 },
    { name: 'python', count: 1870 },
    { name: 'react', count: 2140 },
    { name: 'nodejs', count: 890 },
    { name: 'docker', count: 670 },
    { name: 'postgresql', count: 560 },
    { name: 'graphql', count: 480 },
    { name: 'rust', count: 430 },
  ],
  activityData: [
    { day: 'Mon', questions: 124, answers: 342 },
    { day: 'Tue', questions: 98, answers: 287 },
    { day: 'Wed', questions: 156, answers: 420 },
    { day: 'Thu', questions: 142, answers: 398 },
    { day: 'Fri', questions: 178, answers: 512 },
    { day: 'Sat', questions: 89, answers: 210 },
    { day: 'Sun', questions: 72, answers: 185 },
  ],
};
