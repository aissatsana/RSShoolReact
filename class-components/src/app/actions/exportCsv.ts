'use server';

import 'server-only';
import { Character } from '../../types';

type Result =
  | { ok: true; csv: string; filename: string }
  | { ok: false; error: string };

export async function buildCsvAction(
  _prevState: Result | null,
  formData: FormData
): Promise<Result> {
  try {
    const rawChars = formData.get('chars');
    if (!rawChars) return { ok: false, error: 'NO_DATA' };

    const chars = JSON.parse(String(rawChars));
    if (!Array.isArray(chars) || chars.length === 0)
      return { ok: false, error: 'NO_CHARACTERS' };

    const headers = ['ID', 'Name', 'Details URL'];
    const data = chars.map((char: Character) => [
      char.id,
      char.name,
      `https://rickandmortyapi.com/character/${char.id}`,
    ]);

    const csv = [headers, ...data]
      .map((row) => row.map((val: number | string) => `"${val}"`).join(','))
      .join('\n');

    const filename = `${chars.length}_items.csv`;
    return { ok: true, csv, filename };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
