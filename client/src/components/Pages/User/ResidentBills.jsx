import { useEffect, useState, useContext } from "react";
import axios from "../../../components/axiosInstance";
import { Modal, Button } from "react-bootstrap";
import ResidentLayout from "./ResidentLayout";
import { Contextapi } from "../../../contextapi/Contextapi";
import html2pdf from "html2pdf.js";

function ResidentBills() {
  const { token } = useContext(Contextapi); // ✅ localStorage removed
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get("/api/resident/maintenance/bills", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBills(res.data);
    } catch (err) {
      console.error("Error fetching bills", err);
    }
  };

  const openModal = (bill) => {
  const invoiceNumber = `INV-${bill.year}${bill.month}-${bill._id.slice(-4)}`;
  setSelectedBill({ ...bill, invoiceNumber });
  setShowModal(true);
};

  // ✅ Payment
  const handlePayNow = async (billId) => {
    const { data } = await axios.post(
      `/api/payment/create-order/${billId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const options = {
      key: data.key,
      amount: data.amount * 100,
      currency: "INR",
      name: "MyColonyConnect",
      description: "Maintenance Payment",
      order_id: data.orderId,
      handler: async function (response) {
        await axios.post(
          "/api/payment/verify-payment",
          { ...response, billId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("✅ Payment Successful");
        fetchBills();
        setShowModal(false);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ Download PDF
  const downloadPDF = () => {
    const element = document.getElementById("invoice-print");
    html2pdf().from(element).save("Maintenance-Bill.pdf");
  };

  return (
    <ResidentLayout>
      <style>
        {`
        .sticky-header {
  position: sticky;
  top: 0;
  background: #f4f7f9;
  padding: 1.2rem 2rem;
  z-index: 9;
  border-bottom: 1px solid #ddd;
  font-weight:600;
  font-size:25px;
}

        .bill-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .invoice-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
        }

        .invoice-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .invoice-table th {
          background: #f4f6f8;
        }

        .invoice-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        .modal-footer-custom {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
          .invoice-wrapper {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  position: relative;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.company-logo {
  width: 50px;
  margin-bottom: 10px;
}

.invoice-meta h5 {
  margin-bottom: 10px;
}

.bill-section {
  margin-bottom: 2rem;
}

.invoice-table th {
  background: #f1f5f9;
}

.invoice-total {
  text-align: right;
  margin-top: 1.5rem;
}

.paid-stamp {
  position: absolute;
  top: 40%;
  left: 30%;
  font-size: 60px;
  color: rgba(34, 197, 94, 0.2);
  font-weight: bold;
  transform: rotate(-20deg);
}

.modal-footer-custom {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
        `}
      </style>

      {/* ✅ Sticky Header */}
      <div className="sticky-header">
        💰 Maintenance Bills
      </div>

      <div className="row mt-4">
        {bills.length === 0 && <p>No bills found.</p>}

        {bills.map((bill) => (
          <div key={bill._id} className="col-md-4 mb-3">
            <div className="bill-card">
              <h5>Maintenance - {bill.month} {bill.year}</h5>
              <p>Status: {bill.status}</p>
              <Button variant="primary" onClick={() => openModal(bill)}>
                View Invoice
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Invoice Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
  <Modal.Body>
    {selectedBill && (
      <div id="invoice-print" className="invoice-wrapper">

        {/* Header */}
        <div className="invoice-header">
          <div className="company-section">
            <img
              src="/logo192.png"
              alt="Company Logo"
              className="company-logo"
            />
            <h4>ConnectNest</h4>
            <p>Smart Community Management</p>
          </div>

          <div className="invoice-meta">
            <h5>INVOICE</h5>
            <p><strong>No:</strong> {selectedBill.invoiceNumber}</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Due:</strong> {new Date(selectedBill.dueDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Bill To */}
        <div className="bill-section">
          <div>
            <p><strong>Bill To:</strong></p>
            <p>Flat {selectedBill.flatNumber}</p>
            <p>{selectedBill.month} {selectedBill.year}</p>
          </div>
        </div>

        {/* Table */}
        <table className="table invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monthly Maintenance Charges</td>
              <td>₹{selectedBill.amount}</td>
            </tr>
          </tbody>
        </table>

        {/* Total */}
        <div className="invoice-total">
          <h4>Total: ₹{selectedBill.amount}</h4>
        </div>

        {/* Paid Stamp */}
        {selectedBill.status === "Paid" && (
          <div className="paid-stamp">
            PAID
          </div>
        )}

      </div>
    )}
  </Modal.Body>

  {/* Bottom Buttons */}
  <Modal.Footer>
    <div className="modal-footer-custom">

      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Close
      </Button>

      <Button variant="dark" onClick={downloadPDF}>
        Download PDF
      </Button>

      {selectedBill?.status === "Pending" && (
        <Button
          variant="success"
          onClick={() => handlePayNow(selectedBill._id)}
        >
          Pay Now
        </Button>
      )}

    </div>
  </Modal.Footer>
</Modal>

    </ResidentLayout>
  );
}

export default ResidentBills;
