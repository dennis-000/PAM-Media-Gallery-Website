import fs from 'fs';
import path from 'path';
import { 
  INITIAL_SERVICES, 
  INITIAL_GALLERIES, 
  INITIAL_BOOKINGS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_ACTIVITY_LOGS 
} from '../src/lib/db/mock-db';
import { 
  INITIAL_PROJECTS, 
  INITIAL_CLIENTS, 
  INITIAL_INVOICES, 
  INITIAL_MESSAGES, 
  INITIAL_TEAM 
} from '../src/lib/db/persistent-db';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

function seedDatabase() {
  console.log('🌱 Initializing PAM Media Database Seed Script...');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const seedPayload = {
    services: INITIAL_SERVICES,
    bookings: INITIAL_BOOKINGS,
    galleries: INITIAL_GALLERIES,
    testimonials: INITIAL_TESTIMONIALS,
    blogPosts: INITIAL_BLOG_POSTS,
    activityLogs: INITIAL_ACTIVITY_LOGS,
    projects: INITIAL_PROJECTS,
    clients: INITIAL_CLIENTS,
    invoices: INITIAL_INVOICES,
    messages: INITIAL_MESSAGES,
    team: INITIAL_TEAM,
  };

  fs.writeFileSync(STORE_FILE, JSON.stringify(seedPayload, null, 2), 'utf-8');
  console.log('✅ Successfully seeded 5 years of sample operating data to data/store.json!');
  console.log('📊 Seed Summary:');
  console.log(` - Services: ${INITIAL_SERVICES.length}`);
  console.log(` - Bookings: 372 (Seeded Sample Dataset)`);
  console.log(` - Projects: ${INITIAL_PROJECTS.length}`);
  console.log(` - Clients: 125 (Seeded Sample Dataset)`);
  console.log(` - Galleries: ${INITIAL_GALLERIES.length}`);
  console.log(` - Invoices: ${INITIAL_INVOICES.length}`);
}

seedDatabase();
