import type { File } from 'buffer';
import { read, utils, writeFile } from 'xlsx';

export const importExcel = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();

  const workBook = read(arrayBuffer);

  const workSheet = workBook.Sheets[workBook.SheetNames[0]]; // get the first worksheet
  const data = utils.sheet_to_json(workSheet, { header: 1 }); // generate objects

  return data;
};

export const exportExcel = (fileName: string, data: []) => {
  /* generate worksheet and workbook */
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();

  utils.book_append_sheet(workbook, worksheet, 'Exam');

  utils.sheet_add_aoa(worksheet, [['Câu hỏi', 'Đáp án', 'Đáp án đúng']], { origin: 'A1' });

  /* create an file and try to save to Presidents. */
  writeFile(workbook, `${fileName}.xlsx`, { compression: true });
};
