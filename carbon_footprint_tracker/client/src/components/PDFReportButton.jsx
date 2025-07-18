import { Download, FileText } from 'lucide-react';

const PDFReportButton = ({ reportData }) => {
  const handleDownloadPDF = () => {
    // In a real application, you would use a library like jsPDF or html2pdf
    // For this demo, we'll simulate the PDF generation
    
    const reportContent = `
CARBON FOOTPRINT REPORT
${reportData ? `
Period: ${reportData.period}
Total Emissions: ${reportData.totalEmissions} kg CO₂
Goal Target: ${reportData.goalTarget} kg CO₂
Activities Logged: ${reportData.activitiesLogged}

CATEGORY BREAKDOWN:
${reportData.topCategories?.map(cat => 
  `${cat.category}: ${cat.emissions} kg CO₂ (${cat.percentage}%)`
).join('\n')}

ACHIEVEMENTS:
${reportData.achievements?.map(achievement => `• ${achievement}`).join('\n')}

RECOMMENDATIONS:
${reportData.recommendations?.map(rec => `• ${rec}`).join('\n')}
` : 'Loading report data...'}

Generated on: ${new Date().toLocaleDateString()}
    `;

    // Create a blob with the report content
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `carbon-footprint-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    URL.revokeObjectURL(url);
  };

  const handleViewReport = () => {
    // In a real application, this would open a PDF viewer or modal
    // For this demo, we'll show an alert
    alert('PDF report viewer would open here. This is a demo implementation.');
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleViewReport}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <FileText className="h-4 w-4" />
        <span>View Report</span>
      </button>
      
      <button
        onClick={handleDownloadPDF}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>Download</span>
      </button>
    </div>
  );
};

export default PDFReportButton;
