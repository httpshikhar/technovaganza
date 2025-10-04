import jsPDF from 'jspdf';

// Calculate amount based on number of events
const calculateAmount = (eventsCount) => {
  if (eventsCount === 1) return 50;
  if (eventsCount === 2) return 80;
  if (eventsCount >= 3) return 120;
  return 0;
};

// Generate Participation Certificate PDF
export const generateParticipationPDF = async (userData, registrations, events, teamData = null) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Calculate amount
  const eventsCount = registrations.length;
  const amount = calculateAmount(eventsCount);

  // Add background color
  pdf.setFillColor(248, 249, 250);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header Section with Gradient Effect
  pdf.setFillColor(220, 53, 69); // SRMS Red Color
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  // Technovaganza 2025 Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Technovaganza 2025', pageWidth / 2, 20, { align: 'center' });
  
  // Subtitle
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('SRMS College of Engineering Technology and Research', pageWidth / 2, 30, { align: 'center' });

  // Main Content Container
  pdf.setFillColor(255, 255, 255);
  pdf.rect(15, 50, pageWidth - 30, pageHeight - 100, 'F');
  pdf.setDrawColor(220, 53, 69);
  pdf.setLineWidth(0.5);
  pdf.rect(15, 50, pageWidth - 30, pageHeight - 100, 'S');

  // Certificate Title
  pdf.setTextColor(220, 53, 69);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PARTICIPATION CERTIFICATE', pageWidth / 2, 70, { align: 'center' });

  // Decorative Line
  pdf.setDrawColor(220, 53, 69);
  pdf.setLineWidth(0.8);
  pdf.line(50, 75, pageWidth - 50, 75);

  let yPosition = 90;

  // Participant Information Section
  pdf.setTextColor(51, 51, 51);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PARTICIPANT INFORMATION', 25, yPosition);
  
  yPosition += 10;
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.2);
  pdf.line(25, yPosition, pageWidth - 25, yPosition);
  
  yPosition += 15;

  // Participant Details
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  const participantDetails = [
    { label: 'Participant ID', value: userData.pid },
    { label: 'Name', value: userData.name },
    { label: 'Roll Number', value: userData.rollno },
    { label: 'Branch', value: userData.branch },
    { label: 'Batch', value: userData.batch },
    { label: 'College', value: userData.college || 'SRMS College of Engineering & Technology' },
    { label: 'Total Events', value: `${eventsCount} events` },
    { label: 'Amount to Pay', value: `₹${amount}` }
  ];

  participantDetails.forEach(detail => {
    // Check if we need new page
    if (yPosition > pageHeight - 120) {
      addNewPage(pdf, pageWidth);
      yPosition = 50;
    }

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(102, 102, 102);
    pdf.text(`${detail.label}:`, 30, yPosition);
    
    pdf.setFont('helvetica', 'normal');
    
    // Special styling for amount
    if (detail.label === 'Amount to Pay') {
      pdf.setTextColor(39, 174, 96); // Green color for amount
      pdf.setFont('helvetica', 'bold');
    } else {
      pdf.setTextColor(51, 51, 51);
    }
    
    pdf.text(detail.value, 30 + pdf.getTextWidth(`${detail.label}: `) + 5, yPosition);
    
    yPosition += 8;
  });

  yPosition += 10;

  // Team Information (if team event)
  if (teamData) {
    // Check if we need new page
    if (yPosition > pageHeight - 150) {
      addNewPage(pdf, pageWidth);
      yPosition = 50;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text('TEAM INFORMATION', 25, yPosition);
    
    yPosition += 10;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(25, yPosition, pageWidth - 25, yPosition);
    
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(102, 102, 102);
    pdf.text('Team ID:', 30, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(51, 51, 51);
    pdf.text(teamData.tid, 30 + pdf.getTextWidth('Team ID: ') + 5, yPosition);
    
    yPosition += 8;
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(102, 102, 102);
    pdf.text('Team Name:', 30, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(51, 51, 51);
    pdf.text(teamData.teamName, 30 + pdf.getTextWidth('Team Name: ') + 5, yPosition);
    
    yPosition += 15;

    // Team Members
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text('TEAM MEMBERS:', 30, yPosition);
    yPosition += 8;

    teamData.members.forEach((member, index) => {
      // Check if we need new page
      if (yPosition > pageHeight - 80) {
        addNewPage(pdf, pageWidth);
        yPosition = 50;
      }

      const memberText = `${index + 1}. ${member.name} (${member.pid}) - ${member.branch}`;
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(51, 51, 51);
      pdf.text(memberText, 35, yPosition);
      yPosition += 7;
    });

    yPosition += 10;
  }

  // Registered Events Section
  // Check if we need new page
  if (yPosition > pageHeight - 200) {
    addNewPage(pdf, pageWidth);
    yPosition = 50;
  }

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(51, 51, 51);
  pdf.text('REGISTERED EVENTS', 25, yPosition);
  
  yPosition += 10;
  pdf.setDrawColor(200, 200, 200);
  pdf.line(25, yPosition, pageWidth - 25, yPosition);
  
  yPosition += 15;

  // Events List
  pdf.setFontSize(9);
  registrations.forEach((registration, index) => {
    // Check if we need new page before adding event
    if (yPosition > pageHeight - 80) {
      addNewPage(pdf, pageWidth);
      yPosition = 50;
    }

    const event = events.find(e => e._id === registration.eventId?._id || e._id === registration.eventId) || {};
    
    // Event header with type badge
    const eventType = registration.eventType.toUpperCase();
    const eventHeader = `${index + 1}. ${event.name || 'Event'} [${eventType}]`;
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(220, 53, 69);
    pdf.text(eventHeader, 30, yPosition);
    yPosition += 6;

    // Event details
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    
    const details = [
      `Description: ${event.description || 'N/A'}`,
      `Type: ${registration.eventType}`,
      registration.teamId && `Team ID: ${registration.teamId}`,
      event.date && `Event Date: ${new Date(event.date).toLocaleDateString('en-IN')}`,
      event.time && `Event Time: ${event.time}`,
      event.venue && `Venue: ${event.venue}`,
      event.amount > 0 && `Event Fee: ₹${event.amount}`,
      `Registration Date: ${new Date(registration.registrationDate).toLocaleDateString('en-IN')}`
    ].filter(Boolean);

    details.forEach(detail => {
      // Check if we need new page for details
      if (yPosition > pageHeight - 50) {
        addNewPage(pdf, pageWidth);
        yPosition = 50;
      }
      pdf.text(detail, 35, yPosition);
      yPosition += 5;
    });

    yPosition += 8;
  });

  // Payment Information Box (ALWAYS ON LAST PAGE)
  const paymentY = pageHeight - 70;
  pdf.setFillColor(255, 243, 205); // Light yellow background
  pdf.rect(20, paymentY, pageWidth - 40, 50, 'F');
  pdf.setDrawColor(255, 193, 7); // Yellow border
  pdf.setLineWidth(0.5);
  pdf.rect(20, paymentY, pageWidth - 40, 50, 'S');

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(133, 100, 4); // Dark yellow text
  pdf.text('PAYMENT INFORMATION', pageWidth / 2, paymentY + 8, { align: 'center' });
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  
  // Amount summary
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Total Events Registered: ${eventsCount}`, pageWidth / 2, paymentY + 18, { align: 'center' });
  pdf.setTextColor(39, 174, 96); // Green for amount
  pdf.text(`Total Amount to be Paid: ₹${amount}`, pageWidth / 2, paymentY + 26, { align: 'center' });
  
  pdf.setTextColor(133, 100, 4); // Back to dark yellow
  pdf.setFont('helvetica', 'normal');
  pdf.text('Please submit the registration fees at the Technovaganza Registration Counter', pageWidth / 2, paymentY + 34, { align: 'center' });
  pdf.text('Counter Location: Main Registration Desk in SRMS CET & R', pageWidth / 2, paymentY + 40, { align: 'center' });
  pdf.text('Timing: 8:00 AM - 9:30 AM (sharp)', pageWidth / 2, paymentY + 46, { align: 'center' });

  // Footer
  const footerY = pageHeight - 15;
  pdf.setDrawColor(220, 53, 69);
  pdf.setLineWidth(0.5);
  pdf.line(25, footerY, pageWidth - 25, footerY);
  
  pdf.setFontSize(8);
  pdf.setTextColor(102, 102, 102);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Generated on: ' + new Date().toLocaleDateString('en-IN'), pageWidth / 2, footerY + 5, { align: 'center' });

  // Save the PDF
  const fileName = `Technovaganza_${userData.pid}_${new Date().getTime()}.pdf`;
  pdf.save(fileName);
};

// Export the calculateAmount function for use elsewhere if needed
export { calculateAmount };

// Helper function to add new page with header
const addNewPage = (pdf, pageWidth) => {
  pdf.addPage();
  
  // Add header to new page
  pdf.setFillColor(220, 53, 69);
  pdf.rect(0, 0, pageWidth, 15, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Technovaganza 2025 - Participation Certificate (Continued)', pageWidth / 2, 8, { align: 'center' });
  
  return 30; // Return new Y position
};