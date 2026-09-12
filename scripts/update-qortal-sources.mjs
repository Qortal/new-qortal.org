import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'src/data/qortal-repositories.json');
const response = await fetch(
  'https://api.github.com/orgs/Qortal/repos?per_page=100&type=all&sort=updated',
  {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'qortal-org-source-updater',
    },
  }
);

if (!response.ok) {
  throw new Error(`GitHub repository request failed: ${response.status}`);
}

const repositories = (await response.json()).map((repository) => ({
  name: repository.name,
  description: repository.description,
  defaultBranch: repository.default_branch,
  updatedAt: repository.updated_at,
  pushedAt: repository.pushed_at,
  archived: repository.archived,
  fork: repository.fork,
  language: repository.language,
  url: repository.html_url,
}));

const snapshot = {
  generatedAt: new Date().toISOString(),
  source: 'https://api.github.com/orgs/Qortal/repos',
  note: 'Maintainer research cache. Production rendering does not depend on GitHub availability.',
  repositories,
};

await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(`Updated ${repositories.length} repositories in ${output}`);
