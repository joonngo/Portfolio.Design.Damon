import { getCollection } from 'astro:content';
import type { Project } from './projects';
export const load = async () => (await getCollection('projects')).map((e) => e.data as Project);
