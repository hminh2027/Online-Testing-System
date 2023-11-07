import { Button } from 'antd';
import { useRef } from 'react';
import { MyDocument } from './Document';

export default function PDF() {
  return <div>PDF</div>;
}

interface PDFExporterProps {
  fileName: string;
  data: [];
}

export function PDFExporter({ fileName, data }: PDFExporterProps) {
  const ref = useRef(null);
  const handleExport = () => {};

  return (
    <>
      <div ref={ref}>
        <MyDocument />

        {/* <Typography.Title>Bài kiểm tra Toán lớp 12</Typography.Title> */}
        {/* <Typography.Title italic>Thời gian: 90 phút, không kể thời gian phát đề</Typography.Title> */}
      </div>
      <Button onClick={handleExport} block>
        Export PDF
      </Button>
    </>
  );
}

PDF.Exporter = PDFExporter;
