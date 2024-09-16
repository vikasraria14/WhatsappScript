const exceljs = require("exceljs");
const path = require("path");
const { sendMessage } = require("./sendWhatsApp");
const { createMessage } = require("./content");
const { saveMessageData, messageAlreadySent } = require("./database");

// Function to read data from Excel file
const readExcel = async (filePath) => {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);
  const data = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      const rowData = {
        PhoneNumber: row.getCell(1).value,
        Name: row.getCell(2).value,
        CompanyName: row.getCell(3).value,
        JobProfile: row.getCell(4).value,
        JobId: row.getCell(5).value,
      };
      data.push(rowData);
    }
  });

  return { data, workbook };
};

const moveToSentSheet = async (workbook, row) => {
  const date = new Date().toISOString().split("T")[0];
  let worksheet = workbook.getWorksheet(date);
  if (!worksheet) {
    worksheet = workbook.addWorksheet(date);
    const headers = [
      "Phone Number",
      "Name",
      "Company Name",
      "Job Profile",
      "Job Id",      
      "Message Sent Time",
    ];
    worksheet.addRow(headers).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
    worksheet.columns.forEach((column) => (column.width = 20));
  }

  const data = Object.values(row).concat(new Date().toLocaleString());
  worksheet.addRow(data);
  await workbook.xlsx.writeFile("numbers.xlsx");
};

const filePath = path.join(__dirname, "./numbers.xlsx");
const main = async () => {
  const { data, workbook } = await readExcel(filePath);

  for (const row of data) {
    const { PhoneNumber, Name, CompanyName, JobProfile, JobId } = row;
    const message = createMessage(Name, CompanyName, JobProfile, JobId);

    if ((await messageAlreadySent(PhoneNumber))) {
      await sendMessage([PhoneNumber], message);
      await saveMessageData(Name, PhoneNumber, CompanyName, JobId, JobProfile);
      await moveToSentSheet(workbook, row);
    }
  }
};

main();
