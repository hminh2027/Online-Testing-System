import type { File } from 'buffer';
import { read, utils, writeFile } from 'xlsx';

export const importExcel = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();

  const workBook = read(arrayBuffer);

  const workSheet = workBook.Sheets[workBook.SheetNames[0]]; // get the first worksheet
  const data = utils.sheet_to_json(workSheet, { header: 1 }); // generate objects

  return data;
};

export const exportExcel = async (data) => {
  /* fetch JSON data and parse */
  const url = 'https://sheetjs.com/data/executive.json';
  const raw_data = await (await fetch(url)).json();

  /* filter for the Presidents */
  const prez = raw_data.filter((row) => row.terms.some((term) => term.type === 'prez'));

  /* sort by first presidential term */
  prez.forEach((row) => (row.start = row.terms.find((term) => term.type === 'prez').start));
  prez.sort((l, r) => l.start.localeCompare(r.start));

  /* flatten objects */
  const rows = prez.map((row) => ({
    name: `${row.name.first} ${row.name.last}`,
    birthday: row.bio.birthday,
  }));

  /* generate worksheet and workbook */
  const worksheet = utils.json_to_sheet(rows);
  const workbook = utils.book_new();

  utils.book_append_sheet(workbook, worksheet, 'Dates');

  /* fix headers */
  utils.sheet_add_aoa(worksheet, [['Name', 'Birthday']], { origin: 'A1' });

  /* calculate column width */
  const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);

  worksheet['!cols'] = [{ wch: max_width }];

  /* create an file and try to save to Presidents. */
  writeFile(workbook, 'Presidents.xlsx', { compression: true });
};
