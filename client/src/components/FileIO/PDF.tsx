import { Button, Typography } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
  const handleExport = () => {
    const input = ref.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'px');

      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('test.pdf');
    });
  };

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
