import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { Reseller, InvalidRow } from "./types";

// Column mapping from Excel headers to expected fields
export const columnMapping = {
  "First Name": "firstName",
  "Last Name": "lastName",
  "Email Address": "email",
  "Phone Number": "phone",
  Gender: "gender",
  Age: "age",
  "Home Address": "address",
  "Business Name": "businessName",
  Cohort: "cohort",
};

// Transform Excel data to expected format
export const transformExcelData = (data: any[]) => {
  return data.map((row) => {
    const transformedRow: Record<string, any> = {};

    // Map each column from Excel to the expected field name
    Object.keys(row).forEach((excelColumn) => {
      const mappedField =
        columnMapping[excelColumn as keyof typeof columnMapping];
      if (mappedField) {
        transformedRow[mappedField] = row[excelColumn];
      }
    });

    if (transformedRow.age) {
      const isNumber = typeof transformedRow.age === "number";
      const epoch = new Date(1899, 11, 30); // Dec 30, 1899
      const n = !isNumber
        ? createDateFromArray(transformedRow.age.split("/"))
        : transformedRow.age;
      const resultDate = isNumber
        ? new Date(epoch.getTime() + transformedRow.age * 24 * 60 * 60 * 1000)
        : new Date(n);

      transformedRow.dob = dayjs(resultDate).format("MM/YYYY");

      delete transformedRow.age;
    }

    return transformedRow;
  });
};

export const validateRow = (
  row: any,
  index: number
): [Reseller | null, InvalidRow | null] => {
  const requiredFields = [
    "email",
    "dob",
    "firstName",
    "lastName",
    "gender",
    "phone",
    "address",
    "businessName",
    "cohort",
  ];
  for (let field of requiredFields) {
    if (!row[field]) {
      return [
        null,
        {
          rowNumber: index + 2,
          reason: `${field} is missing`,
          rowData: row,
        },
      ];
    }
  }
  const dobFormat = /^\d{1,2}\/\d{4}$/;
  if (!dobFormat.test(row.dob)) {
    return [
      null,
      {
        rowNumber: index + 2,
        reason: `dob should be in MM/YYYY format`,
        rowData: row,
      },
    ];
  }
  return [
    {
      email: row.email,
      dob: row.dob,
      firstName: row.firstName,
      lastName: row.lastName,
      mode: "onboard",
      gender: row.gender,
      phone: row.phone,
      address: row.address,
      businessName: row.businessName,
      cohort: row.cohort,
    },
    null,
  ];
};

export const parseExcel = async (file: File) => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  // Transform the Excel data to match expected format
  const transformedData = transformExcelData(jsonData as any[]);

  const valid: Reseller[] = [];
  const invalid: InvalidRow[] = [];

  transformedData.forEach((row, idx) => {
    const [validReseller, invalidRow] = validateRow(row, idx);
    if (validReseller) valid.push(validReseller);
    if (invalidRow) invalid.push(invalidRow);
  });

  return { valid, invalid };
};

export const downloadTemplate = () => {
  // Generate a template based on your expected columns
  const template = [
    {
      "S/N": "1",
      "First Name": "John",
      "Last Name": "Doe",
      "Email Address": "john@example.com",
      "Phone Number": "1234567890",
      Gender: "Male",
      Age: "04-30-99",
      "Home Address": "123 Main St",
      "Business Name": "John's Business",
      Cohort: "1",
    },
  ];

  const ws = XLSX.utils.json_to_sheet(template);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Resellers");

  // Generate and download the template
  XLSX.writeFile(wb, "resellers-template.xlsx");
};

/**
 * Converts an array of [month, day, year] strings into a JavaScript Date object
 * @param {string[]} dateArray - Array containing ["month", "day", "year"] as strings
 * @returns {Date} A JavaScript Date object
 */
function createDateFromArray(dateArray: string[]) {
  if (!Array.isArray(dateArray) || dateArray.length !== 3) {
    throw new Error(
      "Input must be an array with exactly 3 elements: [month, day, year]"
    );
  }

  // Extract components
  const month = dateArray[0];
  const day = dateArray[1];
  const year = dateArray[2];

  // Convert to integers and validate
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  let yearNum = parseInt(year, 10);

  // Adjust year if it's a 2-digit format
  // Assuming 21 means 2021, not 1921
  if (yearNum < 100) {
    yearNum = 2000 + yearNum;
  }

  // JavaScript months are 0-indexed (0 = January, 11 = December)
  const jsMonth = monthNum - 1;

  // Create and return the date object
  const dateObj = new Date(yearNum, jsMonth, dayNum);

  // Validate the resulting date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date created from input array");
  }

  return dateObj;
}
