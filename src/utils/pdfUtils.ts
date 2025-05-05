
import { toast } from "@/components/ui/use-toast";

interface PassengerInfo {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  passportNumber?: string;
  specialRequests?: string;
}

interface BookingData {
  id: string;
  flightId: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  price: number;
  userName?: string;
  status: string;
  bookingDate?: string;
  passengers?: PassengerInfo[];
}

/**
 * Generate and open a PDF for a booking
 * 
 * BACKEND INTEGRATION NOTE:
 * - This is a frontend-only implementation
 * - A real implementation would call a backend API endpoint that generates PDFs
 * - Backend would use a library like PDFBox or iText
 * 
 * @param booking Booking data for PDF generation
 */
export const generateBookingPDF = (booking: BookingData): void => {
  // In a real app, we would use a library like jspdf or pdfmake
  // For this demo, we'll create a simple implementation that
  // generates a "fake" PDF by opening a new window with the booking details
  
  // Generate a random barcode-like string for the QR code
  const generateQRData = () => {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${booking.id}-${result}`;
  };
  
  const qrData = generateQRData();
  
  // Generate dummy QR code (in a real application, use a QR code library)
  const dummyQR = `
    <div style="width: 100px; height: 100px; margin: 0 auto; border: 1px solid #000; display: flex; justify-content: center; align-items: center; font-size: 10px; text-align: center;">
      QR Code<br>${qrData}
    </div>
  `;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Booking Confirmation - ${booking.id}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #4338ca;
        }
        .booking-id {
          font-size: 18px;
          margin-top: 10px;
        }
        .section {
          margin-bottom: 20px;
        }
        .section-title {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 10px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
        .flight-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        .price {
          font-size: 18px;
          font-weight: bold;
          text-align: right;
          margin-top: 20px;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .qr-container {
          text-align: center;
          margin: 30px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        table, th, td {
          border: 1px solid #ddd;
        }
        th, td {
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .passenger-header {
          font-size: 16px;
          font-weight: bold;
          margin-top: 15px;
          margin-bottom: 5px;
        }
        @media print {
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Cloud Jet Airways</div>
        <div class="booking-id">Booking ID: ${booking.id}</div>
        <div>Status: ${booking.status.toUpperCase()}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Flight Information</div>
        <div>Flight Number: ${booking.flightId}</div>
        <div class="flight-info">
          <div>
            <div><strong>From:</strong> ${booking.from} (${booking.fromCode})</div>
            <div>Date: ${booking.departureDate}</div>
            <div>Time: ${booking.departureTime}</div>
          </div>
          <div>
            <div><strong>To:</strong> ${booking.to} (${booking.toCode})</div>
            <div>Date: ${booking.arrivalDate}</div>
            <div>Time: ${booking.arrivalTime}</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Passenger Information</div>
        ${booking.passengers && booking.passengers.length > 0 ? `
          ${booking.passengers.map((passenger, i) => `
            <div class="passenger-header">Passenger ${i + 1}</div>
            <table>
              <tr>
                <th>Name</th>
                <td>${passenger.firstName || ''} ${passenger.lastName || ''}</td>
              </tr>
              ${passenger.gender ? `
                <tr>
                  <th>Gender</th>
                  <td>${passenger.gender}</td>
                </tr>
              ` : ''}
              ${passenger.dateOfBirth ? `
                <tr>
                  <th>Date of Birth</th>
                  <td>${passenger.dateOfBirth}</td>
                </tr>
              ` : ''}
              ${passenger.passportNumber ? `
                <tr>
                  <th>Passport Number</th>
                  <td>${passenger.passportNumber}</td>
                </tr>
              ` : ''}
              ${passenger.specialRequests ? `
                <tr>
                  <th>Special Requests</th>
                  <td>${passenger.specialRequests}</td>
                </tr>
              ` : ''}
            </table>
          `).join('')}
        ` : `
          <div>
            <p>Primary Passenger: ${booking.userName || 'Not provided'}</p>
          </div>
        `}
      </div>
      
      <div class="qr-container">
        ${dummyQR}
        <p style="font-size: 12px; margin-top: 8px;">Scan this code at the airport</p>
      </div>
      
      <div class="section">
        <div class="section-title">Booking Details</div>
        <div>Booking Date: ${booking.bookingDate || new Date().toLocaleDateString()}</div>
        <div class="price">Total Price: ₹${(booking.price * 83).toFixed(2)}</div>
      </div>
      
      <div class="footer">
        <div>This is an electronic ticket. Please present this document at the airport check-in counter.</div>
        <div>Generated on ${new Date().toLocaleString()}</div>
        <div>Cloud Jet Airways - Your journey, our priority.</div>
      </div>
      
      <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 20px; background-color: #4338ca; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
          Print Ticket
        </button>
      </div>
    </body>
    </html>
  `;
  
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    
    toast({
      title: "PDF Generated",
      description: "Boarding pass has been prepared for printing.",
    });
  } else {
    toast({
      title: "Error",
      description: "Unable to open a new window. Please check your popup blocker settings.",
      variant: "destructive",
    });
  }
};
