import { writeFile, access } from 'fs/promises';
import { constants } from 'fs';
import { randomBytes } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the file path (adjusted for new location in scripts/)
const filePath = join(__dirname, '..', 'src', 'qapp-config.ts');

try {
  // Check if file already exists
  await access(filePath, constants.F_OK);
  console.log('⚠️ qapp-config.ts already exists. Skipping creation.');
} catch {
  // File does not exist, proceed to create it
  const publicSalt = randomBytes(32).toString('base64');
  const tsContent = `export const publicSalt = "${publicSalt}";\n`;

  try {
    await writeFile(filePath, tsContent, 'utf8');
    console.log('✅ qapp-config.ts has been created with a unique public salt.');
  } catch (error) {
    console.error('❌ Error writing qapp-config.ts:', error);
  }
}

