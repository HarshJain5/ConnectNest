const cron = require("node-cron");
const MaintenanceBill = require("../models/MaintenanceBill");
const sendSMS = require("../helpers/smsService");

cron.schedule("0 */12 * * *", async () => {
  console.log("Checking bills for reminders...");

  const now = new Date();
  const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

  const bills = await MaintenanceBill.find({
    status: "pending",
    dueDate: { $lte: twoDaysLater, $gte: now }
  }).populate("residentId");

  for (let bill of bills) {
    const resident = bill.residentId;
    if (resident && resident.mobile) {
      const msg = `Reminder: Your maintenance bill of Rs.${bill.amount} for ${bill.month}/${bill.year} is due on ${new Date(bill.dueDate).toDateString()}. Please pay before due date.`;
      await sendSMS(resident.mobile, msg);
    }
  }
});
